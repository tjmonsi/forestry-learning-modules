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
// const puppeteer = require('puppeteer');

const { HTMLElement, customElements, fetch } = window;
class Component extends TemplateLite(ObserversLite(HTMLElement)) {
  static get is () { return 'event-editing'; }

  static get renderer () { return render; }

  static get properties () {
    return {
      lessons: {
        type: Array,
        value: [
          {
            name: 'L1',
            topics: [
              {
                name: 'T1.1',
                subtopics: [
                  {
                    name: 'S1.1.1',
                    to: '',
                    from: '0.0'
                  }
                ],
                to: '0.0.0',
                from: '0'
              }
            ],
            to: '0.0',
            from: ''
          }
        ]
      },
      backgrounds: {
        type: Array,
        value: [
          {
            fname: 'xylarium.jpg'
          },
          {
            fname: 'truck-front.png'
          },
          {
            fname: 'truck-back.png'
          },
          {
            fname: 'truck-back2.png'
          }
        ]
      },
      characters: {
        type: Array,
        value: [
          {
            fname: 'forester-1.png'
          },
          {
            fname: 'forester-2.png'
          },
          {
            fname: 'pahinante.png'
          },
          {
            fname: 'supervisor.png'
          }
        ]
      },
      objects: {
        type: Array,
        value: [
          {
            fname: 'tablet.png'
          },
          {
            fname: 'nextDialogue.png'
          },
          {
            fname: 'nextScene.png'
          }
        ]
      },
      module: {
        type: Object,
        value: {
          events: [
            {
              name: '',
              default: '',
              click: '',
              triggers: [
                {
                  name: '',
                  type: '',
                  load: [
                    {
                      objectId: '',
                      id: '',
                      style: []
                    }
                  ],
                  event: '',
                  objectId: ''
                }
              ]
            }
          ],
          objects: [
            {
              objectId: '',
              type: '',
              src: '',
              character: '',
              text: '',
              next: '',
              prev: ''
            }
          ]
        }
      },
      objectClicked: {
        type: Object,
        value: {}
      },
      scene: {
        type: Object,
        value: {}
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
    subscribe('lessons', this._boundGetLessons);
  }

  disconnectedCallback () {
    if (super.disconnectedCallback) super.disconnectedCallback();
    // unsubscribe('query', this._boundGetQueryState);
    unsubscribe('lessons', this._boundGetLessons);
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

  _contains (list, value) {
    for (let i = 0; i < list.length; ++i) {
      if (list[i] === value) return true;
    }
    return false;
  }

  onDragEnter (event) {
    const { target } = event.target;
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
    const { target } = this.canvas;
    const { dragged } = this.dragged;
    if (dragged && target) {
      // const isLink = this._contains(event.dataTransfer.types, 'text/uri-list');
      target.style.backgroundColor = '';
      event.preventDefault();
      // Get the id of the target and add the moved element to the target's DOM
      dragged.parentNode.removeChild(dragged);
      dragged.style.opacity = '';
      dragged.style.marginBottom = '50px';
      dragged.style.width = '25%';
      dragged.style.marginLeft = '35%';
      target.appendChild(dragged);
    }
    this.requestUpdate();
  }

  _finish () {
    changeLocation('/event-editing', false);
  }

  _changeLoc ({ target: el }) {
    console.log(el.value);
    if (el.value === 'Forms') {
      console.log('go to forms');
      changeLocation('/forms', false);
    } else if (el.value === 'Narrative Editing') {
      console.log('go to narrative editing');
      changeLocation('/narrative-editing', false);
    }
  }

  _selectorClick ({ target: el }) {
    const workspace = this.shadowRoot.querySelector('#workspace');
    if (workspace.children.length < 2 && this.scene.id !== null) {
      this.scene.id = el.id;
      const canvas = document.createElement('div');
      canvas.id = 'canvas' + this.scene.id;
      canvas.style.border = '1px solid #000000';
      canvas.style.margin = '12px 24px';
      canvas.style.height = '75vh';
      canvas.style.width = '75%';
      canvas.style.overflow = 'hidden';
      canvas.style.display = 'relative';
      workspace.appendChild(canvas);
    } else {
      workspace.removeChild(workspace.children[1]);
      this.scene.id = el.id;
      const canvas = document.createElement('div');
      canvas.id = 'canvas' + this.scene.id;
      canvas.style.border = '1px solid #000000';
      canvas.style.margin = '12px 24px';
      canvas.style.height = '75vh';
      canvas.style.width = '75%';
      canvas.style.overflow = 'hidden';
      workspace.appendChild(canvas);
    }
  }

  _backgroundClick () {
    // while (assets.hasChildNodes()) {
    //   assets.removeChild(assets.firstChild);
    // }
    // const backgroundItems = [];
    // for (let item of this.backgrounds) {
    //   backgroundItems.push({
    //     src: '/assets/forestry/images/background/' + item.fname
    //   });
    // }
    // this.backgroundItems = backgroundItems;
    const cv = this.shadowRoot.querySelector('#canvas' + this.scene.id);
    if (cv) {
      const assets = this.shadowRoot.querySelector('#assets');
      while (assets.firstChild) {
        assets.removeChild(assets.firstChild);
      }
      for (let item of this.backgrounds) {
        const image = document.createElement('img');
        image.src = '/assets/forestry/images/background/' + item.fname;
        // image.style.height = '5%';
        image.style.width = '10%';
        image.style.margin = '10px';
        assets.appendChild(image);
        image.addEventListener('click', event => {
          const thumbnail = this.shadowRoot.querySelector('#' + this.scene.id);

          if (cv && cv.firstChild) {
            cv.removeChild(cv.firstChild);
          }

          if (cv && thumbnail.firstChild) {
            thumbnail.removeChild(thumbnail.firstChild);
          }

          if (cv) {
            const copy = image.cloneNode(true);
            copy.style.width = '100%';
            copy.style.height = '100%';
            copy.style.margin = '0px';
            copy.style.zIndex = '0';
            copy.style.position = 'relative';
            copy.id = 'background';
            // const copy2 = copy.cloneNode();
            cv.appendChild(copy);
            // thumbnail.appendChild(copy2);
          }
        });
      }
    } else {
      console.warn('Can\'t add background, no canvas yet');
      const snacker = document.querySelector('.snackbar-lite');
      snacker.textContent = 'Can\'t add background, no canvas yet';
      snacker.show();
    }
  }

  _characterClick () {
    const canvas = this.shadowRoot.querySelector('#canvas' + this.scene.id);
    if (canvas) {
      const assets = this.shadowRoot.querySelector('#assets');
      while (assets.firstChild) {
        assets.removeChild(assets.firstChild);
      }
      for (let item of this.characters) {
        const image = document.createElement('img');
        const bg = canvas.querySelector('#background');
        image.src = '/assets/forestry/images/characters/' + item.fname;
        image.style.width = '4%';
        image.style.marginLeft = '15px';
        image.style.marginRight = '15px';
        image.style.marginTop = '5px';
        image.style.marginBottom = '5px';
        assets.appendChild(image);
        image.addEventListener('click', event => {
          if (bg === null) {
            console.warn('Can\'t add character, no background yet');
            const snacker = document.querySelector('.snackbar-lite');
            snacker.textContent = 'Can\'t add character, no background yet';
            snacker.show();
          } else {
            const copy = document.importNode(image);
            copy.style.width = '25%';
            copy.style.height = '40%';
            copy.style.margin = '0px';
            // copy.style.top = '-75%';
            copy.style.zIndex = '1';
            copy.style.position = 'absolute';
            this.objectClicked = copy;
            const thumbnail = this.shadowRoot.querySelector('#' + this.scene.id);
            // console.log(thumbnail);
            canvas.addEventListener('click', event => {
              const width = canvas.clientWidth;
              // const height = canvas.clientHeight;
              const left = width / 3;
              const center = left + left;
              // const right = center + left;
              const char = this.objectClicked;
              char.style.top = '40%';
              const fname = char.src.split('/');
              if (fname[7] === 'forester-1.png') {
                char.style.top = '45%';
              } else if (fname[7] === 'forester-2.png') {
                char.style.top = '42%';
              }
              if (event.offsetX < left) {
                char.style.left = '20%';
              } else if (event.offsetX > left && event.offsetX < center) {
                char.style.left = '45%';
                // char.style.textAlign = 'center';
              } else if (event.offsetX > center) {
                char.style.right = '5%';
                // char.style.textAlign = 'center';
              }
              canvas.appendChild(char);
              const char2 = char.cloneNode();
              thumbnail.appendChild(char2);
            });
          }
        });
      }
    } else {
      console.warn('Can\'t add character, no canvas yet');
      const snacker = document.querySelector('.snackbar-lite');
      snacker.textContent = 'Can\'t add character, no canvas yet';
      snacker.show();
    }
  }

  _objectClick () {
    const canvas = this.shadowRoot.querySelector('#canvas' + this.scene.id);
    if (canvas) {
      const assets = this.shadowRoot.querySelector('#assets');
      while (assets.firstChild) {
        assets.removeChild(assets.firstChild);
      }
      for (let item of this.objects) {
        const image = document.createElement('img');
        const bg = canvas.querySelector('#background');
        image.src = '/assets/forestry/images/objects/' + item.fname;
        image.style.width = '10%';
        image.style.marginLeft = '15px';
        image.style.marginRight = '15px';
        image.style.marginTop = '5px';
        image.style.marginBottom = '5px';
        assets.appendChild(image);
        image.addEventListener('click', event => {
          if (bg === null) {
            console.warn('Can\'t add object, no background yet');
            const snacker = document.querySelector('.snackbar-lite');
            snacker.textContent = 'Can\'t add object, no background yet';
            snacker.show();
          } else {
            const copy = document.importNode(image);
            copy.style.width = '10%';
            copy.style.height = '25%';
            copy.style.margin = '0px';
            // copy.style.top = '-75%';
            copy.style.zIndex = '1';
            copy.style.position = 'absolute';
            this.objectClicked = copy;
            canvas.addEventListener('click', event => {
              const width = canvas.clientWidth;
              // const height = canvas.clientHeight;
              const left = width / 3;
              const center = left + left;
              // const right = center + left;
              const obj = this.objectClicked;
              if (event.offsetX < left) {
                canvas.appendChild(obj);
              } else if (event.offsetX > left && event.offsetX < center) {
                canvas.appendChild(obj);
                obj.style.left = '35%';
              } else if (event.offsetX > center) {
                canvas.appendChild(obj);
                obj.style.right = '20%';
              }
            });
          }
        });
      }
    } else {
      console.warn('Can\'t add object, no canvas yet');
      const snacker = document.querySelector('.snackbar-lite');
      snacker.textContent = 'Can\'t add object, no canvas yet';
      snacker.show();
    }
  }

  _addDialogue () {
    const canvas = this.shadowRoot.querySelector('#canvas' + this.scene.id);
    if (canvas) {
      const db = canvas.querySelector('#dialogueBox');
      const bg = canvas.querySelector('#background');
      if (bg != null && db === null) {
        const dialogueBox = document.createElement('div');
        dialogueBox.id = 'dialogueBox';
        const dialogueInput = document.createElement('textarea');
        const characterInput = document.createElement('input');
        dialogueInput.id = 'dialogue';
        characterInput.id = 'characterName';
        canvas.appendChild(dialogueBox);
        dialogueBox.style.zIndex = '10000';
        dialogueBox.style.top = '-25%';
        dialogueBox.style.background = 'rgba(255, 255, 255, 0.75)';
        dialogueBox.style.color = 'black';
        dialogueBox.style.fontSize = '1rem';
        dialogueBox.style.boxSizing = 'border-box';
        dialogueBox.style.position = 'relative';
        dialogueBox.style.height = '25%';
        dialogueBox.appendChild(characterInput);
        characterInput.style.height = '10%';
        characterInput.style.textDecoration = 'none';
        characterInput.style.border = 'none';
        characterInput.style.background = 'transparent';
        characterInput.placeholder = 'Enter Character Name Here';
        dialogueBox.appendChild(dialogueInput);
        dialogueInput.style.height = '90%';
        dialogueInput.style.width = '100%';
        dialogueInput.style.background = 'transparent';
        dialogueInput.style.fontSize = '20px';
        dialogueInput.style.resize = 'none';
        dialogueInput.style.outline = 'none';
        dialogueInput.style.border = 'none';
        dialogueInput.placeholder = 'Enter Dialogue Here';
      } else if (bg === null) {
        console.warn('Can\'t add dialogue, no background yet');
        const snacker = document.querySelector('.snackbar-lite');
        snacker.textContent = 'Can\'t add dialogue, no background yet';
        snacker.show();
      } else if (db !== null) {
        console.warn('Dialogue already exists!');
        const snacker = document.querySelector('.snackbar-lite');
        snacker.textContent = 'Dialogue already exists!';
        snacker.show();
      }
    } else {
      console.warn('Can\'t add dialogue, no canvas yet');
      const snacker = document.querySelector('.snackbar-lite');
      snacker.textContent = 'Can\'t add dialogue, no canvas yet';
      snacker.show();
    }
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
