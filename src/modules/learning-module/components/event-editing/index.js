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
class Component extends TemplateLite(ObserversLite(HTMLElement)) {
  static get is () { return 'event-editing'; }

  static get renderer () { return render; }

  static get properties () {
    return {
      source: {
        type: String,
        value: ''
      },
      moduleObj: {
        type: Object,
        value: {}
      },
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
            fname: 'start.jpg'
          },
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
          },
          {
            fname: 'checkpoint.jpg'
          },
          {
            fname: 'tablet.png'
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
          },
          {
            fname: 'akle-2.jpg'
          },
          {
            fname: 'akle-cross.jpg'
          },
          {
            fname: 'akle-physical.jpg'
          },
          {
            fname: 'ayangile-2.jpg'
          },
          {
            fname: 'ayangile-cross.jpg'
          },
          {
            fname: 'ayangile-physical.jpg'
          },
          {
            fname: 'ayangile-structural.jpg'
          },
          {
            fname: 'banuyo-2.jpg'
          },
          {
            fname: 'banuyo-cross.jpg'
          },
          {
            fname: 'banuyo-physical.jpg'
          },
          {
            fname: 'batete-2.jpg'
          },
          {
            fname: 'batete-cross.jpg'
          },
          {
            fname: 'batete-physical.jpg'
          },
          {
            fname: 'golden-shower.jpg'
          },
          {
            fname: 'goldenshower-2.jpg'
          },
          {
            fname: 'golden-shower-cross.jpg'
          },
          {
            fname: 'goldenshower-physical.jpg'
          },
          {
            fname: 'ipil-2.jpg'
          },
          {
            fname: 'ipil-cross.jpg'
          },
          {
            fname: 'ipil-ipil-2.jpg'
          },
          {
            fname: 'ipil-ipil-cross.jpg'
          },
          {
            fname: 'ipil-physical.jpg'
          },
          {
            fname: 'kakaute-2.jpg'
          },
          {
            fname: 'kakaute-cross.jpg'
          },
          {
            fname: 'kakaute-physical.jpg'
          },
          {
            fname: 'kamatog-2.jpg'
          },
          {
            fname: 'kamatog-cross.jpg'
          },
          {
            fname: 'kamatog-physical.jpg'
          },
          {
            fname: 'logwood-2.jpg'
          },
          {
            fname: 'logwood-cross.jpg'
          },
          {
            fname: 'logwood-physical.jpg'
          },
          {
            fname: 'manggis-2.jpg'
          },
          {
            fname: 'manggis-cross.jpg'
          },
          {
            fname: 'manggis-physical.jpg'
          },
          {
            fname: 'manggis-ripple.jpg'
          },
          {
            fname: 'mangium-2.jpg'
          },
          {
            fname: 'mangium-cross.jpg'
          },
          {
            fname: 'mangium-physical.jpg'
          },
          {
            fname: 'mollucan-sau-physical.jpg'
          },
          {
            fname: 'molluccan-sau-2.jpg'
          },
          {
            fname: 'narra-2.jpg'
          },
          {
            fname: 'narra-cross.jpg'
          },
          {
            fname: 'narra-physical.jpg'
          },
          {
            fname: 'narra-ripple.jpg'
          },
          {
            fname: 'permit-1.png'
          },
          {
            fname: 'permit-2.png'
          },
          {
            fname: 'rain-tree-2.jpg'
          },
          {
            fname: 'raintree-cross.jpg'
          },
          {
            fname: 'rain-tree-physical.jpg'
          },
          {
            fname: 'siar-2.jpg'
          },
          {
            fname: 'siar-cross.jpg'
          },
          {
            fname: 'siar-physical.jpg'
          },
          {
            fname: 'siar-ripple.jpg'
          },
          {
            fname: 'supa-2.jpg'
          },
          {
            fname: 'supa-cross.jpg'
          },
          {
            fname: 'supa-physical.jpg'
          },
          {
            fname: 'tindalo.jpg'
          },
          {
            fname: 'tindalo-2.jpg'
          },
          {
            fname: 'tindalo-cross.jpg'
          },
          {
            fname: 'tindalo-physical.jpg'
          }
        ]
      },
      module: {
        type: Object,
        value: {
          baseURL: '/assets/forestry',
          events: {
          },
          objects: {
            'start': {
              'type': 'image',
              'src': '/images/start.jpg'
            },
            'xylarium': {
              'type': 'image',
              'src': '/images/xylarium.jpg'
            },
            'truck-fron': {
              'type': 'image',
              'src': '/images/truck-front.png'
            },
            'truck-back': {
              'type': 'image',
              'src': '/images/truck-back.png'
            },
            'truck-back2': {
              'type': 'image',
              'src': '/images/truck-back2.png'
            },
            'supervisor': {
              'type': 'image',
              'src': '/images/supervisor.png'
            },
            'forester-1': {
              'type': 'image',
              'src': '/images/forester-1.png'
            },
            'forester-2': {
              'type': 'image',
              'src': '/images/forester-2.png'
            },
            'pahinante': {
              'type': 'image',
              'src': '/images/pahinante.png'
            },
            'tablet': {
              'type': 'image',
              'src': '/images/tablet.png'
            },
            'nextDialogue': {
              'type': 'image',
              'src': '/images/nextDialogue.png'
            },
            'nextScene': {
              'type': 'image',
              'src': '/images/nextScene.png'
            },
            'akle-2': {
              'type': 'image',
              'src': '/images/akle-2.jpg'
            },
            'akle-cross': {
              'type': 'image',
              'src': '/images/akle-cross.jpg'
            },
            'akle-physical.jpg': {
              'type': 'image',
              'src': '/images/akle-physical.jpg'
            },
            'ayangile-2': {
              'type': 'image',
              'src': '/images/ayangile-2.jpg'
            },
            'ayangile-cross.jpg': {
              'type': 'image',
              'src': '/images/ayangile-cross.jpg'
            },
            'ayangile-physical': {
              'type': 'image',
              'src': '/images/ayangile-physical.jpg'
            },
            'ayangile-structural': {
              'type': 'image',
              'src': '/images/ayangile-structural.jpg'
            },
            'banuyo-2': {
              'type': 'image',
              'src': '/images/banuyo-2.jpg'
            },
            'banuyo-cross': {
              'type': 'image',
              'src': '/images/banuyo-cross.jpg'
            },
            'banuyo-physical': {
              'type': 'image',
              'src': '/images/banuyo-physical.jpg'
            },
            'batete-2': {
              'type': 'image',
              'src': '/images/batete-2.jpg'
            },
            'batete-cross': {
              'type': 'image',
              'src': '/images/batete-cross.jpg'
            },
            'batete-physical': {
              'type': 'image',
              'src': '/images/batete-physical.jpg'
            },
            'golden-shower': {
              'type': 'image',
              'src': '/images/golden-shower.jpg'
            },
            'goldenshower-2': {
              'type': 'image',
              'src': '/images/goldenshower-2.jpg'
            },
            'golden-shower-cross': {
              'type': 'image',
              'src': '/images/golden-shower-cross.jpg'
            },
            'goldenshower-physical': {
              'type': 'image',
              'src': '/images/goldenshower-physical.jpg'
            },
            'ipil-2': {
              'type': 'image',
              'src': '/images/ipil-2.jpg'
            },
            'ipil-cross': {
              'type': 'image',
              'src': '/images/ipil-cross.jpg'
            },
            'ipil-ipil-2': {
              'type': 'image',
              'src': '/images/ipil-ipil-2.jpg'
            },
            'ipil-ipil-cross': {
              'type': 'image',
              'src': '/images/ipil-ipil-cross.jpg'
            },
            'ipil-physical': {
              'type': 'image',
              'src': '/images/ipil-physical.jpg'
            },
            'kakaute-2': {
              'type': 'image',
              'src': '/images/kakaute-2.jpg'
            },
            'kakaute-cross': {
              'type': 'image',
              'src': '/images/kakaute-cross.jpg'
            },
            'kakaute-physical': {
              'type': 'image',
              'src': '/images/kakaute-physical.jpg'
            },
            'kamatog-2': {
              'type': 'image',
              'src': '/images/kamatog-2.jpg'
            },
            'kamatog-cross': {
              'type': 'image',
              'src': '/images/kamatog-cross.jpg'
            },
            'kamatog-physical': {
              'type': 'image',
              'src': '/images/kamatog-physical.jpg'
            },
            'logwood-2': {
              'type': 'image',
              'src': '/images/logwood-2.jpg'
            },
            'logwood-cross': {
              'type': 'image',
              'src': '/images/logwood-cross.jpg'
            },
            'logwood-physical': {
              'type': 'image',
              'src': '/images/logwood-physical.jpg'
            },
            'manggis-2': {
              'type': 'image',
              'src': '/images/manggis-2.jpg'
            },
            'manggis-cross': {
              'type': 'image',
              'src': '/images/manggis-cross.jpg'
            },
            'manggis-physical': {
              'type': 'image',
              'src': '/images/manggis-physical.jpg'
            },
            'manggis-ripple': {
              'type': 'image',
              'src': '/images/manggis-ripple.jpg'
            },
            'mangium-2': {
              'type': 'image',
              'src': '/images/mangium-2.jpg'
            },
            'mangium-cross': {
              'type': 'image',
              'src': '/images/mangium-cross.jpg'
            },
            'mangium-physical': {
              'type': 'image',
              'src': '/images/mangium-physical.jpg'
            },
            'mollucan-sau-physical': {
              'type': 'image',
              'src': '/images/mollucan-sau-physical.jpg'
            },
            'molluccan-sau-2': {
              'type': 'image',
              'src': '/images/mollucan-sau-2.jpg'
            },
            'narra-2': {
              'type': 'image',
              'src': '/images/narra-2.jpg'
            },
            'narra-cross': {
              'type': 'image',
              'src': '/images/narra-cross.jpg'
            },
            'narra-physical': {
              'type': 'image',
              'src': '/images/narra-physical.jpg'
            },
            'narra-ripple': {
              'type': 'image',
              'src': '/images/narra-ripple.jpg'
            },
            'permit-1': {
              'type': 'image',
              'src': '/images/permit-1.png'
            },
            'permit-2': {
              'type': 'image',
              'src': '/images/permit-2.jpg'
            },
            'rain-tree-2': {
              'type': 'image',
              'src': '/images/rain-tree-2.jpg'
            },
            'raintree-cross': {
              'type': 'image',
              'src': '/images/raintree-cross.jpg'
            },
            'rain-tree-physical': {
              'type': 'image',
              'src': '/images/rain-tree-physical.jpg'
            },
            'siar-2': {
              'type': 'image',
              'src': '/images/siar-2.jpg'
            },
            'siar-cross': {
              'type': 'image',
              'src': '/images/siar-cross.jpg'
            },
            'siar-physical': {
              'type': 'image',
              'src': '/images/siar-physical.jpg'
            },
            'siar-ripple': {
              'type': 'image',
              'src': '/images/siar-ripple.jpg'
            },
            'supa-2': {
              'type': 'image',
              'src': '/images/supa-2.jpg'
            },
            'supa-cross': {
              'type': 'image',
              'src': '/images/supa-cross.jpg'
            },
            'supa-physical': {
              'type': 'image',
              'src': '/images/supa-physical.jpg'
            },
            'tindalo': {
              'type': 'image',
              'src': '/images/tindalo.jpg'
            },
            'tindalo-2': {
              'type': 'image',
              'src': '/images/tindalo-2.jpg'
            },
            'tindalo-cross': {
              'type': 'image',
              'src': '/images/tindalo-cross.jpg'
            },
            'tindalo-physical': {
              'type': 'image',
              'src': '/images/tindalo-physical.jpg'
            }
          },
          eventStart: 'event-01'
        }
      },
      toolkit: {
        type: Object,
        value: {
          lessons: [
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
          ],
          events: {
          },
          objects: {
            'start': {
              'type': 'image',
              'src': '/images/start.jpg'
            },
            'xylarium': {
              'type': 'image',
              'src': '/images/xylarium.jpg'
            },
            'truck-front': {
              'type': 'image',
              'src': '/images/truck-front.png'
            },
            'truck-back': {
              'type': 'image',
              'src': '/images/truck-back.png'
            },
            'truck-back2': {
              'type': 'image',
              'src': '/images/truck-back2.png'
            },
            'checkpoint': {
              'type': 'image',
              'src': '/images/checkpoint.jpg'
            },
            'supervisor': {
              'type': 'image',
              'src': '/images/supervisor.png'
            },
            'forester-1': {
              'type': 'image',
              'src': '/images/forester-1.png'
            },
            'forester-2': {
              'type': 'image',
              'src': '/images/forester-2.png'
            },
            'pahinante': {
              'type': 'image',
              'src': '/images/pahinante.png'
            },
            'tablet': {
              'type': 'image',
              'src': '/images/tablet.png'
            },
            'nextDialogue': {
              'type': 'image',
              'src': '/images/nextDialogue.png'
            },
            'nextScene': {
              'type': 'image',
              'src': '/images/nextScene.png'
            },
            'akle-2': {
              'type': 'image',
              'src': '/images/akle-2.jpg'
            },
            'akle-cross': {
              'type': 'image',
              'src': '/images/akle-cross.jpg'
            },
            'akle-physical.jpg': {
              'type': 'image',
              'src': '/images/akle-physical.jpg'
            },
            'ayangile-2': {
              'type': 'image',
              'src': '/images/ayangile-2.jpg'
            },
            'ayangile-cross.jpg': {
              'type': 'image',
              'src': '/images/ayangile-cross.jpg'
            },
            'ayangile-physical': {
              'type': 'image',
              'src': '/images/ayangile-physical.jpg'
            },
            'ayangile-structural': {
              'type': 'image',
              'src': '/images/ayangile-structural.jpg'
            },
            'banuyo-2': {
              'type': 'image',
              'src': '/images/banuyo-2.jpg'
            },
            'banuyo-cross': {
              'type': 'image',
              'src': '/images/banuyo-cross.jpg'
            },
            'banuyo-physical': {
              'type': 'image',
              'src': '/images/banuyo-physical.jpg'
            },
            'batete-2': {
              'type': 'image',
              'src': '/images/batete-2.jpg'
            },
            'batete-cross': {
              'type': 'image',
              'src': '/images/batete-cross.jpg'
            },
            'batete-physical': {
              'type': 'image',
              'src': '/images/batete-physical.jpg'
            },
            'golden-shower': {
              'type': 'image',
              'src': '/images/golden-shower.jpg'
            },
            'goldenshower-2': {
              'type': 'image',
              'src': '/images/goldenshower-2.jpg'
            },
            'golden-shower-cross': {
              'type': 'image',
              'src': '/images/golden-shower-cross.jpg'
            },
            'goldenshower-physical': {
              'type': 'image',
              'src': '/images/goldenshower-physical.jpg'
            },
            'ipil-2': {
              'type': 'image',
              'src': '/images/ipil-2.jpg'
            },
            'ipil-cross': {
              'type': 'image',
              'src': '/images/ipil-cross.jpg'
            },
            'ipil-ipil-2': {
              'type': 'image',
              'src': '/images/ipil-ipil-2.jpg'
            },
            'ipil-ipil-cross': {
              'type': 'image',
              'src': '/images/ipil-ipil-cross.jpg'
            },
            'ipil-physical': {
              'type': 'image',
              'src': '/images/ipil-physical.jpg'
            },
            'kakaute-2': {
              'type': 'image',
              'src': '/images/kakaute-2.jpg'
            },
            'kakaute-cross': {
              'type': 'image',
              'src': '/images/kakaute-cross.jpg'
            },
            'kakaute-physical': {
              'type': 'image',
              'src': '/images/kakaute-physical.jpg'
            },
            'kamatog-2': {
              'type': 'image',
              'src': '/images/kamatog-2.jpg'
            },
            'kamatog-cross': {
              'type': 'image',
              'src': '/images/kamatog-cross.jpg'
            },
            'kamatog-physical': {
              'type': 'image',
              'src': '/images/kamatog-physical.jpg'
            },
            'logwood-2': {
              'type': 'image',
              'src': '/images/logwood-2.jpg'
            },
            'logwood-cross': {
              'type': 'image',
              'src': '/images/logwood-cross.jpg'
            },
            'logwood-physical': {
              'type': 'image',
              'src': '/images/logwood-physical.jpg'
            },
            'manggis-2': {
              'type': 'image',
              'src': '/images/manggis-2.jpg'
            },
            'manggis-cross': {
              'type': 'image',
              'src': '/images/manggis-cross.jpg'
            },
            'manggis-physical': {
              'type': 'image',
              'src': '/images/manggis-physical.jpg'
            },
            'manggis-ripple': {
              'type': 'image',
              'src': '/images/manggis-ripple.jpg'
            },
            'mangium-2': {
              'type': 'image',
              'src': '/images/mangium-2.jpg'
            },
            'mangium-cross': {
              'type': 'image',
              'src': '/images/mangium-cross.jpg'
            },
            'mangium-physical': {
              'type': 'image',
              'src': '/images/mangium-physical.jpg'
            },
            'mollucan-sau-physical': {
              'type': 'image',
              'src': '/images/mollucan-sau-physical.jpg'
            },
            'molluccan-sau-2': {
              'type': 'image',
              'src': '/images/mollucan-sau-2.jpg'
            },
            'narra-2': {
              'type': 'image',
              'src': '/images/narra-2.jpg'
            },
            'narra-cross': {
              'type': 'image',
              'src': '/images/narra-cross.jpg'
            },
            'narra-physical': {
              'type': 'image',
              'src': '/images/narra-physical.jpg'
            },
            'narra-ripple': {
              'type': 'image',
              'src': '/images/narra-ripple.jpg'
            },
            'permit-1': {
              'type': 'image',
              'src': '/images/permit-1.png'
            },
            'permit-2': {
              'type': 'image',
              'src': '/images/permit-2.jpg'
            },
            'rain-tree-2': {
              'type': 'image',
              'src': '/images/rain-tree-2.jpg'
            },
            'raintree-cross': {
              'type': 'image',
              'src': '/images/raintree-cross.jpg'
            },
            'rain-tree-physical': {
              'type': 'image',
              'src': '/images/rain-tree-physical.jpg'
            },
            'siar-2': {
              'type': 'image',
              'src': '/images/siar-2.jpg'
            },
            'siar-cross': {
              'type': 'image',
              'src': '/images/siar-cross.jpg'
            },
            'siar-physical': {
              'type': 'image',
              'src': '/images/siar-physical.jpg'
            },
            'siar-ripple': {
              'type': 'image',
              'src': '/images/siar-ripple.jpg'
            },
            'supa-2': {
              'type': 'image',
              'src': '/images/supa-2.jpg'
            },
            'supa-cross': {
              'type': 'image',
              'src': '/images/supa-cross.jpg'
            },
            'supa-physical': {
              'type': 'image',
              'src': '/images/supa-physical.jpg'
            },
            'tindalo': {
              'type': 'image',
              'src': '/images/tindalo.jpg'
            },
            'tindalo-2': {
              'type': 'image',
              'src': '/images/tindalo-2.jpg'
            },
            'tindalo-cross': {
              'type': 'image',
              'src': '/images/tindalo-cross.jpg'
            },
            'tindalo-physical': {
              'type': 'image',
              'src': '/images/tindalo-physical.jpg'
            }
          }
        }
      },
      objectClicked: {
        type: Object,
        value: {}
      },
      scene: {
        type: Object,
        value: {}
      },
      dialogues: {
        type: Number,
        value: 1
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
      canvas.style.cssText = 'border: 1px solid #000000; margin: 12px 24px; height: 75vh; width: 75%; overflow: hidden; display: relative;';
      workspace.appendChild(canvas);
      const loadedEvents = Object.keys(this.module.events).length;
      // console.log(loadedEvents);
      const name1 = 'event-0';
      const name = 'event-';
      const num = loadedEvents + 1;
      if (loadedEvents < 9) {
        if (this.toolkit.events[name1 + num] !== name1 + num || this.toolkit.events[name1 + num] !== name1 + num) {
          this.toolkit.events[name1 + num] = {};
          this.module.events[name1 + num] = {};
          this.scene.name = name1 + num;
        }
      } else {
        if (this.toolkit.events[name + num] !== name + num || this.toolkit.events[name + num] !== name + num) {
          this.toolkit.events[name + num] = {};
          this.module.events[name + num] = {};
          this.scene.name = name + num;
        }
      }
    } else {
      workspace.removeChild(workspace.children[1]);
      this.scene.id = el.id;
      const canvas = document.createElement('div');
      canvas.id = 'canvas' + this.scene.id;
      canvas.style.cssText = 'border: 1px solid #000000; margin: 12px 24px; height: 75vh; width: 75%; overflow: hidden;';
      workspace.appendChild(canvas);
      const loadedEvents = Object.keys(this.module.events).length;
      // console.log(loadedEvents);
      const name1 = 'event-0';
      const name = 'event-';
      const num = loadedEvents + 1;
      if (loadedEvents < 9) {
        if (this.toolkit.events[name1 + num] !== name1 + num || this.toolkit.events[name1 + num] !== name1 + num) {
          this.toolkit.events[name1 + num] = {};
          this.module.events[name1 + num] = {};
        }
      } else {
        if (this.toolkit.events[name + num] !== name + num || this.toolkit.events[name + num] !== name + num) {
          this.toolkit.events[name + num] = {};
          this.module.events[name + num] = {};
        }
      }
    }
  }

  _backgroundClick () {
    const cv = this.shadowRoot.querySelector('#canvas' + this.scene.id);
    if (cv) {
      const assets = this.shadowRoot.querySelector('#assets');
      while (assets.firstChild) {
        assets.removeChild(assets.firstChild);
      }
      for (let item of this.backgrounds) {
        const image = document.createElement('img');
        image.src = '/assets/forestry/images/background/' + item.fname;
        image.style.width = '10%';
        image.style.margin = '10px';
        assets.appendChild(image);
        image.addEventListener('click', event => {
          if (cv && cv.firstChild) {
            cv.removeChild(cv.firstChild);
          }
          if (cv) {
            const copy = image.cloneNode(true);
            copy.style.cssText = 'width: 100%; height: 100%; margin: 0px; z-index: 0; position: relative;';
            copy.id = 'background';
            cv.appendChild(copy);
            const name = this.scene.name;
            const objId = item.fname.split('.')[0];
            this.toolkit.events[name].default = 'trigger-01';
            this.toolkit.events[name].triggers = {};
            this.toolkit.events[name].triggers['trigger-01'] = {};
            this.toolkit.events[name].triggers['trigger-01'].type = 'load';
            this.toolkit.events[name].triggers['trigger-01'].load = [];
            this.toolkit.events[name].triggers['trigger-01'].load.push({ objectId: objId, id: 'object-01', style: ['z-index: 0', 'width: 100%', 'height: 100%', 'position: relative', 'id: background'] });
            // console.log(this.toolkit);

            this.module.events[name].default = 'trigger-01';
            this.module.events[name].triggers = {};
            this.module.events[name].triggers['trigger-01'] = {};
            this.module.events[name].triggers['trigger-01'].type = 'load';
            this.module.events[name].triggers['trigger-01'].load = [];
            this.module.events[name].triggers['trigger-01'].load.push({ objectId: objId, id: 'object-01', meta: { fullscreen: true, cover: true }, style: ['z-index: 0'] });
            // console.log(this.module);
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
        image.style.cssText = 'width: 4%; margin: 5px 15px;';
        assets.appendChild(image);

        image.addEventListener('click', event => {
          if (bg === null) {
            console.warn('Can\'t add character, no background yet');
            const snacker = document.querySelector('.snackbar-lite');
            snacker.textContent = 'Can\'t add character, no background yet';
            snacker.show();
          } else {
            const copy = document.importNode(image);
            const id = item.fname.split('.');
            copy.id = id[0];
            copy.dataset.size = 'normal';
            copy.style.cssText = 'top: 40%; width: 25%; height: 40%; margin: 0px; z-Index: 1; position: absolute;';
            console.log(copy);
            this.objectClicked = copy;
            let confirm = document.createElement('button');
            confirm.innerHTML = 'confirm';
            confirm.id = 'confirm';
            let cancel = document.createElement('button');
            cancel.innerHTML = 'cancel';
            cancel.id = 'cancel';
            confirm.style.cssText = 'width: 5%; z-index: 20; top: 35%; height: 5%; position: absolute;';
            cancel.style.cssText = 'width: 5%; z-index: 20; top: 35%; height: 5%; position: absolute;';
            let sizeUp = document.createElement('button');
            sizeUp.innerHTML = '+';
            sizeUp.id = 'sizeUp';
            let sizeDown = document.createElement('button');
            sizeDown.innerHTML = '-';
            sizeDown.id = 'sizeDown';
            sizeUp.style.cssText = 'width: 5%; z-index: 20; top: 35%; height: 5%; position: absolute;';
            sizeDown.style.cssText = 'width: 5%; z-index: 20; top: 35%; height: 5%; position: absolute;';

            canvas.addEventListener('click', event => {
              let check = confirm;
              let ex = cancel;
              let up = sizeUp;
              let down = sizeDown;
              const width = canvas.clientWidth;
              const left = width / 3;
              const center = left + left;
              let char = this.objectClicked;

              if (char !== '') {
                const fname = char.src.split('/');
                if (fname[7] === 'forester-1.png') {
                  char.style.top = '45%';
                } else if (fname[7] === 'forester-2.png') {
                  char.style.top = '42%';
                } else if (fname[7] === 'pahinante.png') {
                  check.style.top = '35%';
                } else {}

                if (event.offsetX < left) {
                  char.style.left = '25%';
                  check.style.left = '27%';
                  ex.style.left = '32%';
                  down.style.left = '37%';
                  up.style.left = '42%';
                  char.dataset.alignment = 'left';
                } else if (event.offsetX > left && event.offsetX < center) {
                  char.style.left = '50%';
                  check.style.left = '52%';
                  ex.style.left = '57%';
                  down.style.left = '62%';
                  up.style.left = '67%';
                  char.dataset.alignment = 'center';
                } else {
                  char.style.left = '72%';
                  check.style.left = '74%';
                  ex.style.left = '79%';
                  down.style.left = '84%';
                  up.style.left = '89%';
                  char.dataset.alignment = 'right';
                }

                canvas.appendChild(char);
                canvas.appendChild(check);
                canvas.appendChild(ex);
                canvas.appendChild(down);
                canvas.appendChild(up);

                check.addEventListener('click', event => {
                  const objId = item.fname.split('.')[0];
                  const name = this.scene.name;
                  const char = this.shadowRoot.querySelector('#' + id[0]);
                  // const objId = item.fname.split('.')[0];
                  // this.module.events[name].triggers['trigger01'].load.push({ objectId: objId, id: 'object-01', meta: { fullscreen: true, cover: true }, style: ['z-index: 0'] });
                  // console.log(this.module.events[name].triggers['trigger01'].load.length);
                  const loadedObjs = this.module.events[name].triggers['trigger-01'].load.length;
                  let add = loadedObjs + 1;
                  if (loadedObjs < 9) {
                    this.module.events[name].triggers['trigger-01'].load.push({ objectId: objId, id: 'object-0' + add, meta: { cover: false, classList: 'character character-' + char.getAttribute('data-alignment') + ' small-character' }, style: ['z-index: 1'] });
                  } else {
                    this.module.events[name].triggers['trigger-01'].load.push({ objectId: objId, id: 'object-' + add, meta: { cover: false, classList: 'character character-' + char.getAttribute('data-alignment') + ' small-character' }, style: ['z-index: 1'] });
                  }
                  console.log(this.module);
                  // this.module.events[name].triggers['trigger01'].load.push({ objectId: objId, id: });
                  this.objectClicked = '';
                  confirm = '';
                  check = '';
                  check = this.shadowRoot.querySelector('#confirm');
                  check.remove();
                  cancel = '';
                  ex = '';
                  ex = this.shadowRoot.querySelector('#cancel');
                  ex.remove();
                  sizeUp = '';
                  up = '';
                  up = this.shadowRoot.querySelector('#sizeUp');
                  up.remove();
                  sizeDown = '';
                  down = '';
                  down = this.shadowRoot.querySelector('#sizeDown');
                  down.remove();
                });

                ex.addEventListener('click', event => {
                  this.objectClicked = '';
                  confirm = '';
                  check = '';
                  check = this.shadowRoot.querySelector('#confirm');
                  check.remove();
                  cancel = '';
                  ex = '';
                  ex = this.shadowRoot.querySelector('#cancel');
                  ex.remove();
                  sizeUp = '';
                  up = '';
                  up = this.shadowRoot.querySelector('#sizeUp');
                  up.remove();
                  sizeDown = '';
                  down = '';
                  down = this.shadowRoot.querySelector('#sizeDown');
                  down.remove();
                  let toRemove = this.shadowRoot.querySelector('#' + id[0]);
                  toRemove.remove();
                });

                let toResize = this.shadowRoot.querySelector('#' + id[0]);
                down.addEventListener('click', event => {
                  let checkd = this.shadowRoot.querySelector('#confirm');
                  let exd = this.shadowRoot.querySelector('#cancel');
                  let upd = this.shadowRoot.querySelector('#sizeUp');
                  let downd = this.shadowRoot.querySelector('#sizeDown');
                  if (toResize.dataset.size === 'bigger') {
                    // console.log('im bigger! going down!');
                    toResize.dataset.size = 'normal';
                    if (toResize.dataset.alignment === 'center') {
                      toResize.style.cssText = 'top: 40%; width: 25%; left: 50%; height: 40%; margin: 0px; z-Index: 1; position: absolute;';
                    } else if (toResize.dataset.alignment === 'right') {
                      toResize.style.cssText = 'top: 40%; width: 25%; left: 72%; height: 40%; margin: 0px; z-Index: 1; position: absolute;';
                    } else {
                      toResize.style.cssText = 'top: 40%; width: 25%; left: 25%; height: 40%; margin: 0px; z-Index: 1; position: absolute;';
                    }
                    checkd.style.top = '35%';
                    exd.style.top = '35%';
                    upd.style.top = '35%';
                    downd.style.top = '35%';
                    toResize = '';
                  } else if (toResize.dataset.size === 'normal') {
                    // console.log('im normal! going down!');
                    toResize.dataset.size = 'smaller';
                    if (toResize.dataset.alignment === 'center') {
                      // console.log('center!!');
                      toResize.style.left = 'top: 50%; width: 20%; left: 50%; height: 30%; margin: 0px; z-Index: 1; position: absolute;';
                    } else if (toResize.dataset.alignment === 'right') {
                      // console.log('right!!');
                      toResize.style.cssText = 'top: 50%; width: 20%; left: 72%; height: 30%; margin: 0px; z-Index: 1; position: absolute;';
                    } else {
                      // console.log('left!!');
                      toResize.style.cssText = 'top: 50%; width: 20%; left: 25%; height: 30%; margin: 0px; z-Index: 1; position: absolute;';
                    }
                    checkd.style.top = '45%';
                    exd.style.top = '45%';
                    upd.style.top = '45%';
                    downd.style.top = '45%';
                    toResize = '';
                  } else {}
                });

                up.addEventListener('click', event => {
                  let checkd = this.shadowRoot.querySelector('#confirm');
                  let exd = this.shadowRoot.querySelector('#cancel');
                  let upd = this.shadowRoot.querySelector('#sizeUp');
                  let downd = this.shadowRoot.querySelector('#sizeDown');
                  if (toResize.dataset.size === 'smaller') {
                    toResize.dataset.size = 'normal';
                    if (toResize.dataset.alignment === 'center') {
                      toResize.style.cssText = 'top: 40%; width: 25%; left: 50%; height: 40%; margin: 0px; z-Index: 1; position: absolute;';
                    } else if (toResize.dataset.alignment === 'right') {
                      toResize.style.cssText = 'top: 40%; width: 25%; left: 72%; height: 40%; margin: 0px; z-Index: 1; position: absolute;';
                    } else {
                      toResize.style.cssText = 'top: 40%; width: 25%; left: 25%; height: 40%; margin: 0px; z-Index: 1; position: absolute;';
                    }
                    checkd.style.top = '35%';
                    exd.style.top = '35%';
                    upd.style.top = '35%';
                    downd.style.top = '35%';
                    toResize = '';
                  } else if (toResize.dataset.size === 'normal') {
                    toResize.dataset.size = 'bigger';
                    if (toResize.dataset.alignment === 'center') {
                      toResize.style.cssText = 'top: 30%; width: 25%; left: 50%; height: 50%; margin: 0px; z-Index: 1; position: absolute;';
                    } else if (toResize.dataset.alignment === 'right') {
                      toResize.style.cssText = 'top: 30%; width: 25%; left: 72%; height: 50%; margin: 0px; z-Index: 1; position: absolute;';
                    } else {
                      toResize.style.cssText = 'top: 30%; width: 25%; left: 25%; height: 50%; margin: 0px; z-Index: 1; position: absolute;';
                    }
                    checkd.style.top = '25%';
                    exd.style.top = '25%';
                    upd.style.top = '25%';
                    downd.style.top = '25%';
                    toResize = '';
                  } else {}
                });

                const upper = char.offsetTop;
                const upperLeft = char.offsetLeft;
                console.log(upperLeft, upper);
                char = '';
                check = '';
              } else {}
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
        image.style.cssText = 'width: 150px; height: 100px; margin: 5px 15px;';
        assets.appendChild(image);

        image.addEventListener('click', event => {
          if (bg === null) {
            console.warn('Can\'t add object, no background yet');
            const snacker = document.querySelector('.snackbar-lite');
            snacker.textContent = 'Can\'t add object, no background yet';
            snacker.show();
          } else {
            const copy = document.importNode(image);
            const id = item.fname.split('.');
            copy.id = id[0];
            copy.dataset.size = 'normal';
            copy.style.cssText = 'top: 40%; width: 35%; height: 40%; margin: 0px; z-Index: 1; position: absolute;';
            this.objectClicked = copy;
            let confirmObj = document.createElement('button');
            confirmObj.innerHTML = 'confirm';
            confirmObj.id = 'confirmObj';
            let cancelObj = document.createElement('button');
            cancelObj.innerHTML = 'cancel';
            cancelObj.id = 'cancelObj';
            confirmObj.style.cssText = 'width: 5%; z-index: 20; top: 35%; height: 5%; position: absolute;';
            cancelObj.style.cssText = 'width: 5%; z-index: 20; top: 35%; height: 5%; position: absolute;';
            let sizeUpObj = document.createElement('button');
            sizeUpObj.innerHTML = '+';
            sizeUpObj.id = 'sizeUpObj';
            let sizeDownObj = document.createElement('button');
            sizeDownObj.innerHTML = '-';
            sizeDownObj.id = 'sizeDownObj';
            sizeUpObj.style.cssText = 'width: 5%; z-index: 20; top: 35%; height: 5%; position: absolute;';
            sizeDownObj.style.cssText = 'width: 5%; z-index: 20; top: 35%; height: 5%; position: absolute;';

            canvas.addEventListener('click', event => {
              let checkObj = confirmObj;
              let exObj = cancelObj;
              let upObj = sizeUpObj;
              let downObj = sizeDownObj;
              const width = canvas.clientWidth;
              const left = width / 3;
              const center = left + left;
              let obj = this.objectClicked;

              if (obj !== '') {
                if (event.offsetX < left) {
                  obj.style.left = '25%';
                  checkObj.style.left = '25%';
                  exObj.style.left = '30%';
                  downObj.style.left = '35%';
                  upObj.style.left = '40%';
                  obj.dataset.alignment = 'left';
                } else if (event.offsetX > left && event.offsetX < center) {
                  obj.style.left = '45%';
                  checkObj.style.left = '45%';
                  exObj.style.left = '50%';
                  downObj.style.left = '55%';
                  upObj.style.left = '60%';
                  obj.dataset.alignment = 'center';
                } else {
                  obj.style.left = '62%';
                  checkObj.style.left = '62%';
                  exObj.style.left = '67%';
                  downObj.style.left = '72%';
                  upObj.style.left = '77%';
                  obj.dataset.alignment = 'right';
                }

                canvas.appendChild(obj);
                canvas.appendChild(checkObj);
                canvas.appendChild(exObj);
                canvas.appendChild(downObj);
                canvas.appendChild(upObj);

                checkObj.addEventListener('click', event => {
                  const objId = item.fname.split('.')[0];
                  const name = this.scene.name;
                  const obj = this.shadowRoot.querySelector('#' + id[0]);
                  // const objId = item.fname.split('.')[0];
                  // this.module.events[name].triggers['trigger01'].load.push({ objectId: objId, id: 'object-01', meta: { fullscreen: true, cover: true }, style: ['z-index: 0'] });
                  // console.log(this.module.events[name].triggers['trigger01'].load.length);
                  const loadedObjs = this.module.events[name].triggers['trigger-01'].load.length;
                  let add = loadedObjs + 1;
                  if (loadedObjs < 9) {
                    if (objId === 'tablet') {
                      this.module.events[name].triggers['trigger-01'].load.push({ objectId: objId, id: 'object-0' + add, meta: { cover: false, classList: 'tablet tablet-' + obj.getAttribute('data-alignment') + ' tablet-small' }, style: ['z-index: 1'] });
                    }
                  } else {
                    if (objId === 'tablet') {
                      this.module.events[name].triggers['trigger-01'].load.push({ objectId: objId, id: 'object-' + add, meta: { cover: false, classList: 'tablet tablet-' + obj.getAttribute('data-alignment') + ' tablet-small' }, style: ['z-index: 1'] });
                    }
                  }
                  console.log(this.module);
                  this.objectClicked = '';
                  confirmObj = '';
                  checkObj = '';
                  checkObj = this.shadowRoot.querySelector('#confirmObj');
                  checkObj.remove();
                  cancelObj = '';
                  exObj = '';
                  exObj = this.shadowRoot.querySelector('#cancelObj');
                  exObj.remove();
                  sizeUpObj = '';
                  upObj = '';
                  upObj = this.shadowRoot.querySelector('#sizeUpObj');
                  upObj.remove();
                  sizeDownObj = '';
                  downObj = '';
                  downObj = this.shadowRoot.querySelector('#sizeDownObj');
                  downObj.remove();
                });

                exObj.addEventListener('click', event => {
                  this.objectClicked = '';
                  confirmObj = '';
                  checkObj = '';
                  checkObj = this.shadowRoot.querySelector('#confirmObj');
                  checkObj.remove();
                  cancelObj = '';
                  exObj = '';
                  exObj = this.shadowRoot.querySelector('#cancelObj');
                  exObj.remove();
                  upObj = '';
                  upObj = this.shadowRoot.querySelector('#sizeUpObj');
                  upObj.remove();
                  sizeDownObj = '';
                  downObj = '';
                  downObj = this.shadowRoot.querySelector('#sizeDownObj');
                  downObj.remove();
                  let toRemove = this.shadowRoot.querySelector('#' + id[0]);
                  toRemove.remove();
                });

                let toResizeObj = this.shadowRoot.querySelector('#' + id[0]);
                downObj.addEventListener('click', event => {
                  let checkd = this.shadowRoot.querySelector('#confirmObj');
                  let exd = this.shadowRoot.querySelector('#cancelObj');
                  let upd = this.shadowRoot.querySelector('#sizeUpObj');
                  let downd = this.shadowRoot.querySelector('#sizeDownObj');
                  if (toResizeObj.dataset.size === 'bigger') {
                    // console.log('im bigger! going down!');
                    toResizeObj.dataset.size = 'normal';
                    if (toResizeObj.dataset.alignment === 'center') {
                      toResizeObj.style.cssText = 'top: 40%; width: 25%; left: 50%; height: 40%; margin: 0px; z-Index: 1; position: absolute;';
                    } else if (toResizeObj.dataset.alignment === 'right') {
                      toResizeObj.style.cssText = 'top: 40%; width: 25%; left: 50%; height: 40%; margin: 0px; z-Index: 1; position: absolute;';
                    } else {
                      toResizeObj.style.cssText = 'top: 40%; width: 25%; left: 25%; height: 40%; margin: 0px; z-Index: 1; position: absolute;';
                    }
                    checkd.style.top = '35%';
                    exd.style.top = '35%';
                    upd.style.top = '35%';
                    downd.style.top = '35%';
                    toResizeObj = '';
                  } else if (toResizeObj.dataset.size === 'normal') {
                    // console.log('im normal! going down!');
                    toResizeObj.dataset.size = 'smaller';
                    if (toResizeObj.dataset.alignment === 'center') {
                      // console.log('center!!');
                      toResizeObj.style.left = 'top: 50%; width: 20%; left: 50%; height: 30%; margin: 0px; z-Index: 1; position: absolute;';
                    } else if (toResizeObj.dataset.alignment === 'right') {
                      // console.log('right!!');
                      toResizeObj.style.cssText = 'top: 50%; width: 20%; left: 50%; height: 30%; margin: 0px; z-Index: 1; position: absolute;';
                    } else {
                      // console.log('left!!');
                      toResizeObj.style.cssText = 'top: 50%; width: 20%; left: 25%; height: 30%; margin: 0px; z-Index: 1; position: absolute;';
                    }
                    checkd.style.top = '45%';
                    exd.style.top = '45%';
                    upd.style.top = '45%';
                    downd.style.top = '45%';
                    toResizeObj = '';
                  } else {}
                });

                upObj.addEventListener('click', event => {
                  let checkd = this.shadowRoot.querySelector('#confirmObj');
                  let exd = this.shadowRoot.querySelector('#cancelObj');
                  let upd = this.shadowRoot.querySelector('#sizeUpObj');
                  let downd = this.shadowRoot.querySelector('#sizeDownObj');
                  if (toResizeObj.dataset.size === 'smaller') {
                    toResizeObj.dataset.size = 'normal';
                    if (toResizeObj.dataset.alignment === 'center') {
                      toResizeObj.style.cssText = 'top: 40%; width: 25%; left: 50%; height: 40%; margin: 0px; z-Index: 1; position: absolute;';
                    } else if (toResizeObj.dataset.alignment === 'right') {
                      toResizeObj.style.cssText = 'top: 40%; width: 25%; left: 72%; height: 40%; margin: 0px; z-Index: 1; position: absolute;';
                    } else {
                      toResizeObj.style.cssText = 'top: 40%; width: 25%; left: 25%; height: 40%; margin: 0px; z-Index: 1; position: absolute;';
                    }
                    checkd.style.top = '35%';
                    exd.style.top = '35%';
                    upd.style.top = '35%';
                    downd.style.top = '35%';
                    toResizeObj = '';
                  } else if (toResizeObj.dataset.size === 'normal') {
                    toResizeObj.dataset.size = 'bigger';
                    if (toResizeObj.dataset.alignment === 'center') {
                      toResizeObj.style.cssText = 'top: 30%; width: 35%; left: 50%; height: 50%; margin: 0px; z-Index: 1; position: absolute;';
                    } else if (toResizeObj.dataset.alignment === 'right') {
                      toResizeObj.style.cssText = 'top: 30%; width: 35%; left: 72%; height: 50%; margin: 0px; z-Index: 1; position: absolute;';
                    } else {
                      toResizeObj.style.cssText = 'top: 30%; width: 35%; left: 25%; height: 50%; margin: 0px; z-Index: 1; position: absolute;';
                    }
                    checkd.style.top = '25%';
                    exd.style.top = '25%';
                    upd.style.top = '25%';
                    downd.style.top = '25%';
                    toResizeObj = '';
                  } else {}
                });

                const upper = obj.offsetTop;
                const upperLeft = obj.offsetLeft;
                console.log(upperLeft, upper);
                obj = '';
                checkObj = '';
              } else {}
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
        const controls = document.createElement('div');
        controls.id = 'controls';

        canvas.appendChild(dialogueBox);
        dialogueBox.style.cssText = 'z-index: 1000; top: -25%; background: rgba(255, 255, 255, 0.75); color: black; font-size: 1rem;box-sizing: border-box; position: relative; height: 25%;';

        dialogueBox.appendChild(characterInput);
        characterInput.style.cssText = 'height: 10%; width: 100%; text-decoration: none; border: none; background: transparent;';
        characterInput.placeholder = 'Enter Character Name Here';

        let char = '';
        characterInput.addEventListener('change', event => {
          char = event.target.value;
        });

        dialogueBox.appendChild(dialogueInput);
        dialogueInput.style.cssText = 'height: 40%; width: 100%; background: transparent; font-size: 14px; resize: none; outline: none; border: none;';
        dialogueInput.placeholder = 'Enter Dialogue Here';
        dialogueInput.addEventListener('change', event => {
          let content = event.target.value;
          let name1 = 'dialogue-0';
          let name2 = 'dialogue-';

          if (this.dialogues < 9) {
            let name = name1 + this.dialogues;
            this.module.objects[name] = {};
            this.module.objects[name].type = 'dialogue';
            this.module.objects[name].character = char;
            this.module.objects[name].text = content;
            console.log(this.module);
          } else {
            let name3 = name2 + this.dialogues;
            this.module.objects[name3] = {};
            this.module.objects[name3].type = 'dialogue';
            this.module.objects[name3].character = char;
            this.module.objects[name3].text = content;
          }
        });

        dialogueBox.appendChild(controls);
        controls.style.cssText = 'height: 30%; width: 100%; background: transparent; font-size: 20px; outline: none; border: none;';
        const prev = document.createElement('button');
        controls.appendChild(prev);
        prev.innerHTML = 'Previous';
        prev.style.cssText = 'font-size: 1rem; background: #008080; color: #fff; padding: 12px 18px;';
        prev.id = 'prev';
        let dialogueCount = 1;
        const next = document.createElement('button');
        next.innerHTML = 'Continue';
        controls.appendChild(next);
        next.style.cssText = 'font-size: 1rem; background: #008080; color: #fff; padding: 12px 18px;';
        next.id = 'next';

        // if (dialogueCount === 1) {
        //   this.shadowRoot.querySelector('#next').remove();
        //   const next = document.createElement('button');
        //   next.innerHTML = 'Continue';
        //   controls.appendChild(next);
        //   next.style.cssText = 'font-size: 1rem; background: #008080; color: #fff; padding: 12px 18px;';
        //   next.id = 'next';
        // }
        next.addEventListener('click', event => {
          dialogueCount = dialogueCount + 1;
          if (dialogueInput.value === '' && characterInput.value === '') {
            let name5 = 'event-0';
            let name6 = 'event-';
            let index = Object.keys(this.module.events[this.scene.name].triggers).length - 2;
            let prevName = Object.keys(this.module.events[this.scene.name].triggers)[index];
            console.log(prevName);
            this.module.events[this.scene.name].triggers[prevName].type = 'next';
            let loadedEvents = Object.keys(this.module.events).length;
            if (loadedEvents < 9) {
              this.module.events[this.scene.name].triggers[prevName].event = name5 + (loadedEvents + 1);
            } else {
              this.module.events[this.scene.name].triggers[prevName].event = name6 + (loadedEvents + 1);
            }
            delete this.module.events[this.scene.name].triggers[prevName].objectId;
          }
          if (dialogueInput.value !== '' && characterInput.value !== '') {
            let name1 = 'trigger-0';
            let name2 = 'trigger-';
            let triggerCount = Object.keys(this.module.events[this.scene.name].triggers).length;
            let add = triggerCount + 1;
            let name3 = 'dialogue-0';
            let name4 = 'dialogue-';
            if (this.dialogues < 9) {
              const loadedObjs = this.module.events[this.scene.name].triggers['trigger-01'].load.length;
              let add2 = loadedObjs + 1;
              let name = name3 + this.dialogues;
              this.module.objects[name].next = name1 + add;
              if (this.dialogues === 1) {
                this.module.events[this.scene.name].triggers[name1 + add] = {};
                this.module.events[this.scene.name].triggers[name1 + add].type = 'dialogue';
                this.module.events[this.scene.name].triggers[name1 + add].objectId = name3 + (this.dialogues + 1);
                this.module.events[this.scene.name].triggers['trigger-01'].load.push({ objectId: name3 + this.dialogues, id: 'object-0' + add2, type: 'dialogue' });
                characterInput.value = '';
                dialogueInput.value = '';
              } else {
                this.module.events[this.scene.name].triggers[name1 + add] = {};
                this.module.events[this.scene.name].triggers[name1 + add].type = 'dialogue';
                this.module.events[this.scene.name].triggers[name1 + add].objectId = name3 + (this.dialogues + 1);
                add++;
                this.module.objects[name].prev = name1 + add;
                this.module.events[this.scene.name].triggers[name1 + add] = {};
                this.module.events[this.scene.name].triggers[name1 + add].type = 'dialogue';
                this.module.events[this.scene.name].triggers[name1 + add].objectId = name3 + (this.dialogues - 1);
                characterInput.value = '';
                dialogueInput.value = '';
              }
            } else {
              let name = name4 + this.dialogues;
              this.module.objects[name].next = name2 + add;
              this.module.events[this.scene.name].triggers[name2 + add] = {};
              this.module.events[this.scene.name].triggers[name2 + add].type = 'dialogue';
              this.module.events[this.scene.name].triggers[name2 + add].objectId = name4 + (this.dialogues + 1);
              add++;
              this.module.objects[name].prev = name2 + add;
              this.module.events[this.scene.name].triggers[name2 + add] = {};
              this.module.events[this.scene.name].triggers[name2 + add].type = 'dialogue';
              this.module.events[this.scene.name].triggers[name2 + add].objectId = name3 + (this.dialogues - 1);
              characterInput.value = '';
              dialogueInput.value = '';
            }

            this.dialogues = this.dialogues + 1;
          } else if (dialogueInput.value !== '' && characterInput.value === '') {
            console.warn('Can\'t proceed, please add dialogue');
            const snacker = document.querySelector('.snackbar-lite');
            snacker.textContent = 'Can\'t proceed, please add dialogue';
            snacker.show();
          } else if (dialogueInput.value === '' && characterInput.value !== '') {
            console.warn('Can\'t proceed, please add name of character');
            const snacker = document.querySelector('.snackbar-lite');
            snacker.textContent = 'Can\'t proceed, please add name of character';
            snacker.show();
          }

          prev.addEventListener('click', event => {
            // let name1 = 'trigger-0';
            // let name2 = 'trigger-';
            // let triggerCount = Object.keys(this.module.events[this.scene.name].triggers).length;
            // let add = triggerCount + 1;
            // let name3 = 'dialogue-0';
            // let name4 = 'dialogue-';
            // if (this.dialogues < 9) {
            //   const loadedObjs = this.module.events[this.scene.name].triggers['trigger-01'].load.length;
            //   let add2 = loadedObjs + 1;
            //   let name = name3 + this.dialogues;
            //   this.module.objects[name].next = name1 + add;
            //   if (this.dialogues !== 1) {

            //   }
          });

          console.log(this.module);
        });
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

  _save () {
    let exportObj = this.module;
    let exportName = 'ilo-4';
    let dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportObj, undefined, 2));
    let downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute('href', dataStr);
    downloadAnchorNode.setAttribute('download', exportName + '.json');
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }

  _load () {
    const form = this.shadowRoot.querySelector('#form');
    const input = this.shadowRoot.querySelector('#input');
    input.click();
    const submit = document.createElement('input');
    submit.type = 'submit';
    submit.value = 'upload';
    form.appendChild(submit);
    submit.click();
    input.addEventListener('change', this._fileChanged, false);
  }

  _fileChanged (event) {
    const file = event.target.files[0];
    console.log(file);
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
