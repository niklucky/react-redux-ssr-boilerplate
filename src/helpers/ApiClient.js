import superagent from 'superagent';

const methods = ['get', 'post', 'put', 'patch', 'del', 'head'];

function formatUrl(path) {
  if (path.indexOf('http') === 0) {
    return path;
  }
  const adjustedPath = path[0] !== '/' ? `/${path}` : path;
  return '/api' + adjustedPath;
}

export default class ApiClient {
  constructor() {
    this.headers = {};

    methods.forEach(method => // eslint-disable-line no-return-assign
      this[method] = (path, { params, data } = {}) => new Promise((resolve, reject) => {
        const request = superagent[method](formatUrl(path));
        if (Object.keys(this.headers).length > 0) {
          Object.keys(this.headers).map(name => request.set(name, this.headers[name]));
        }
        if (params) {
          request.query(params);
        }
        if (data) {
          request.send(data);
        }
        request.end(
          (err, response) => {
            if (err) {
              reject({ err, response });
            } else {
              resolve(response);
            }
          }
        );
      }));
  }

  setHeader(name, value) {
    this.headers[name] = value;
  }
  /*
   * There's a V8 bug where, when using Babel, exporting classes with only
   * constructors sometimes fails. Until it's patched, this is a solution to
   * "ApiClient is not defined" from issue #14.
   * https://github.com/erikras/react-redux-universal-hot-example/issues/14
   *
   * Relevant Babel bug (but they claim it's V8): https://phabricator.babeljs.io/T2455
   *
   * Remove it at your own risk.
   */
  empty() {} // eslint-disable-line class-methods-use-this
}
