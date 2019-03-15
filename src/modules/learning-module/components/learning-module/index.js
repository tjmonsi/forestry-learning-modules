import { TemplateLite } from '@tjmonsi/element-lite/mixins/template-lite.js';
import { ObserversLite } from '@tjmonsi/element-lite/mixins/observers-lite.js';
import { render, html } from 'lit-html';
import { subscribe, unsubscribe } from '../../../../utils/state';
import { changeLocation } from '../../../../utils/change-location';
import { template } from './template.js';
import style from './style.styl';
import '../../../general/components/lazy-picture';
import '../../../general/components/mark-lite';
import '../../../general/components/input-container';

const { HTMLElement, customElements, fetch } = window;

const changeUnit = (value, newVal) => {
  let unit = '';
  if (value.indexOf('%') >= 0) {
    unit = '%';
  } else if (value.indexOf('px') >= 0) {
    unit = 'px';
  }

  return (parseInt(value.replace(unit, ''), 10) + parseInt(newVal, 10)) + unit;
};

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

  constructor () {
    super();
    this._boundGetQueryState = this._getQueryState.bind(this);
  }

  connectedCallback () {
    if (super.connectedCallback) super.connectedCallback();
    subscribe('query', this._boundGetQueryState);
  }

  disconnectedCallback () {
    if (super.disconnectedCallback) super.disconnectedCallback();
    unsubscribe('query', this._boundGetQueryState);
  }

  _getQueryState ({ currentEvent }) {
    if (this.currentEvent !== currentEvent) {
      this.currentEvent = currentEvent;
    }
  }

  async _loadModule (src) {
    if (!src) return;
    const response = await fetch(src);
    this.moduleObj = await response.json();
    if (!this.currentEvent) {
      this.currentEvent = this.moduleObj.eventStart;
    } else {
      this._loadEvent(this.currentEvent);
    }
    // this.currentEvent = this.currentEvent || this.moduleObj.eventStart;
  }

  _loadEvent (currentEvent) {
    if (this.moduleObj && this.moduleObj.events && currentEvent) {
      const event = this.moduleObj.events[currentEvent];
      const { triggers, default: deafaultTrigger } = event;
      this._doTrigger(triggers[deafaultTrigger]);
    }
  }

  _doTrigger (trigger) {
    const { type } = trigger;
    const { objects } = this.moduleObj;
    if (type === 'load') {
      this.sceneObjects = [];
      for (let item of trigger[type]) {
        const { objectId, id } = item;
        if (this.sceneObjects.findIndex(item => item.id === id) < 0) {
          this.sceneObjects.push({ ...objects[objectId], ...item });
        }
      }
      this.requestUpdate();
    }

    if (type === 'next') {
      this.sceneObjects = [];
      this.currentEvent = trigger.event;
      changeLocation(`${window.location.pathname.split('?')[0]}?currentEvent=${this.currentEvent}`, true);
    }

    if (type === 'dialogue') {
      const index = this.sceneObjects.findIndex(item => item.type === 'dialogue');
      const { objectId } = trigger;
      if (index < 0) {
        this.sceneObjects.push({
          id: 'dialogue-id',
          ...objects[objectId]
        });
      } else {
        console.log(this.sceneObjects[index])
        this.sceneObjects[index] = { ...this.sceneObjects[index], ...objects[objectId] };
      }
      this.requestUpdate();
    }
  }

  _click () {
    if (this.moduleObj && this.moduleObj.events) {
      const event = this.moduleObj.events[this.currentEvent];
      if (!event.click) return;
      const { triggers } = event;
      this._doTrigger(triggers[event.click]);
    }
  }

  _dialogue (event) {
    event.stopPropagation();
    const { target } = event;
    const { value } = target;
    if (this.moduleObj && this.moduleObj.events) {
      const event = this.moduleObj.events[this.currentEvent];
      const { triggers } = event;
      this._doTrigger(triggers[value]);
    }
  }

  updated () {
    setTimeout(() => {
      for (let item of this.sceneObjects) {
        if (item.relative) {
          const parent = this.shadowRoot.querySelector('#' + item.relative);
          const el = this.shadowRoot.querySelector('#' + item.objectId);
          if (parent && el) {
            const box = parent.getBoundingClientRect();
            const positions = ['top', 'left'];
            const elstyle = document.createElement('div');
            elstyle.style = item.style ? item.style.join(';') : '';
            el.style.width = changeUnit(elstyle.style.width, box.width - (elstyle.style.padding.replace('px', '') * 2));
            el.style.height = changeUnit(elstyle.style.height || '0px', box.height - (elstyle.style.padding.replace('px', '') * 2));
            console.log(el.style.height, box.height)
            for (const pos of positions) {
              el.style[pos] = changeUnit(elstyle.style[pos] ? elstyle.style[pos] : '0px', box[pos]);
            }
          }
        }
      }
    }, 500);
  }

  _form (event) {
    event.preventDefault();
    const { target: form } = event;
  }

  _drag (event) {
    event.preventDefault();
    console.log("hello");
  }

  _correctAnswer ({target: el}) {
    console.log("");
    // var selected = document.getElementById("Color").options.value;
    // var selected = el.options.selected.text;
    // var val = el.options.value.text;
    // var answer = el.option[0]/.answer;
    // console.log(selected);
    // console.log(val);
    // console.log(answer);
  }
}

if (!customElements.get(Component.is)) {
  customElements.define(Component.is, Component);
} else {
  console.warn(`${Component.is} is already defined somewhere. Please check your code.`);
}
