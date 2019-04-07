const template = (html, self) => function () {
  const { lessons, onDragStart, onDragEnd, onDragOver, onDragEnter, onDrop, _pointFrom, _pointTo, _getOffset, _finish, _changeLoc } = this;
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
    </div>
    <div class = "container">
      <div id="control">
        <form>
          <div> 
            <span> FROM: </span>
            <span> <input id="x-coor" value="" @change=${_pointFrom.bind(this)}> </span>
          </div>
          <div> 
            <span> TO: &nbsp; &nbsp; &nbsp; </span>
            <span> <input id="y-coor" value="" @change=${_pointTo.bind(this)}> </span>
          </div>
          <button id="apply" type="reset">Apply</button>
        </form>
        <button id="finish" @click="${_finish.bind(this)}"> Finish </button>
      </div>
      <div id="canvas" @drop="${onDrop.bind(this)}" @dragover="${onDragOver.bind(this)}" @dragenter="${onDragEnter.bind(this)}">
      </div>
      <div id="scene-repo">
        ${lessons && lessons.length ? lessons.map((lesson, index) => html`
          <button id="lessons" name="${index}" draggable="true"  @dragstart="${onDragStart.bind(this)}" @dragend="${onDragEnd.bind(this)}"> ${index} ${lesson.name} </button>
          ${lesson.topics && lesson.topics.length ? lesson.topics.map((topic, index2) => html`
            <button id="topics" name="${index}.${index2}" draggable="true"  @dragstart="${onDragStart.bind(this)}"  @dragend="${onDragEnd.bind(this)}"> ${index}.${index2} ${topic.name} </button>
            ${topic.subtopics && topic.subtopics.length ? topic.subtopics.map((subtopic, index3) => html`
              <button id="subtopics" name="${index}.${index2}.${index3}" draggable="true"  @dragstart="${onDragStart.bind(this)}"  @dragend="${onDragEnd.bind(this)}"> ${index}.${index2}.${index3} ${subtopic.name} </button>
            `) : html``}
          `) : html``}
        `) : html``}
      </div>
    </div>
  `;
}.bind(self)();

export { template };
