module.exports = {
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
    host: 'localhost',
    port: 3302
  },
  app: {
    title: 'React + Redux + SSR boilerplate',
    description: 'All the modern best practices in one example.',
    head: {
      titleTemplate: 'React + Redux + SSR boilerplate: %s',
      defaultTitle: 'React + Redux + SSR boilerplate',
      meta: [
        { name: 'description', content: 'All the modern best practices in one example.' },
        { charset: 'utf-8' },
        { property: 'og:site_name', content: 'React + Redux + SSR boilerplate' },
        { property: 'og:image', content: '//localhost:3300/images/home.jpg' },
        { property: 'og:locale', content: 'en_US' },
        { property: 'og:title', content: 'React + Redux + SSR boilerplate' },
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
