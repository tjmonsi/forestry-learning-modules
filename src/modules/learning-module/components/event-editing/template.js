const template = (html, self) => function () {
  const { lessons, _changeLoc, _backgroundClick, _characterClick, _objectClick, _addDialogue, _selectorClick } = this;
  // if (!moduleObj) return html`Loading...`;
  // const { events, baseURL } = moduleObj;
  // // console.log(scenehttp://localalhost/Objects)
  // if (!events) return html`Loading...`;
  return html`
    <div class = "navbar">
      <select id="location" @change="${_changeLoc.bind(this)}">
        <option value="Event Editing" id="curr-loc"> Event Editing</option>
        <option value="Forms"> Forms</option>
      <button id = "save">Save</button>
        <option value="Narrative Editing"> Narrative Editing</option>
      </select>
      <button id = "save">Save</button>
      <button id = "load">Load</button>    
      <button id = "backgrounds" @click=${_backgroundClick.bind(this)}>Backgrounds</button>
      <button id = "characters" @click=${_characterClick.bind(this)}>Characters</button>
      <button id = "objects" @click=${_objectClick.bind(this)}>Objects</button>
      <button id = "dialogue" @click=${_addDialogue.bind(this)}>Add Dialogue</button>
    </div>
    <div id = "assets">
    </div>
    <div class = "workspace" id="workspace">
      <div class = "scene-selector">
        ${lessons && lessons.length ? lessons.map((lesson, index) => html`
          <div class="lessons" id="scene${index}" @click="${_selectorClick.bind(this)}">
          </div>
          <p>${index}</p> 
          ${lesson.topics && lesson.topics.length ? lesson.topics.map((topic, index2) => html`
            <div class="topics" id="scene${index}${index2}" @click="${_selectorClick.bind(this)}">
            </div>
            <p>${index}.${index2}</p>
            ${topic.subtopics && topic.subtopics.length ? topic.subtopics.map((subtopic, index3) => html`
              <div class="subtopics" id="scene${index}${index2}${index3}" @click="${_selectorClick.bind(this)}">
              </div>
              <p>${index}.${index2}.${index3}</p>
            `) : html``}
          `) : html``}
        `) : html``}
      </div>
      <!-- <div id = "scene-canvas"></div> -->
    </div>
    
  `;
}.bind(self)();

export { template };
