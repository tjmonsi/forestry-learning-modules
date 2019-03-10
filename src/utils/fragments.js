const fragments = {
  '/': () => import('../pages/page-home/index.js'),
  '/forms': () => import('../pages/page-form/index.js'),
  '/narrative-editing': () => import('../pages/page-narrative-editing/index.js'),
  'no-page': () => import('../pages/page-not-found/index.js')
};
export { fragments };
