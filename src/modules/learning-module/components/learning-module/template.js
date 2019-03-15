const template = (html, self) => function () {
  const { moduleObj, sceneObjects, _click, _dialogue, _form, _correctAnswer, _drag } = this;
  if (!moduleObj) return html`Loading...`;
  const { events, baseURL } = moduleObj;
  // console.log(sceneObjects)
  if (!events) return html`Loading...`;
  return html`
  <section class="scene" @click="${_click.bind(this)}">
  ${sceneObjects.map(item => {
    const styleString = item.style ? item.style.join(';') : '';
    return html`
        ${item.type === 'image' ? html`
          <lazy-picture
            id="${item.objectId}"
            .cover="${item.meta && item.meta.cover}"
            class="absolute image ${item.meta && item.meta.fullscreen ? 'fullscreen' : ''} ${item.meta && item.meta.classList}"
            style="${styleString}"
            src="${item.src ? baseURL + item.src : ''}"></lazy-picture>
        ` : ''}

        ${item.type === 'lens' ? html`
          <div>
            <img
              id="${item.objectId}"
              .cover="${item.meta && item.meta.cover}"
              class="absolute image ${item.meta && item.meta.fullscreen ? 'fullscreen' : ''} ${item.meta && item.meta.classList}"
              style="${styleString}"
              draggable="true"
              ondragstart="${_drag.bind(this)}"
              src="${item.src ? baseURL + item.src : ''}">
          </div>
        ` : ''}

        ${item.type === 'text' ? html`
          <div class="absolute text" id="${item.objectId}" style="${styleString}">
            <mark-lite .text="${item.text}"></mark-lite>
          </div>
        ` : ''}

        ${item.type === 'dialogue' ? html`
          <div class="absolute dialogue" id="${item.objectId}" style="${styleString}">
            <mark-lite .text="### ${item.character}\n\n${item.text}"></mark-lite>

            ${item.prev ? html`
              <button type="button" class="button" @click="${_dialogue.bind(this)}" value="${item.prev}">
                Previous
              </button>
            ` : ''}
            ${item.next ? html`
              <button type="button" class="button" @click="${_dialogue.bind(this)}" value="${item.next}">
                Continue
              </button>
            ` : ''}
            ${item.menu ? html`
              <button type="button" class="button" @click="${_dialogue.bind(this)}" value="">
                Main Menu
              </button> 
            ` : ''}
          </div>
        ` : ''}

        ${item.type === 'table' ? html`
          <div class="absolute table ${item.meta && item.meta.classList}" id="${item.objectId}" style="${styleString}">
            <table>
              <thead>
                <tr>
                  <th colspan="2">${item.table.name}</th>
                </tr>
              </thead>
              <tbody>
                ${Object.entries(item.table.rows).map(([key, input]) => html`
                  <tr>
                    <td>${input.left}</td>
                    ${input.keyword === true ? html`
                      <td><a href="" style="color:${input.color}">${input.right}</a></td>
                    ` : html`
                      <td>${input.right}</td>
                    `}
                  </tr>
                `)}
              </tbody>
            </table>
          </div>
        ` : ''}

        ${item.type} ${item.objectId}
        ${item.type === 'form' ? html`
          <form class="absolute form overflow ${item.meta && item.meta.classList}" id="${item.objectId}" style="${styleString}" @submit="${_form.bind(this)}">
            ${Object.entries(item.form).map(([, formGroup]) => html`
              <div class="form-group">
                <h4 align="center">${formGroup.name}</h4>
                ${Object.entries(formGroup.items).map(([key, input]) => html`
                  <input-container>
                    <label slot="label">
                      ${input.name}
                    </label>
                    ${input.name === 'Grain' ? html`
                      ${input.type === 'select' ? html`
                        <select slot="input" id="${key}" name="${key}" .multiple="${input.multiple}" onchange="${_correctAnswer.bind(this)}" disabled>
                          ${Object.entries(input.options).map(([value, label]) => html`
                            <option value="${value}" .selected="${item.default && item.default[key] && ((typeof item.default[key] === 'string' && item.default[key] === value) || (typeof item.default[key] === 'object' && item.default[key].indexOf(value) >= 0))}" answer=${item.answer[key]}>${label}</option>
                          `)}
                        </select>
                      ` : ''}
                    ` : html`
                      ${input.type === 'select' ? html`
                      <select slot="input" id="${key}" name="${key}" .multiple="${input.multiple}" onchange="${_correctAnswer.bind(this)}">
                        ${Object.entries(input.options).map(([value, label]) => html`
                          <option value="${value}" .selected="${item.default && item.default[key] && ((typeof item.default[key] === 'string' && item.default[key] === value) || (typeof item.default[key] === 'object' && item.default[key].indexOf(value) >= 0))}" answer=${item.answer[key]}>${label}</option>
                        `)}
                      </select>
                      ` : ''}
                    `}
                  </input-container>
                `)}
              </div>
            `)}
            <button class="button">Submit</button>
          </form>
        ` : ''}
      `;
  })}
    </section>
  `;
}.bind(self)();

export { template };
