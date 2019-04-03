const template = (html, self) => function () {
  const { lessons, objectClicked, _changeLoc, _backgroundClick, _characterClick, _objectClick } = this;
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
      <button id = "dialogue">Add Dialogue</button>
    </div>
    <div id = "assets">
    </div>
    <div class = "workspace">
      <div class = "scene-selector">
        ${lessons && lessons.length ? lessons.map((lesson, index) => html`
          <div class="lessons" name="${index}">
          </div>
          <p>${index}</p> 
          ${lesson.topics && lesson.topics.length ? lesson.topics.map((topic, index2) => html`
            <div class="topics" name="${index}.${index2}">
            </div>
            <p>${index}.${index2}</p>
            ${topic.subtopics && topic.subtopics.length ? topic.subtopics.map((subtopic, index3) => html`
              <div class="subtopics" name="${index}.${index2}.${index3}">
              </div>
              <p>${index}.${index2}.${index3}</p>
            `) : html``}
          `) : html``}
        `) : html``}
      </div>
      <div id = "scene-canvas"></div>
    </div>
    
  `;
}.bind(self)();

export { template };
