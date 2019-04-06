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
      },
      dragged: {
        type: Object,
        value: ''
      },
      canvas: {
        type: Object,
        value: ''
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

  onDragStart (event) {
    let target = event.target;
    if (target) {
      this.dragged = target;
      event.dropEffect = 'move';
      event.dataTransfer.setData('text/urilist', target.id);
      event.dataTransfer.setData('text/plain', target.id);
      // Make it half transparent
      event.target.style.opacity = 0.5;
    }
  }

  onDragEnd (event) {
    event.target.style.opacity = '';
  }

  onDragOver (event) {
    // Prevent default to allow drop
    event.preventDefault();
  }

  // _contains (list, value) {
  //   for (let i = 0; i < list.length; ++i) {
  //     if (list[i] === value) return true;
  //   }
  //   return false;
  // }

  onDragEnter (event) {
    const target = event.target;
    const { dragged } = this.dragged;
    if (target.id === 'canvas' && dragged) {
      const { isLink } = this._contains(event.dataTransfer.types, 'text/uri-list');
      if (isLink) {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
        target.style.background = '#1f904e';
      } else {
        target.style.background = '#d51c00';
      }
    }
  }

  onDrop (event) {
    this.canvas = event.target;
    const target = this.canvas;
    const dragged = this.dragged;
    if (dragged && target) {
      // const isLink = this._contains(event.dataTransfer.types, 'text/uri-list');
      event.preventDefault();
      console.log(target.id);
      console.log(dragged.id);
      if (dragged.id === target.id) {
        dragged.remove();
      }
    }
    this.requestUpdate();
  }

  // _pointFrom ({ target: el }) {
  //   this.pointData = el.value;
  // }

  // _pointTo ({ target: el }) {
  //   let temp = el.value.split('.');
  //   console.log(temp.length);
  //   if (temp.length === 1) {
  //     this.lessons[temp[0]].from = this.pointData;
  //   } else if (temp.length === 2) {
  //     this.lessons[temp[0]].topics[temp[1]].from = this.pointData;
  //   } else if (temp.length === 3) {
  //     this.lessons[temp[0]].topics[temp[1]].subtopics[temp[2]].from = this.pointData;
  //   } else {
  //     console.warn('Invalid pointer! Please make sure to point to a valid lesson');
  //   }
  // }

  _correctAnswer ({target: el}) {
    // console.log("");
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
