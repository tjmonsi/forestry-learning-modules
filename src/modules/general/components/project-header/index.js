import { TemplateLite } from '@tjmonsi/element-lite/mixins/template-lite.js';
import { render, html } from 'lit-html';
import { subscribe, unsubscribe } from '../../../../utils/state.js';
import { template } from './template.js';
import style from './style.styl';
// import '../../smart-components/navigation-loader/index.js';
// import '../../components/header-navigation/index.js';
const { HTMLElement, customElements } = window;

class Component extends TemplateLite(HTMLElement) {
  static get is () { return 'project-header'; }

  static get renderer () { return render; }

  constructor () {
    super();
    this._boundSetRoute = this._setRoute.bind(this);
  }

  connectedCallback () {
    if (super.connectedCallback) super.connectedCallback();
    subscribe('currentRoute', this._boundSetRoute);
  }

  disconnectedCallback () {
    if (super.disconnectedCallback) super.disconnectedCallback();
    unsubscribe('currentRoute', this._boundSetRoute);
  }

  set route (route) {
    this.__route = route;
    this.requestRender();
    this.style.display = route === '/' ? 'none' : '';
  }

  get route () {
    return this.__route;
  }

  template () {
    return html`<style>${style.toString()}</style>${template(html, this)}`;
  }

  _setRoute (route) {
    this.route = route;
  }

  async openSidebar () {
    await import('../project-sidebar/index.js');
    const sidebar = document.querySelector('project-sidebar');
    setTimeout(() => sidebar.open(), 50);
  }

  async closeSidebar () {
    await import('../project-sidebar/index.js');
    const sidebar = document.querySelector('project-sidebar');
    sidebar.close();
  }
}

if (!customElements.get(Component.is)) {
  customElements.define(Component.is, Component);
} else {
  console.warn(`${Component.is} is already defined somewhere. Please check your code.`);
}
