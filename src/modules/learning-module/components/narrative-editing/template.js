const template = (html, self) => function () {
  const { lessons } = this;
  // if (!moduleObj) return html`Loading...`;
  // const { events, baseURL } = moduleObj;
  // // console.log(sceneObjects)
  // if (!events) return html`Loading...`;
  return html`
    <div>
      Hello world!
      ${lessons && lessons.length ? lessons.map((lesson, index) => html`
        ${lesson.name}
      `) : html``}
    </div>
  `;
}.bind(self)();

export { template };
