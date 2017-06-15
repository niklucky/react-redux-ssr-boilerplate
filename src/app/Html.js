import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom/server';
import serialize from 'serialize-javascript';
import Helmet from 'react-helmet';

/**
 * Wrapper component containing HTML metadata and boilerplate tags.
 * Used in server-side code only to wrap the string output of the
 * rendered route component.
 *
 * The only thing this component doesn't (and can't) include is the
 * HTML doctype declaration, which is added to the rendered output
 * by the server.js file.
 */
class Html extends Component {
  render() {
    const {assets, component, store} = this.props;
    const content = component ? ReactDOM.renderToString(component) : '';
    const head = Helmet.rewind();
    return (
      <html lang="en-US">
        <head>
          {head.base.toComponent()}
          {head.title.toComponent()}
          {head.meta.toComponent()}
          {head.link.toComponent()}
          {head.script.toComponent()}

          <link rel="shortcut icon" href="/favicon.ico" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
          {/* <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,900&amp;subset=cyrillic" rel="stylesheet" /> */}
          <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,400i,700,700i&amp;subset=cyrillic" rel="stylesheet" />
          {assets.styles && Object.keys(assets.styles).map((style, key) =>
            <link
              href={assets.styles[style]} key={key} media="screen, projection"
              rel="stylesheet" type="text/css" charSet="UTF-8"
            />
          )}
        </head>
        <body>
          <div id="content" dangerouslySetInnerHTML={{__html: content}} />
          {store &&
            <script dangerouslySetInnerHTML={{ __html: `window.__data=${serialize(store.getState())};`}} charSet="UTF-8" />
          }
          {assets &&
            <script src={assets.javascript.main} charSet="UTF-8" />
          }
        </body>
      </html>
    );
  }
}

Html.propTypes = {
  assets: PropTypes.object.isRequired,
  component: PropTypes.node.isRequired,
  store: PropTypes.object.isRequired
};

export default Html;
