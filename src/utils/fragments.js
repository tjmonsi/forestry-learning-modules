const fragments = {
  '/': () => import('../pages/page-home/index.js'),
  '/ilo3': () => import('../pages/page-home/index.js'),
  '/ilo2': () => import('../pages/page-ilo2/index.js'),
  '/ilo1': () => import('../pages/page-ilo1/index.js'),
  'no-page': () => import('../pages/page-not-found/index.js')
};
export { fragments };
