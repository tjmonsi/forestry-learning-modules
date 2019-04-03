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
    const assets = this.shadowRoot.querySelector('#assets');
    while (assets.firstChild) {
      assets.removeChild(assets.firstChild);
    }
    for (let item of this.backgrounds) {
      const image = document.createElement('img');
      image.src = '/assets/forestry/images/background/' + item.fname;
      // image.style.height = '5%';relative
      image.style.width = '10%';
      image.style.margin = '10px';
      assets.appendChild(image);
      image.addEventListener('click', event => {
        const canvas = this.shadowRoot.querySelector('#scene-canvas');
        while (canvas.firstChild) {
          canvas.removeChild(canvas.firstChild);
        }
        let copy = image.cloneNode();
        copy.style.width = '100%';
        copy.style.height = '100%';
        copy.style.margin = '0px';
        copy.style.zIndex = '0';
        canvas.appendChild(copy);
      });
    }
  }

  _characterClick () {
    // const assets = this.shadowRoot.querySelector('#assets');
    // while (assets.hasChildNodes()) {
    //   assets.removeChild(assets.firstChild);
    // }
    // const characterItems = [];
    // for (let item of this.characters) {
    //   characterItems.push({
    //     src: '/assets/forestry/images/characters/' + item.fname
    //   });
    // }
    // this.characterItems = characterItems;
    const assets = this.shadowRoot.querySelector('#assets');
    while (assets.firstChild) {
      assets.removeChild(assets.firstChild);
    }
    for (let item of this.characters) {
      const image = document.createElement('img');
      image.src = '/assets/forestry/images/characters/' + item.fname;
      // image.style.height = '4%';
      image.style.width = '4%';
      image.style.marginLeft = '15px';
      image.style.marginRight = '15px';
      image.style.marginTop = '5px';
      image.style.marginBottom = '5px';
      assets.appendChild(image);
    }
  }

  _objectClick () {
    const assets = this.shadowRoot.querySelector('#assets');
    while (assets.firstChild) {
      assets.removeChild(assets.firstChild);
    }
    for (let item of this.objects) {
      const image = document.createElement('img');
      image.src = '/assets/forestry/images/objects/' + item.fname;
      image.style.width = '10%';
      image.style.marginLeft = '15px';
      image.style.marginRight = '15px';
      image.style.marginTop = '5px';
      image.style.marginBottom = '5px';
      assets.appendChild(image);
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