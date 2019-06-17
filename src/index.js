import '@littleq/core-lite';
import './modules/general/components/snackbar-lite/index.js';
import { fragments } from './utils/fragments.js';
import { updateState } from './utils/state.js';
const core = document.querySelector('core-lite');
core.addEventListener('current-route-change', routeChanged);
core.addEventListener('router-param-object-change', routeParamObjectChanged);
core.addEventListener('query-object-change', queryParamObjectChanged);
window.addEventListener('click', closeSidebar);
const loader = document.querySelector('.core-lite-loader');

function routeChanged ({ detail: route }) {
  lazyLoad(fragments[route]);
  updateState('route', route);
}

function routeParamObjectChanged ({ detail: params }) {
  updateState('params', params);
}

function queryParamObjectChanged ({ detail: query }) {
  updateState('query', query);
}

function closeSidebar ({ target }) {
  const sidebar = document.querySelector('project-sidebar');
  if (sidebar.__open && sidebar !== target) sidebar.close();
}

async function lazyLoad (fragment) {
  try {
    if (fragment && typeof fragment === 'function') {
      await fragment();
      if (loader && loader.style.opacity !== 0) {
        loader.style.opacity = 0;
        setTimeout(() => {
          loader.style.display = 'none';
        }, 1000);
      }
    } else {
      await Promise.reject(new Error('No fragment found'));
    }
  } catch (error) {
    console.error(error);
  }
}

// import('./modules/general/components/project-header/index.js').then(() => {
//   const header = document.querySelector('project-header');
//   header.addEventListener('click', closeSidebar);
// });

if (window.SnackerMessages && window.SnackerMessages.length) {
  const snacker = document.querySelector('.snackbar-lite');
  for (let message of window.SnackerMessages) {
    const { auto, textContent } = message;
    snacker.auto = auto;
    snacker.textContent = textContent;
    snacker.show();
  }
}

// const bgmusic = document.querySelector('#bg-music');
// bgmusic.addEventListener('canplay', () => bgmusic.play());

// throw new Error();
