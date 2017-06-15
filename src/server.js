import path from 'path';
import Express from 'express';
import http from 'http';
import httpProxy from 'http-proxy';
import cookieParser from 'cookie-parser';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { createMemoryHistory, RouterContext, match } from 'react-router';

import { Provider } from 'react-redux';

import config from './config';

import Html from './app/Html';
import App from './app/App';
import ApiClient from './helpers/ApiClient';
import getRoutes from './routes';
import createAppStore from './redux/create';

const app = new Express();
const server = new http.Server(app);
const targetUrl = ((config.api.port === 443) ? 'https://' : 'http://') + config.api.host + ':' + config.api.port;
const authProxyUrl = ((config.authApi.port === 443) ? 'https://' : 'http://') + config.authApi.host + ':' + config.authApi.port;

const proxy = httpProxy.createProxyServer({
  target: {
    host: config.api.host,
    port: config.api.port
  },
  ws: true
});
const authProxy = httpProxy.createProxyServer({
  target: {
    host: config.authApi.host,
    port: config.authApi.port
  },
  changeOrigin: true
});
proxy.on('proxyReq', (proxyReq) => {
  proxyReq.setHeader('host', config.api.host);
});
authProxy.on('proxyReq', (proxyReq) => {
  proxyReq.setHeader('host', config.authApi.host);
});

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
authProxy.on('error', (error, req, res) => {
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
app.use('/auth-api', (req, res) => {
  authProxy.web(req, res, {
    target: authProxyUrl,
    host: config.authApi.host,
    changeOrigin: true
  });
});
app.use('/cb/*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '/public/cb.html'));
});

app.use(cookieParser());


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
  app.use(Express.static('public'));
} else {
  app.use(Express.static('public'));
}

app.get('*', (req, res) => {
  console.log('Request: ', req.url);
  if (__DEVELOPMENT__) {
    webpackIsomorphicTools.refresh();
  }

  global.__SID__ = req.cookies[config.cookie.name];
  const client = new ApiClient(targetUrl, authProxyUrl, global.__SID__);
  const history = createMemoryHistory(req.url);
  const store = createAppStore(history, client);
  const routes = getRoutes(history, store);

  try {
    match({ routes, history }, (error, redirectLocation, renderProps) => {
      if (redirectLocation) {
        res.redirect(301, redirectLocation.pathname + redirectLocation.search);
      } else if (error) {
        res.status(500).send(error.message);
      } else if (renderProps == null) {
        res.status(404).send('Not found');
      } else {
        const component = (
          <Provider store={store}>
            <App>
              <RouterContext {...renderProps} />
            </App>
          </Provider>
        );

        res.status(200);
        if (__DEVELOPMENT__) {
          res.send('<!doctype html>\n' +
            ReactDOMServer.renderToString(
              <Html assets={webpackIsomorphicTools.assets()} component={null} store={store} />
            )
          );
        } else {
          res.send('<!doctype html>\n' +
            ReactDOMServer.renderToString(
              <Html assets={webpackIsomorphicTools.assets()} component={component} store={store} />
            )
          );
        }
      }
    });
  } catch (e) {
    res.status(500);
    console.log('Error: ', e);
    if (__DEVELOPMENT__) {
      res.send(e.stack);
    } else {
      res.send(e.message);
    }
  }
});

server.listen(config.server.port, (err) => {
  if (err) {
    console.error(err);
  }
  console.info('---------------------------');
  console.info('==> ✅  %s is running', config.app.title);
  console.info('==> 💻  Open http://%s:%s in a browser to view the app.', config.server.host, config.server.port);
  console.info('==> Proxy to API server on %s:%s.', config.api.host, config.api.port);
  console.info('==> Proxy to Auth API server on %s:%s.', config.authApi.host, config.authApi.port);
  console.info('---------------------------');
});
