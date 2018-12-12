const template = (html, self) => function () {
  const { close } = this;
  return html`
    <aside class="sidebar">
      <h1 class="title">
        Logo
      </h1>
      <div class="spacer">
      </div>
      <navigation-wrapper>
        <side-navigation @close-sidebar=${close.bind(this)}>
        </side-navigation>
      </navigation-wrapper>
    </aside>
  `;
}.bind(self)();

export { template };
