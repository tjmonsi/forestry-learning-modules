const app = {
  title: 'Element-Lite Starter Kit',
  shortName: 'Element-lite', // 12 characters max
  description: 'Element-lite starter kit',
  sentry: '',
  baseHref: '/',
  startUrl: '/',
  display: 'standalone',
  orientation: 'any',
  scope: '/',
  twitter: '@tjmonsi',
  twitterCreator: '@tjmonsi',
  image: ''
};

const theme = {
  themeColor: '#000',
  backgroundColor: '#000',
  favicon: '/assets/favicon.ico',
  webApp: {
    capable: 'yes',
    statusBarStyle: 'black-translucent',
    tapHighlight: 'no'
  },
  icons: []
};

const fragments = {
  'page-home': 'src/pages/page-home/index.js',
  'page-ilo2': 'src/pages/page-ilo2/index.js',
  'page-ilo1': 'src/pages/page-ilo1/index.js',
  'page-not-found': 'src/pages/page-not-found/index.js'
};

const routes = [
  {
    route: '/',
    page: 'page-home'
  },
  {
    route: '/ilo3',
    page: 'page-home'
  },
  {
    route: '/ilo2',
    page: 'page-ilo2'
  },
  {
    route: '/ilo1',
    page: 'page-ilo1'
  },
  {
    route: 'no-page',
    page: 'page-not-found'
  }
];

const puppeteer = {
  launch: {
    headless: true,
    slowMo: 100
  }
};

module.exports = { app, theme, fragments, routes, puppeteer };
