const localConfig = require('./config.local.js');

const config = {
  devServer: { // webpack-dev-server settings
    host: 'localhost',
    port: 3301
  },
  server: { // ssr server settings
    host: 'localhost',
    port: 3300,
    protocol: 'http'
  },
  api: {
    host: 'api.cska.dev.highglossy.com',
    port: 80
  },
  authApi: {
    host: 'auth.cska.dev.highglossy.com',
    port: 80,
  },
  cookie: {
    name: 'CH_SSID',
    expired: 30 // days
  },
  mobileapps: {
    apple: 'https://itunes.apple.com/ru/app/пфк-цска/id420262660?mt=8',
    google: 'https://play.google.com/store/apps/details?id=ru.highglossy.pfccska&hl=ru',
  },
  app: {
    title: 'ЦСКА — клубный сайт',
    description: 'All the modern best practices in one example.',
    head: {
      titleTemplate: 'ЦСКА — клубный сайт: %s',
      defaultTitle: 'ЦСКА — клубный сайт',
      meta: [
        { name: 'description', content: 'All the modern best practices in one example.' },
        { name: 'apple-itunes-app', content: 'app-id=id420262660, app-argument=CSKA' },
        { charset: 'utf-8' },
        { property: 'og:site_name', content: 'ЦСКА — клубный сайт' },
        { property: 'og:image', content: '//localhost:3300/images/home.jpg' },
        { property: 'og:locale', content: 'en_US' },
        { property: 'og:title', content: 'ЦСКА — клубный сайт' },
        { property: 'og:description', content: 'All the modern best practices in one example.' },
        { property: 'og:card', content: 'summary' },
        { property: 'og:site', content: 'https://highglossy.com' },
        { property: 'og:creator', content: '@niklucky' },
        { property: 'og:image:width', content: '200' },
        { property: 'og:image:height', content: '200' }
      ]
    }
  },
};
// https://itunes.apple.com/ru/app/%D0%BF%D1%84%D0%BA-%D1%86%D1%81%D0%BA%D0%B0/id420262660?mt=8

module.exports = Object.assign({}, config, localConfig);
