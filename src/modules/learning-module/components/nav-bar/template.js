const template = (html, self) => function () {
  // const { lessons, _addLesson, _addTopic, _inputValueChanged, _downloadObjectAsJson } = this;
  // if (!moduleObj) return html`Loading...`;
  // const { events, baseURL } = moduleObj;
  // console.log(sceneObjects)
  // if (!events) return html`Loading...`;
  return html`
    <div class="navbar">
      <div class="dropdown">
        <button class="filebtn">File 
          <i class="fa fa-caret-down"></i>
        </button>
        <div class="file-content">
          <a href="#">Save</a>
          <a href="#">Open</a>
          <a href="#">New File</a>
        </div>
        <button class="insertbtn">
          <i class="fa fa-caret-down">
          </i>
        </button>
        <div class="insert-content"> 
          <a href="#">Image</a>
          <a href="#"></a>
          <a href="#"></a>
        </div>
        <button class="viewbtn">
          <i class="fa fa-caret-down">
          </i>
        </button>
        <div class="view-content"> 
          <a href="#">Scenes Bar</a>
          <a href="#"></a>
          <a href="#"></a>
        </div>
      </div> 
    </div>
  `;
};

export { template };
