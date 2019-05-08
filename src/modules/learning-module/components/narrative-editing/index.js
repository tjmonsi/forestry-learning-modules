import { TemplateLite } from '@tjmonsi/element-lite/mixins/template-lite.js';
import { ObserversLite } from '@tjmonsi/element-lite/mixins/observers-lite.js';
import { render, html } from 'lit-html';
import { subscribe, unsubscribe, updateState } from '../../../../utils/state';
import { changeLocation } from '../../../../utils/change-location';
import { template } from './template.js';
import style from './style.styl';
import '../../../general/components/lazy-picture';
import '../../../general/components/mark-lite';
import '../../../general/components/input-container';
import * as localforage from 'localforage';

const { HTMLElement, customElements } = window;
class Component extends TemplateLite(ObserversLite(HTMLElement)) {
  static get is () { return 'narrative-editing'; }

  static get renderer () { return render; }

  static get properties () {
    return {
      lessons: {
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
      selector: {
        type: Object,
        value: ''
      },
      pointTo: {
        type: String,
        value: ''
      },
      pointFrom: {
        type: String,
        value: ''
      },
      sequence: {
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
    // this._boundGetQueryState = this._getQueryState.bind(this);
    this._boundGetLessons = this._getLessons.bind(this);
  }

  connectedCallback () {
    if (super.connectedCallback) super.connectedCallback();
    // subscribe('query', this._boundGetQueryState);
    this._loadSavedState();
    subscribe('lessons', this._boundGetLessons);
  }

  disconnectedCallback () {
    if (super.disconnectedCallback) super.disconnectedCallback();
    // unsubscribe('query', this._boundGetQueryState);
    unsubscribe('lessons', this._boundGetLessons);
  }

  async _loadSavedState () {
    const lesson = await localforage.getItem('lesson');
    if (lesson) {
      this.lessons = lesson;
    }

    const canvas = await localforage.getItem('canvas-state');
    if (canvas) {
      this.canvas = canvas;
      let canv = this.shadowRoot.querySelector('#canvas');
      canv.innerHTML = this.canvas;
    }

    const repo = await localforage.getItem('repo-state');
    if (repo) {
      this.selector = repo;
      let selector = this.shadowRoot.querySelector('#scene-repo');
      selector.innerHTML = this.selector;
    }
  }

  _getLessons (lessons) {
    if (this.lessons !== lessons) {
      // this.lessons = lessons;
      const { from } = '';
      const { to } = '';
      for (let item of lessons) {
        const { name } = item;
        if (this.lessons.findIndex(item => item.name === name) < 0) {
          this.lessons.push({ ...item, ...from, ...to });
        }
      }
    }
    console.log(lessons);
  }

  // onDragStart (event) {
  //   let target = event.target;
  //   if (target) {
  //     this.dragged = target;
  //     event.dropEffect = 'move';
  //     event.dataTransfer.setData('text/urilist', target.id);
  //     event.dataTransfer.setData('text/plain', target.id);
  //     // Make it half transparent
  //     event.target.style.opacity = 0.5;
  //   }
  // }
  // onDragEnd (event) {
  //   event.target.style.opacity = '';
  // }

  // onDragOver (event) {
  //   // Prevent default to allow drop
  //   event.preventDefault();
  // }

  // _contains (list, value) {
  //   for (let i = 0; i < list.length; ++i) {
  //     if (list[i] === value) return true;
  //   }
  //   return false;
  // }

  // onDragEnter (event) {
  //   const target = event.target;
  //   const dragged = this.dragged;
  //   if (target.id === 'canvas' && dragged) {
  //     const { isLink } = this._contains(event.dataTransfer.types, 'text/uri-list');
  //     if (isLink) {
  //       event.preventDefault();
  //       event.dataTransfer.dropEffect = 'move';
  //       target.style.background = '#1f904e';
  //     } else {
  //       target.style.background = '#d51c00';
  //     }
  //   }
  // }

  // onDrop (event) {
  //   this.canvas = event.target;
  //   const target = this.canvas;
  //   const dragged = this.dragged;
  //   if (dragged && target) {
  //     // const isLink = this._contains(event.dataTransfer.types, 'text/uri-list');
  //     target.style.backgroundColor = '';
  //     event.preventDefault();
  //     // Get the id of the target and add the moved element to the target's DOM
  //     dragged.parentNode.removeChild(dragged);
  //     dragged.style.opacity = '';
  //     dragged.style.marginBottom = '50px';
  //     dragged.style.width = '25%';
  //     dragged.style.marginLeft = '35%';
  //     target.appendChild(dragged);
  //   }
  //   this.requestUpdate();
  // }

  _pointFrom ({ target: el }) {
    this.pointFrom = el.value;
    if (this.sequence.indexOf(this.pointFrom) === -1) {
      this.sequence.push(this.pointFrom);
    }
  }

  _pointTo ({ target: el }) {
    this.pointTo = el.value;
    if (this.sequence.indexOf(this.pointTo) === -1) {
      this.sequence.push(this.pointTo);
    }
    // } else {
    //   if (this.sequence.indexOf(this.pointTo) !== -1 && this.sequence.indexOf(this.pointFrom) !== -1) {
    //     let ind = this.sequence.indexOf(this.pointTo);
    //     this.sequence.splice(this.sequence.indexOf(this.pointFrom) + 1, 0, this.sequence[this.sequence.indexOf(this.pointTo)]);
    //     this.sequence.splice(ind, 1);
    //   }
    // }
    let temp = el.value.split('.');
    let temp2 = this.pointFrom.split('.');
    let sp = '';
    let sp2 = '';
    for (let i = 0; i < temp2.length; i++) {
      sp += temp2[i];
    }
    for (let j = 0; j < temp.length; j++) {
      sp2 += temp[j];
    }
    if (temp2.length === 1) {
      this.lessons[temp2[0]].to = el.value;
    } else if (temp2.length === 2) {
      this.lessons[temp2[0]].topics[temp2[1]].to = el.value;
    } else if (temp2.length === 3) {
      this.lessons[temp2[0]].topics[temp2[1]].subtopics[temp2[2]].to = el.value;
    }
    if (temp.length === 1) {
      this.lessons[temp[0]].from = this.pointFrom;
    } else if (temp.length === 2) {
      this.lessons[temp[0]].topics[temp[1]].from = this.pointFrom;
    } else if (temp.length === 3) {
      this.lessons[temp[0]].topics[temp[1]].subtopics[temp[2]].from = this.pointFrom;
    } else {
      console.warn('Invalid pointer! Please make sure to point to a valid lesson');
    }

    this.pointFrom = sp;
    this.pointTo = sp2;
  }

  _addToCanvas () {
    let canvas = this.shadowRoot.querySelector('#canvas');
    let f = this.shadowRoot.querySelector('#a' + this.pointFrom);
    let t = this.shadowRoot.querySelector('#a' + this.pointTo);

    canvas.appendChild(f);
    canvas.appendChild(t);
    console.log(this.sequence);
  }

  _finish () {
    updateState('lessons', this.lessons);
    changeLocation('/event-editing', false);
  }

  _changeLoc ({ target: el }) {
    console.log(el.value);
    if (el.value === 'Event Editing') {
      console.log('go to event');
      updateState('lessons', this.lessons);
      changeLocation('/event-editing', false);
    } else if (el.value === 'Forms') {
      console.log('go to forms');
      updateState('lessons', this.lessons);
      changeLocation('/forms', false);
    }
  }

  async _save () {
    await localforage.setItem('lesson', this.lessons);
    let canvas = this.shadowRoot.querySelector('#canvas');
    this.canvas = canvas.innerHTML;
    let selector = this.shadowRoot.querySelector('#scene-repo');
    this.selector = selector.innerHTML;
    await localforage.setItem('canvas-state', this.canvas);
    await localforage.setItem('repo-state', this.selector);
  }

  _downloadObjectAsJson () {
    let exportObj = this.lessons;
    let exportName = 'toolkit';
    let dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportObj).split(',').join(',\r\n'));
    let downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute('href', dataStr);
    downloadAnchorNode.setAttribute('download', exportName + '.json');
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }
}

if (!customElements.get(Component.is)) {
  customElements.define(Component.is, Component);
} else {
  console.warn(`${Component.is} is already defined somewhere. Please check your code.`);
}
