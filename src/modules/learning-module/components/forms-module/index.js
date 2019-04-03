import { TemplateLite } from '@tjmonsi/element-lite/mixins/template-lite.js'; // to render template
import { ObserversLite } from '@tjmonsi/element-lite/mixins/observers-lite.js'; // to observe properties
import { render, html } from 'lit-html';
import { subscribe, unsubscribe, updateState } from '../../../../utils/state'; // to observe web states
import { changeLocation } from '../../../../utils/change-location';
import { template } from './template.js';
import style from './style.styl';
import '../../../general/components/lazy-picture';
import '../../../general/components/mark-lite';
import '../../../general/components/input-container';

const { HTMLElement, customElements, fetch } = window;

class Component extends TemplateLite(ObserversLite(HTMLElement)) {
  static get is () { return 'forms-module'; }

  static get renderer () { return render; }

  static get properties () {
    return {
      lessons: {
        type: Array,
        value: [
          {
            name: '',
            topics: [
              {
                name: '',
                subtopics: [
                  {
                    name: ''
                  }
                ]
              }
            ]
          }
        ]
      }
    };
  }

  template () {
    return html`<style>${style.toString()}</style>${template(html, this)}`;
  }

  _addLesson () {
    this.lessons.push(
      {
        name: '',
        topics: []
      }
    );
    this.requestUpdate();
  }
  _addTopic ({ target: el }) {
    const { value } = el;
    this.lessons[value].topics.push(
      {
        name: '',
        subtopics: []
      }
    );
    this.requestUpdate();
  }
  _addSubtopic ({ target: el }) {
    const { value } = el;
    let temp = value.split(' ');
    this.lessons[temp[0]].topics[temp[1]].subtopics.push(
      {
        name: ''
      }
    );
    this.requestUpdate();
  }
  _inputValueChanged ({ target: el }) {
    // const { name, value } = el;
    let temp = el.name.split(' ');
    if (temp[0] === 'Lesson') {
      this.lessons[temp[1] - 1].name = el.value;
    }
    if (temp[0] === 'Topic') {
      this.lessons[temp[1] - 1].topics[temp[3] - 1].name = el.value;
    }
    if (temp[0] === 'Subtopic') {
      this.lessons[temp[1] - 1].topics[temp[3] - 1].subtopics[temp[5] - 1].name = el.value;
    }
    console.log(this.lessons);
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

  _changeLoc ({ target: el }) {
    console.log(el.value);
    if (el.value === 'Event Editing') {
      console.log('go to event');
      changeLocation('/event-editing', false);
    } else if (el.value === 'Narrative Editing') {
      console.log('go to narrative editing');
      changeLocation('/narrative-editing', false);
    }
  }

  _save () {
    updateState('lessons', this.lessons);
    changeLocation('/narrative-editing', false);
    console.log(window.location.pathname);
  }
}
if (!customElements.get(Component.is)) {
  customElements.define(Component.is, Component);
} else {
  console.warn(`${Component.is} is already defined somewhere. Please check your code.`);
}
