import { TemplateLite } from '@tjmonsi/element-lite/mixins/template-lite.js';
import { ObserversLite } from '@tjmonsi/element-lite/mixins/observers-lite.js';
import { render, html } from 'lit-html';
import { template } from './template.js';
import style from './style.styl';
import '../../../general/components/lazy-picture';

const { HTMLElement, customElements, fetch } = window;

class Component extends TemplateLite(ObserversLite(HTMLElement)) {
  static get is () { return 'learning-module'; }

  static get renderer () { return render; }

  static get properties () {
    return {
      source: {
        type: String,
        value: '',
        observer: '_loadModule'
      },
      moduleObj: {
        type: Object,
        value: {}
      },
      currentEvent: {
        type: String,
        value: '',
        observer: '_loadEvent'
      },
      sceneObjects: {
        type: Array,
        value: []
      }
    };
  }

  template () {
    return html`<style>${style.toString()}</style>${template(html, this)}`;
  }

  async _loadModule (src) {
    if (!src) return;
    const response = await fetch(src);
    this.moduleObj = await response.json();
    this.currentEvent = this.moduleObj.eventStart;
  }

  _loadEvent (currentEvent) {
    if (this.moduleObj && this.moduleObj.events) {
      const event = this.moduleObj.events[currentEvent];
      const { triggers, default: deafaultTrigger } = event;
      this._doTrigger(triggers[deafaultTrigger]);
    }
  }

  _doTrigger (trigger) {
    const { type } = trigger;
    const { objects } = this.moduleObj
    if (type === 'load') {
      for (let item of trigger[type]) {
        const { objectId, meta, style, id  } = item;
        if (this.sceneObjects.findIndex(item => item.id === id) < 0) {
          this.sceneObjects.push({ ...objects[objectId], id, meta, style });
        }
      }
      this.requestUpdate();
    }
  }
}

if (!customElements.get(Component.is)) {
  customElements.define(Component.is, Component);
} else {
  console.warn(`${Component.is} is already defined somewhere. Please check your code.`);
}
