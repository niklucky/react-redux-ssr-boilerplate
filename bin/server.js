#!/usr/bin/env node
require('babel-register')();
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';
global.__SERVER__ = true;
global.__CLIENT__ = false;
global.window = undefined;

const WebpackIsomorphicTools = require('webpack-isomorphic-tools');
global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('../webpack/webpack-isomorphic-tools'))
  .server(rootDir, () => {
    require('../src/server');
  });
