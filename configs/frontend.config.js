const app = {
  title: 'Game Toolkit',
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
  'page-form': 'src/pages/page-form/index.js',
  'page-narrative-editing': 'src/pages/page-narrative-editing/index.js',
  'page-event-editing': 'src/pages/page-event-editing/index.js',
  'page-not-found': 'src/pages/page-not-found/index.js'
};

const routes = [
  {
    route: '/',
    page: 'page-home'
  },
  {
    route: '/forms',
    page: 'page-form'
  },
  {
    route: '/narrative-editing',
    page: 'page-narrative-editing'
  },
  {
    route: '/event-editing',
    page: 'page-event-editing'
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
