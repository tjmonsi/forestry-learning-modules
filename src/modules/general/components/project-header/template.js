const template = (html, self) => function () {
  const { openSidebar } = this;
  return html`
    <header class="header">
      <button class="button mobile-only" @click=${openSidebar} aria-label="Open Sidebar">
        <svg class="icon" viewBox="0 0 24 24">
          <path d="M3,6H21V8H3V6M3,11H21V13H3V11M3,16H21V18H3V16Z" />
        </svg>
      </button>
      <h1 class="title">
        Logo
      </h1>
      <div class="spacer">
      </div>
      <navigation-wrapper>
        <header-navigation class="not-mobile">
        </header-navigation>
      </navigation-wrapper>
    </header>
  `;
}.bind(self)();

export { template };
