import superagent from 'superagent';

const methods = ['get', 'post', 'put', 'patch', 'del', 'head'];

export default class ApiClient {
  constructor(host, authHost, token) {
    this.headers = {};
    this.host = null;
    this.authHost = null;
    // Server-side code
    if (host) {
      this.host = host;
    }
    if (authHost) {
      this.authHost = authHost;
    }

    if (token) {
      this.setHeader('Authorization', token);
    }

    methods.forEach(method => // eslint-disable-line no-return-assign
      this[method] = (path, { params, data } = {}) => new Promise((resolve, reject) => {
        const url = this.formatUrl(path);
        const request = superagent[method](url);
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

  formatUrl(path) {
    if (path.indexOf('http') === 0) {
      return path;
    }
    const adjustedPath = path[0] !== '/' ? `/${path}` : path;

    if (adjustedPath.indexOf('/auth-api') === 0) {
      if (this.authHost) {
        return this.authHost + adjustedPath.replace('/auth-api', '');
      }
      return adjustedPath;
    }
    if (this.host) {
      return this.host + adjustedPath;
    }
    return '/api' + adjustedPath;
  }

  setHeader(name, value) {
    this.headers[name] = value;
  }
}
