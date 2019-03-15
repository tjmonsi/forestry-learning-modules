const template = (html, self) => function () {
  const { moduleObj, sceneObjects, _click, _dialogue, _form } = this;
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
                Next
              </button>
            ` : ''}
          </div>
        ` : ''}
        ${item.type === 'form' ? html`
          <form class="absolute form overflow ${item.meta && item.meta.classList}" id="${item.objectId}" style="${styleString}" @submit="${_form.bind(this)}">
            <input type="hidden" name="answer" value="${item.answer}">
            <input type="hidden" name="correct" value="${item.correct}">
            <input type="hidden" name="wrong" value="${item.wrong}">
            ${Object.entries(item.form).map(([, formGroup]) => html`
              <div class="form-group">
                <h4>${formGroup.name}</h4>
                ${Object.entries(formGroup.items).map(([key, input]) => html`
                  <input-container>
                    <label slot="label">
                      ${input.name}
                    </label>
                    ${input.type === 'select' ? html`
                      <select slot="input" name="${key}">
                        ${Object.entries(input.options).map(([value, label]) => html`
                          <option value="${value}" .selected="${item.default && item.default[key] && ((typeof item.default[key] === 'string' && item.default[key] === value) || (typeof item.default[key] === 'object' && item.default[key].indexOf(value) >= 0))}">${label}</option>
                        `)}
                      </select>
                    ` : ''}
                    ${input.type === 'checkbox' ? html`
                      ${Object.entries(input.options).map(([value, label]) => html`
                        <label slot="input"><input type="checkbox" .checked="${item.default && item.default[key] && ((typeof item.default[key] === 'string' && item.default[key] === value) || (typeof item.default[key] === 'object' && item.default[key].indexOf(value) >= 0))}">${label}</label>
                      `)}
                    ` : ''}
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
