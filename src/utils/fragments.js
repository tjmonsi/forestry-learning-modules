const fragments = {
  '/': () => import('../pages/page-home/index.js'),
  'no-page': () => import('../pages/page-not-found/index.js')
};
export { fragments };
