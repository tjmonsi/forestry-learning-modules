import { TemplateLite } from '@tjmonsi/element-lite/mixins/template-lite.js';
import { render, html } from 'lit-html';
import { template } from './template.js';
import style from './style.styl';
// import '../../smart-components/navigation-loader/index.js';
// import '../../components/side-navigation/index.js';
const { HTMLElement, customElements } = window;

class Component extends TemplateLite(HTMLElement) {
  static get is () { return 'project-sidebar'; }

  static get renderer () { return render; }

  constructor () {
    super();
    this.__open = false;
  }

  template () {
    return html`<style>${style.toString()}</style>${template(html, this)}`;
  }

  open () {
    const sidebar = this.shadowRoot.querySelector('.sidebar');
    this.__open = true;
    sidebar.classList.add('open');
  }

  close () {
    const sidebar = this.shadowRoot.querySelector('.sidebar');
    this.__open = false;
    sidebar.classList.remove('open');
  }
}

if (!customElements.get(Component.is)) {
  customElements.define(Component.is, Component);
} else {
  console.warn(`${Component.is} is already defined somewhere. Please check your code.`);
}
