import Express from 'express';
import path from 'path';
import http from 'http';
import httpProxy from 'http-proxy';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { createMemoryHistory, RouterContext, match } from 'react-router';

import { Provider } from 'react-redux';

import config from './config';

import Html from './app/Html';
import Root from './app/Root';
import ApiClient from './helpers/ApiClient';
import getRoutes from './routes';
import createAppStore from './redux/create';

const app = new Express();
const server = new http.Server(app);
const targetUrl = ((config.api.port === 443) ? 'https://' : 'http://') + config.api.host + ':' + config.api.port;
console.log('targetUrl', targetUrl);
const proxy = httpProxy.createProxyServer({
  target: {
    host: config.api.host,
    port: config.api.port
  },
  ws: true
});
proxy.on('proxyReq', (proxyReq) => {
  proxyReq.setHeader('host', config.api.host);
});
// added the error handling to avoid https://github.com/nodejitsu/node-http-proxy/issues/527
proxy.on('error', (error, req, res) => {
  let json = null;
  if (error.code !== 'ECONNRESET') {
    console.error('proxy error', error);
  }
  if (!res.headersSent) {
    res.writeHead(500, {'content-type': 'application/json'});
  }

  json = { error: 'proxy_error', reason: error.message };
  res.end(JSON.stringify(json));
});
// Proxy to API server
app.use('/api', (req, res) => {
  proxy.web(req, res, {
    target: targetUrl,
    host: config.api.host
  });
});


if (__DEVELOPMENT__) {
  const webpackConfig = require('../webpack/webpack.config.dev');
  const webpack = require('webpack');
  const compiler = webpack(webpackConfig);
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
    stats: {
      assets: false,
      colors: true,
      version: false,
      hash: false,
      timings: false,
      chunks: false,
      chunkModules: false
    }
  }));
  app.use(require('webpack-hot-middleware')(compiler));
  app.use(Express.static(path.resolve(__dirname, 'public')));
} else {
  app.use(Express.static(path.resolve(__dirname, 'public')));
}

app.get('*', (req, res) => {
  console.log('req.url', req.url);
  if (__DEVELOPMENT__) {
    webpackIsomorphicTools.refresh();
  }

  const client = new ApiClient(req);
  const history = createMemoryHistory(req.url);
  const store = createAppStore(history, client);
  const routes = getRoutes(history, store);

  match({ routes, history }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(301, redirectLocation.pathname + redirectLocation.search);
    } else if (error) {
      res.status(500).send(error.message);
    } else if (renderProps == null) {
      res.status(404).send('Not found');
    } else {
      const component = (
        <Root>
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
        </Root>
      );

      res.status(200);
      res.send('<!doctype html>\n' +
        ReactDOMServer.renderToString(
          <Html assets={webpackIsomorphicTools.assets()} component={component} store={store} />
        )
      );
    }
  });
});

server.listen(config.server.port, (err) => {
  if (err) {
    console.error(err);
  }
  console.info('----\n==> ✅  %s is running, talking to API server on %s:%s.', config.app.title, config.api.host, config.api.port);
  console.info('==> 💻  Open http://%s:%s in a browser to view the app.', config.server.host, config.server.port);
});
