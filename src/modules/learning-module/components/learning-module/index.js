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
      deposits: {
        type: Array,
        value: []
      },
      correctCount: {
        type: Number,
        value: 0
      },
      formCorrect: {
        type: Array,
        value: []
      },
      selectCorrect: {
        type: Boolean,
        value: false
      },
      enumerateCorrect: {
        type: Boolean,
        value: false
      },
      choice3Correct: {
        type: Boolean,
        value: false
      },
      choice2Correct: {
        type: Boolean,
        value: false
      },
      choiceCorrect: {
        type: Boolean,
        value: false
      },
      currentMusic: {
        type: String,
        value: null
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
      await this._loadEvent(this.currentEvent);
    }
    // this.currentEvent = this.currentEvent || this.moduleObj.eventStart;
  }

  async _loadEvent (currentEvent) {
    if (this.moduleObj && this.moduleObj.events && currentEvent) {
      const event = this.moduleObj.events[currentEvent];
      const { triggers, default: deafaultTrigger, music } = event;
      this._doTrigger(triggers[deafaultTrigger]);

      // console.log(currentEvent, music, this.currentMusic, music !== this.currentMusic, this, this.getBoundingClientRect());
      const { right, width } = this.getBoundingClientRect();
      const bgmusic = document.querySelector('#bg-music');
      if (bgmusic.paused) {
        try {
          bgmusic.play();
        } catch (error) {
          console.log(error);
        }
      }

      if (music && music !== 'none' && music !== this.currentMusic && right && width) {
        const bgsource = document.querySelector('#bg-music-source');
        bgsource.src = music;
        bgmusic.volume = 0.15;
        // console.log(bgmusic)
        try {
          // console.log('go on');
          await bgmusic.load();
          this.currentMusic = music;
        } catch (e) {
          console.log(e);
        }
      } else if (music && music === 'none' && right && width) {
        const bgsource = document.querySelector('#bg-music-source');
        bgsource.src = '';
        bgmusic.load();
      }
    }
  }

  resetCorrect () {
    this.types = [];
    this.parenchyma = [];
    this.deposits = [];
    this.selectCorrect = false;
    this.formCorrect = [];
    this.enumerateCorrect = false;
    this.choice3Correct = false;
    this.choice2Correct = false;
    this.choiceCorrect = false;
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
      // if (this.currentEvent === 'event-27' || this.currentEvent === 'event-31' || this.currentEvent === 'event-32' || this.currentEvent === 'event-33' || this.currentEvent === 'event-34' || this.currentEvent === 'event-35' || this.currentEvent === 'event-36' || this.currentEvent === 'event-37' || this.currentEvent === 'event-38' || this.currentEvent === 'event-39' || this.currentEvent === 'event-40'){
      changeLocation(`${window.location.pathname.split('?')[0]}?currentEvent=${this.currentEvent}`, false);
      // } else {
      // changeLocation(`${window.location.pathname.split('?')[0]}?currentEvent=${this.currentEvent}`, true);
      // }
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
        console.log(this.sceneObjects[index]);
        this.sceneObjects[index] = { ...this.sceneObjects[index], ...objects[objectId] };
      }
      this.requestUpdate();
    }
    this.resetCorrect();
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
    this.resetCorrect();
    this.requestUpdate();
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
            // console.log(el.style.height, box.height)
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
    form.setAttribute('finished', true);
    // var finished = form.getAttribute('finished');
    const next = this.shadowRoot.querySelector('#next');
    next.disabled = false;

    const label = this.shadowRoot.querySelector('#label');
    label.style.visibility = 'visible';
    label.style.zIndex = 100;

    this.resetCorrect();

    var sb = document.querySelector('.snackbar-lite');
    sb.showText('You correctly identified its Structural Features! You may now continue.', 2500);
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
      var sb = document.querySelector('.snackbar-lite');

      if (dragged.id === target.id) {
        console.log(dragged.id);
        dragged.remove();
        sb.showText('Correct!', 2000);
        const label = this.shadowRoot.querySelectorAll('#label');
        for (let item in label) {
          if (label[item].getAttribute('value').toLowerCase() === dragged.id) {
            label[item].style.zIndex = 100;
          }
        }
        // label.style.zIndex = 100;
      } else {
        sb.showText('Wrong option! Try again.', 2000);
      }
    }
    this.requestUpdate();
  }

  _multipleOption (event) {
    const { target } = event;
    let answer = target.getAttribute('answer');
    const sb = document.querySelector('.snackbar-lite');
    const form = target.form;
    const values = [];
    let correct = true;
    for (let i = 0; i < form[target.name].length; i++) {
      if (form[target.name][i].checked) {
        values.push(form[target.name][i].value);
      }
    }

    for (const i of values) {
      if (answer.indexOf(i) >= 0) {
        answer = answer.replace(i, '').trim();
      } else {
        correct = false;
      }
    }

    if (!answer && correct) {
      this.correctCount += 1;
      this.formCorrect.push(target.name);
      sb.showText('Correct!', 2000);
      for (let i = 0; i < form[target.name].length; i++) {
        form[target.name][i].disabled = true;
      }
    }
    // console.log(answer, values, values.join('') === answer);
  }

  _checkEnumerate (event) {
    const { target } = event;
    let answer = target.getAttribute('data-answer');
    const sb = document.querySelector('.snackbar-lite');
    const form = target.form;
    const values = [];
    let correct = true;
    for (let i = 0; i < form[target.name].length; i++) {
      if (form[target.name][i].checked) {
        values.push(form[target.name][i].value);
      }
    }

    for (const i of values) {
      if (answer.indexOf(i) >= 0) {
        answer = answer.replace(i, '').trim();
      } else {
        correct = false;
      }
    }

    if (!answer && correct) {
      this.enumerateCorrect = true;
      this.formCorrect.push(target.name);
      sb.showText('Correct!', 2000);
      for (let i = 0; i < form[target.name].length; i++) {
        form[target.name][i].disabled = true;
      }

      const next = this.shadowRoot.querySelector('#next');
      next.disabled = false;
    }
  }

  onChange (event) {
    const target = event.target;
    var answer = target.getAttribute('answer');
    // const option = target.querySelector(`[value=${target.value}]`)
    const sb = document.querySelector('.snackbar-lite');
    if (target.name === 'Pore Types and Arrangement') {
      if (this.types.indexOf(target.value) === -1) {
        this.types.push(target.value);
        // option.selected = true;
      } else {
        this.types.splice(this.types.indexOf(target.value), 1);
        // option.selected = false;
      }
      console.log(target)
      console.log(target.value, this.types);

      let ans = 'Selected:\n';
      for (let item of this.types) {
        item = item.charAt(0).toUpperCase() + item.slice(1);
        if (ans === 'Selected:\n') {
          ans = ans + ' ' + item;
        } else {
          ans = ans + ', ' + item;
        }
      }
      sb.showText(ans, 15000);

      let correct = true;
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
        this.formCorrect.push(target.id);
      }
    } else if (target.name === 'Parenchyma') {
      if (this.parenchyma.indexOf(target.value) === -1) {
        this.parenchyma.push(target.value);
      } else {
        this.parenchyma.splice(this.parenchyma.indexOf(target.value), 1);
      }

      let ans = 'Selected:\n';
      for (let item of this.parenchyma) {
        item = item.charAt(0).toUpperCase() + item.slice(1);
        if (ans === 'Selected:\n') {
          ans = ans + ' ' + item;
        } else {
          ans = ans + ', ' + item;
        }
      }
      sb.showText(ans, 15000);

      let correct = true;
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
        this.formCorrect.push(target.id);
      }
    } else if (target.name === 'Pore Deposits') {
      if (this.deposits.indexOf(target.value) === -1) {
        this.deposits.push(target.value);
      } else {
        this.deposits.splice(this.deposits.indexOf(target.value), 1);
      }

      let ans = 'Selected:\n';
      for (let item of this.deposits) {
        item = item.charAt(0).toUpperCase() + item.slice(1);
        if (ans === 'Selected:\n') {
          ans = ans + ' ' + item;
        } else {
          ans = ans + ', ' + item;
        }
      }
      sb.showText(ans, 15000);

      let correct = true;
      for (let item of this.deposits) {
        if (answer.includes(item)) {
          answer = answer.replace(item, '');
        } else {
          correct = false;
        }
      }

      if (answer === '' && correct) {
        target.disabled = true;
        this.correctCount += 1;
        this.formCorrect.push(target.id);
      }
    } else {
      if (target.value === answer) {
        target.disabled = true;
        this.correctCount += 1;
        this.formCorrect.push(target.id);
        sb.showText('Correct!', 2000);
      } else {
        sb.showText('Wrong option! Try again.', 2000);
      }
    }

    if (this.correctCount >= 11) {
      this.complete = true;
      const submit = this.shadowRoot.querySelector('#submit');
      submit.disabled = false;
    }

    this.requestUpdate();
  }

  blink (event) {
    var target = event.target;
    var sb = this.shadowRoot.querySelectorAll('lazy-picture');
    for (let item in sb) {
      var circle = sb[item];
      if (circle.getAttribute("color") && target.style.color === circle.getAttribute("color")) {
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

  select (event) {
    var target = event.target;
    var identify = this.shadowRoot.querySelector('#identify');
    var sb = document.querySelector('.snackbar-lite');

    const oldAnswer = this.shadowRoot.querySelector('.choice-answer');

    if (oldAnswer) {
      oldAnswer.classList.remove('choice-answer');
    }

    target.classList.add('choice-answer');

    if (target.getAttribute('data-answer') === identify.getAttribute('data-answer')) {
      sb.showText('Correct! Congratulations! You are one step forward to becoming a wood wizard.', 2000);
      const next = this.shadowRoot.querySelector('#next');
      next.disabled = false;
      this.choiceCorrect = true;

      // const choices = this.shadowRoot.querySelectorAll('#choice');
      // for (let item in choices) {
      //   choices[item].removeEventListener('click', this.select, true);
      // }
    } else {
      sb.showText('Wrong answer! Try again.', 2000);
    }
    // this._select();
  }

  // _select () {
  //   var identify = this.shadowRoot.querySelector('#identify');
  //   var sb = document.querySelector('.snackbar-lite');
  //   const choices = this.shadowRoot.querySelectorAll('#choice');
  //   let temp = false;
  //   for (let i = 0; i < choices.length; i++) {
  //     // console.log(choices[i]);
  //     choices[i].addEventListener('click', event => {
  //       if (choices[i].getAttribute('data-answer') === identify.getAttribute('data-answer')) {
  //         sb.showText('Correct! Congratulations! You can now move on to the next one.');
  //         const next = this.shadowRoot.querySelector('#next');
  //         next.disabled = false;
  //         temp = true;
  //         for ( let j = 0; j < choices.length; j++) {
  //           choices[j].removeEventListener('click', event, true);
  //         }
  //       } else {
  //         sb.showText('Wrong option! Try again.', 5000);
  //       }
  //     });
  //   }
  // }

  // _compare (target) {
  //   console.log(target);
  //   var sb = document.querySelector('.snackbar-lite');
  //   var identify = this.shadowRoot.querySelector('#identify');
  //   if (target.getAttribute('data-answer') === identify.getAttribute('data-answer')) {
  //     sb.showText('Correct! Congratulations! You can now move on to the next one.');
  //     const next = this.shadowRoot.querySelector('#next');
  //     next.disabled = false;
  //     target.removeEventListener('click', this._compare(), true);
  //   } else {
  //     sb.showText('Wrong option! Try again.', 5000);
  //   }
  // }

  menu (event) {
    console.log('test');
  }

  _hide (event) {
    let toHide = event.target.parentElement;
    // let toHide = this.shadowRoot.querySelector();
    toHide.style.display = 'none';
    let sec = this.shadowRoot.querySelector('.scene');
    let showDialogue = document.createElement('button');
    showDialogue.className = 'button';
    showDialogue.innerHTML = 'Show Dialogue'
    showDialogue.style.cssText = 'position: absolute; z-index: 10000001; font-size: 1rem; background: teal; color: white; padding: 12px 24px; border: 3px solid white; bottom: 3%; left: 2%';
    sec.appendChild(showDialogue);
    showDialogue.addEventListener('click', event => {
      toHide.style.display = 'block';
      showDialogue.remove();
    });
  }

  ilo1select (event) {
    var target = event.target;
    var sb = document.querySelector('.snackbar-lite');
    const oldAnswer = this.shadowRoot.querySelector('.choice3-answer');

    if (oldAnswer) {
      oldAnswer.classList.remove('choice3-answer');
    }

    target.classList.add('choice3-answer');

    if (target.getAttribute('data-answer') === target.getAttribute('data-choice')) {
      sb.showText('Your answer is correct! Good job!', 2000);
      const next = this.shadowRoot.querySelector('#next');
      next.disabled = false;
      this.choice3Correct = true;
    } else {
      sb.showText('Ooopps, you picked the wrong answer. Come on, try again!', 2000);
    }
  }
}

if (!customElements.get(Component.is)) {
  customElements.define(Component.is, Component);
} else {
  console.warn(`${Component.is} is already defined somewhere. Please check your code.`);
}
