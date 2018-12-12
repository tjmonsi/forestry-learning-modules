const template = (html, self) => function () {
  const { moduleObj, currentEvent, sceneObjects } = this;
  if (!moduleObj) return html`Loading...`;
  const { events, objects, baseURL } = moduleObj;
  // console.log(sceneObjects)
  if (!events) return html`Loading...`;
  return html`
    <section class="scene">
    ${sceneObjects.map(item => {
      const styleString = item.style.map(({key, value}) => `${key}: ${value}`).join(';');
      return html`
        ${item.type === 'image' ? html`
          <lazy-picture
            cover
            class="${item.meta.fullscreen ? 'fullscreen' : ''}"
            style="${styleString}"
            src="${baseURL + item.src}"></lazy-picture>
        `: ''}
      `
    })}
    </section>
  `;
}.bind(self)();

export { template };
