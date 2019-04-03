const template = (html, self) => function () {
  const { lessons, _addLesson, _addTopic, _addSubtopic, _inputValueChanged, _downloadObjectAsJson, _save, _changeLoc } = this;
  // if (!moduleObj) return html`Loading...`;
  // const { events, baseURL } = moduleObj;
  // console.log(sceneObjects)
  // if (!events) return html`Loading...`;
  return html`
    <div class = "navbar">
      <select id="location" @change="${_changeLoc.bind(this)}">
        <option value="Forms" id="curr-loc"> Forms </option>
        <option value="Event Editing"> Event Editing </option>
        <option value="Narrative Editing"> Narrative Editing </option>
        
      </select>
    </div>
    ${lessons && lessons.length ? lessons.map((lesson, index) => html` <!-- lesson -->
      <div class="lessons-group"> 
        <input class="lesson-name" type="text" placeholder="Lesson ${index + 1}" name="Lesson ${index + 1}" value=${lesson.name} @change=${_inputValueChanged.bind(this)}> 
        <div class="topics-group"> <!-- topics of lesson -->
        ${lesson.topics && lesson.topics.length ? lesson.topics.map((topic, index2) => html`
            <input class="topic-name" type="text" placeholder="Topic ${index + 1} - ${index2 + 1}" name="Topic ${index + 1} - ${index2 + 1}" value=${topic.name} @change=${_inputValueChanged.bind(this)}>
            <div class="subtopics-group">
              ${topic.subtopics && topic.subtopics.length ? topic.subtopics.map((subtopic, index3) => html`
                <input class="subtopic-name" type="text" placeholder="Subtopic ${index + 1} - ${index2 + 1} - ${index3 + 1}" name="Subtopic ${index + 1} - ${index2 + 1} - ${index3 + 1}" value=${subtopic.name} @change=${_inputValueChanged.bind(this)}>
              `) : html``}
            <button class="subtopic-button" @click="${_addSubtopic.bind(this)}" value="${index} ${index2}"> Add Subtopic </button>
            </div>
          `) : html``}
        </div>
        <button class="topic-button" @click="${_addTopic.bind(this)}" value="${index}"> Add Topic </button>
      </div>
    `) : html``}
    <button class="lesson-button" @click="${_addLesson.bind(this)}"> Add Lesson </button>
    <div class="button-group">
      <button class="save" type="submit" @click="${_save.bind(this)}"> <span> Save </span> </button>
    </div>
  `;
}.bind(self)();

export { template };
