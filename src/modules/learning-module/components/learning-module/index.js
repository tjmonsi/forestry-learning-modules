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
import '../../../general/components/snackbar-lite';


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
      },
      types: {
        type: Array,
        value: []
      },
      parenchyma: {
        type: Array,
        value: []
      },
      correctCount: {
        type: Number,
        value: 0
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
      console.log(trigger);
      if (this.currentEvent === 'event-31' || this.currentEvent === 'event-32' || this.currentEvent === 'event-33' || this.currentEvent === 'event-34' || this.currentEvent === 'event-35' || this.currentEvent === 'event-36' || this.currentEvent === 'event-37' || this.currentEvent === 'event-38' || this.currentEvent === 'event-39' || this.currentEvent === 'event-40'){
        changeLocation(`${window.location.pathname.split('?')[0]}?currentEvent=${this.currentEvent}`, false);
      } else {
        changeLocation(`${window.location.pathname.split('?')[0]}?currentEvent=${this.currentEvent}`, true);
      }
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
    form.setAttribute("finished", true);
    var finished = form.getAttribute("finished");
    const next = this.shadowRoot.querySelector('#next');
    next.disabled = false;
    
    const label = this.shadowRoot.querySelector('#label');
    label.style.visibility = "visible";

    this.types = [];
    this.parenchyma = [];
    this.correctCount = 0;
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

  onChange (event) {
    const target = event.target;
    var answer = target.getAttribute("answer");
    if (target.name === "Pore Types and Arrangement"){
      if(this.types.indexOf(target.value) === -1){
        this.types.push(target.value);
      } else {
        this.types.splice(this.types.indexOf(target.value),1);
      }

      var sb = document.querySelector('.snackbar-lite');
      var ans = "Selected: ";
      for (let item of this.types) {
        ans = ans + '\n\n' + item;
      }
      sb.showText(ans, 1000);
      
      var correct = true;
      for (let item of this.types) {
        if (answer.includes(item)) {
          answer = answer.replace(item, '');
        } else {
          correct = false;
        }
      }

      if (answer === '' && correct) {
        target.disabled = true;
        this.correctCount += 1;
      }
    } else if (target.name === "Parenchyma") {
      if(this.parenchyma.indexOf(target.value) === -1){
        this.parenchyma.push(target.value);
      } else {
        this.parenchyma.splice(this.parenchyma.indexOf(target.value),1);
      }

      var sb = document.querySelector('.snackbar-lite');
      var ans = "Selected: ";
      for (let item of this.parenchyma) {
        ans = ans + '\n\n' + item;
      }
      sb.showText(ans, 1000);
      
      var correct = true;
      for (let item of this.parenchyma) {
        if (answer.includes(item)) {
          answer = answer.replace(item, '');
        } else {
          correct = false;
        }
      }

      if (answer === '' && correct) {
        target.disabled = true;
        this.correctCount += 1;
      }
    } else {
      if (target.value === answer) {
        target.disabled = true;
        this.correctCount += 1;
      } else {
        var sb = document.querySelector('.snackbar-lite');
        sb.showText("Wrong option! Try again.", 5000);
      }
    }

    if (this.correctCount === 11) {
      this.complete = true;
      var sb = this.shadowRoot.querySelector('#submit');
      sb.disabled = false;
    }
  }

  blink (event) {
    var target = event.target;
    var sb = this.shadowRoot.querySelectorAll('#circle');
    for (let item in sb){
      var circle = sb[item].children[0].children[0];
      if (target.style.color === circle.getAttribute("color")) {
        circle.animate([
          { opacity: 1 },
          { opacity: 0 }
        ], {
            duration: 1000,
            iterations: 5
        });
      }
    }
  }
}

if (!customElements.get(Component.is)) {
  customElements.define(Component.is, Component);
} else {
  console.warn(`${Component.is} is already defined somewhere. Please check your code.`);
}
