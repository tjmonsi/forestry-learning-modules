const template = (html, self) => function () {
  const { lessons, _changeLoc, _backgroundClick, _characterClick, _objectClick, _addDialogue, _selectorClick, _save, _saveModule, _load, _addAssessment, _assignId } = this;
  // if (!moduleObj) return html`Loading...`;
  // const { events, baseURL } = moduleObj;
  // // console.log(scenehttp://localalhost/Objects)
  // if (!events) return html`Loading...`;
  return html`
    <div class = "navbar">
      <select id="location" @change="${_changeLoc.bind(this)}">
        <option value="Event Editing" id="curr-loc"> Event Editing</option>
        <option value="Forms"> Forms</option>
        <option value="Narrative Editing"> Narrative Editing</option>
      </select>
      <button id = "save" @click="${_save.bind(this)}">Save Toolkit</button>
      <button id = "save" @click="${_saveModule.bind(this)}"> Save Module </button>
      <button id = "backgrounds" @click="${_backgroundClick.bind(this)}">Backgrounds</button>
      <button id = "characters" @click="${_characterClick.bind(this)}">Characters</button>
      <button id = "objects" @click="${_objectClick.bind(this)}">Objects</button>
      <button id = "dialogue" @click="${_addDialogue.bind(this)}">Add Dialogue</button>
      <select id="assessment" @change="${_addAssessment.bind(this)}">
        <option value="Add Assessment" id="assessment-default"> Add Assessment </option>
        <option value="Assessment Forms"> Assessment Forms </option>
        <option value="Assessment Tables"> Assessment Tables </option>
      </select>
    </div>
    <div id = "assets">
    </div>
    <div class = "workspace" id="workspace">
      <div class = "scene-selector" id = "scene-selector" @mouseover="${_assignId.bind(this)}">
        ${lessons && lessons.length ? lessons.map((lesson, index) => html`
          <div class="lessons" @click="${_selectorClick.bind(this)}">
          </div>
          <p>${lesson.name}</p> 
          ${lesson.topics && lesson.topics.length ? lesson.topics.map((topic, index2) => html`
            <div class="topics" @click="${_selectorClick.bind(this)}">
            </div>
            <p>${topic.name}</p>
            ${topic.subtopics && topic.subtopics.length ? topic.subtopics.map((subtopic, index3) => html`
              <div class="subtopics" @click="${_selectorClick.bind(this)}">
              </div>
              <p>${subtopic.name} </p>
            `) : html``}
          `) : html``}
        `) : html``}
      </div>
    </div>
  `;
}.bind(self)();

export { template };
