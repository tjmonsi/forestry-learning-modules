const template = (html, self) => function () {
  const { lessons, _pointFrom, _pointTo, _finish, _changeLoc, _addToCanvas, _save } = this;
  // if (!moduleObj) return html`Loading...`;
  // const { events, baseURL } = moduleObj;
  // // console.log(scenehttp://localalhost/Objects)
  // if (!events) return html`Loading...`;
  return html`
    <div class = "navbar">
      <select id="location" @change="${_changeLoc.bind(this)}">
        <option value="Narrative Editing" id="curr-loc"> Narrative Editing</option>
        <option value="Forms"> Forms</option>
        <option value="Event Editing"> Event Editing</option>
      </select>
      <button @click="${_save.bind(this)}" id = "save"> Save </button>
    </div>
    <div class = "container">
      <div id="control">
        <form autocomplete="off">
          <div> 
            <span> FROM: </span>
            <span> <input id="x-coor" value="" @change=${_pointFrom.bind(this)} placeholder="0"> </span>
          </div>
          <div> 
            <span> TO: &nbsp; &nbsp; &nbsp; </span>
            <span> <input id="y-coor" value="" @change=${_pointTo.bind(this)} placeholder="0.0"> </span>
          </div>
          <button id="apply" type="reset" @click=${_addToCanvas.bind(this)}>Apply</button>
        </form>
        <button id="finish" @click="${_finish.bind(this)}"> Continue </button>
      </div>
      <div id="canvas">
      </div>
      <div id="scene-repo">
        ${lessons && lessons.length ? lessons.map((lesson, index) => html`
          <button id="a${index}" name="${index}"> ${index} ${lesson.name} </button>
          ${lesson.topics && lesson.topics.length ? lesson.topics.map((topic, index2) => html`
            <button id="a${index}${index2}" name="${index}.${index2}" > ${index}.${index2} ${topic.name} </button>
            ${topic.subtopics && topic.subtopics.length ? topic.subtopics.map((subtopic, index3) => html`
              <button id="a${index}${index2}${index3}" name="${index}.${index2}.${index3}" > ${index}.${index2}.${index3} ${subtopic.name} </button>
            `) : html``}
          `) : html``}
        `) : html``}
      </div>
    </div>
  `;
}.bind(self)();

export { template };
