export const changeLocation = (location, dontDispatch) => {
  window.history.pushState({}, '', location);
  if (!dontDispatch) window.dispatchEvent(new window.CustomEvent('location-change'));
};
