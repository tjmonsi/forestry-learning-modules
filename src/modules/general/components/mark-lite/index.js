import marked from 'marked';
const { HTMLElement, customElements } = window;

class Component extends HTMLElement {
  static get is () { return 'mark-lite'; }

  set text (text) {
    this._text = text;
    if (text) {
      const frag = document.createRange().createContextualFragment(marked(text));
      while (this.firstChild) {
        this.removeChild(this.firstChild);
      }
      this.appendChild(frag);
    }
  }

  get text () {
    return this._text;
  }
}

if (!customElements.get(Component.is)) {
  customElements.define(Component.is, Component);
} else {
  console.warn(`${Component.is} is already defined somewhere. Please check your code.`);
}
