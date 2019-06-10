const template = (html, self) => function () {
  const { moduleObj, sceneObjects, _click, _dialogue, _form, _hide, onChange, onDragStart, onDragEnd, onDrop, onDragOver, onDragEnter, blink, select, ilo1select } = this;
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
        <div
          id="${item.objectId}"
          @drop="${onDrop.bind(this)}"
          @dragover="${onDragOver.bind(this)}"
          @dragenter="${onDragEnter.bind(this)}"
        >
        <lazy-picture
            id="${item.answer}"
            .cover="${item.meta && item.meta.cover}"
            class="absolute image ${item.meta && item.meta.fullscreen ? 'fullscreen' : ''} ${item.meta && item.meta.classList}"
            style="${styleString}"
            src="${item.src ? baseURL + item.src : ''}">
        </lazy-picture>
        </div>
        ` : ''}

        ${item.type === 'circle' ? html`
          <div class="absolute" id="circle" style="${styleString}">
            <svg
              height="${item.h}"
              width="${item.w}">
                <circle
                  cx="${item.cx}"
                  cy="${item.cy}"
                  r="${item.r}"
                  color="${item.color}"
                  stroke="${item.color}"
                  stroke-width="3"
                  fill="none">
                </circle>
              </svg>
          </div>
        ` : ''}

        ${item.type === 'ellipse' ? html`
          <div class="absolute" id="circle" style="${styleString}">
            <svg
              height="${item.h}"
              width="${item.w}">
                <ellipse
                  cx="${item.cx}"
                  cy="${item.cy}"
                  rx="${item.rx}"
                  ry="${item.ry}"
                  color="${item.color}"
                  stroke="${item.color}"
                  stroke-width="3"
                  fill="none"/>
              </svg>
          </div>
        ` : ''}

        ${item.type === 'block' ? html`
          <div class="block">
            <a href='${window.location.pathname.split('?')[0]}${item.link}'>
              <img src="${item.src ? baseURL + item.src : ''}" style="${styleString}">
              <div class="centered">${item.label}</div>
            </a>
          </div>
        ` : ''}

        ${item.type === 'lens' ? html`
          <div id="${item.objectId}">
            <img
              id="${item.answer}"
              .cover="${item.meta && item.meta.cover}"
              class="absolute image ${item.meta && item.meta.fullscreen ? 'fullscreen' : ''} ${item.meta && item.meta.classList}"
              style="${styleString}"
              @dragstart="${onDragStart.bind(this)}"
              @dragend="${onDragEnd.bind(this)}"
              src="${item.src ? baseURL + item.src : ''}">
          </div>
        ` : ''}

        ${item.type === 'text' ? html`
          <div class="absolute ${item.meta && item.meta.classList}" id="${item.objectId}" style="${styleString}">
            <mark-lite .text="${item.text}"></mark-lite>
          </div>
        ` : ''}

        ${item.type === 'label' ? html`
          <div class="absolute text ${item.meta && item.meta.classList}" id="label" style="${styleString}" value="${item.text}">
            <mark-lite .text="${item.text}"></mark-lite>
          </div>
        ` : ''}

        ${item.type === 'hide' ? html `
          <div class="absolute hide" style="${styleString}">
            <a id="hide" type="button" class="button">
              Hide
            </a>
          </div>
        ` : ''}

        ${item.type === 'menu' ? html `
          <div class="absolute menu" style="${styleString}">
            <a id="menu" type="button" class="button" href="${window.location.pathname.split('?')[0]}?currentEvent=event-${item.event}">
              Main Menu
            </a>
          </div>
        ` : ''}

        ${item.type === 'dialogue' ? html`
          <div class="absolute dialogue" id="${item.objectId}" style="${styleString} height=5%">
            <mark-lite .text="### ${item.character}\n\n${item.text}"></mark-lite>

            ${item.prev ? html`
              <button id="prev" type="button" class="button" @click="${_dialogue.bind(this)}" value="${item.prev}">
                Previous
              </button>
            ` : ''}

            ${item.form === true ? html`
              ${item.next ? html`
                <button id="next" type="button" class="button" @click="${_dialogue.bind(this)}" value="${item.next}" disabled>
                  Continue
                </button>
              ` : ''}
            ` : html`
              ${item.next ? html`
                <button id="next" type="button" class="button" @click="${_dialogue.bind(this)}" value="${item.next}">
                  Continue
                </button>
              ` : ''}
            `}

            ${item.hide ? ''
            : html`
              <button type="button" class="button" @click="${_hide.bind(this)}" value="">
                  Hide
              </button>
            `}

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
                    <td height="20.5">${input.left}</td>
                    ${input.keyword === true ? html`
                      <td><a @click="${blink.bind(this)}" style="color:${input.color}">${input.right}</a></td>
                    ` : html`
                      <td>${input.right}</td>
                    `}
                  </tr>
                `)}
              </tbody>
            </table>
          </div>
        ` : ''}

        ${item.type === 'references' ? html`
          <div class="absolute" id="references" style="${styleString}">
            <ul>
            ${Object.entries(item.references).map(([key, input]) => html`
              <li>${input}</li>
            `)}
            </ul>
          </div>
        ` : ''}

        ${item.type} ${item.objectId}
        ${item.type === 'form' ? html`
          <form class="absolute form overflow ${item.meta && item.meta.classList}" id="${item.objectId}" style="${styleString}" @submit="${_form.bind(this)}" finished="false">
            ${Object.entries(item.form).map(([, formGroup]) => html`
              <div class="form-group">
                <h4 align="center">${formGroup.name}</h4>
                ${Object.entries(formGroup.items).map(([key, input]) => html`
                  <input-container>
                    <label slot="label">
                      ${input.name}
                    </label>
                    ${input.type === 'select' ? html`
                      <select
                        slot="input"
                        id="${key}"
                        .multiple="${input.multiple}"
                        name="${input.name}"
                        answer=${item.answer[key]}
                        @change="${onChange.bind(this)}">
                        ${Object.entries(input.options).map(([value, label]) => html`
                          <option
                            value="${value}"
                            .selected="${item.default && item.default[key] && ((typeof item.default[key] === 'string' && item.default[key] === value) || (typeof item.default[key] === 'object' && item.default[key].indexOf(value) >= 0))}"
                            answer=${item.answer[key]}>${label}</option>
                        `)}
                      </select>
                    ` : ''}
                  </input-container>
                `)}
              </div>
            `)}
            <button id="submit" class="button" disabled>Submit</button>
          </form>
        ` : ''}

        ${item.type === 'discussion' ? html`
          <div class="carousel" id = "container">
            <div class="carousel-inner">
              ${Object.entries(item.items).map(([key,input]) => html`
                <input class="carousel-open" type="radio" id="carousel-${key}" name="carousel" aria-hidden="true" hidden="" checked="checked">
                <div class="carousel-item">
                  <img src="${input.src ? baseURL + input.src : ''}">
                  <div class="carousel-caption">
                    <h3>${input.name}</h3>
                    <i>${input.desc}</i>
                  </div>
                </div>
              `)}

              ${Object.entries(item.items).map(([key, input]) => html`
                <label for="carousel-${input.prev}" class="carousel-control prev control-${key}">‹</label>
                <label for="carousel-${input.next}" class="carousel-control next control-${key}">›</label>
              `)}

              <ol class="carousel-indicators">
              ${Object.entries(item.items).map(([key, input]) => html`
                <li>
                  <label for="carousel-${key}" class="carousel-bullet">•</label>
                </li>
              `)}
              </ol>
            </div>
          </div>
        ` : ''}

        ${item.type === 'choice' ? html`
          <div class="container">
            <div class="identify">
              <img id="identify" src="${item.src ? baseURL + item.src : ''}" data-answer="${item.answer}">
            </div>

            <div class="space"></div>

            <div class="choices">
              <h4>${item.title}</h4>
              <ol type="a">
                ${Object.entries(item.options).map(([key, input]) => html`
                  <li id="choice" data-answer=${input} data-choice="${key}" @click=${select.bind(this)}>${input}</li>
                `)}
              </ol>
            </div>
          </div>
        ` : ''}

        ${item.type === 'choice2' ? html`
          <div class="container2">

            <div class="question">
              <h3>${item.question}</h3>
              <p>${item.species}</p>
            </div>

            <div class="container3">
              <div class="identify">
                <img id="identify" src="${item.src ? baseURL + item.src : ''}" data-answer="${item.answer}">
              </div>

              <div class="space"></div>

              <div class="choices">
                <h3>Multiple options:</h3>
                <ol type="a">
                  ${Object.entries(item.options).map(([key, input]) => html`
                    <li data-answer=${input} data-choice="${key}" @click=${select.bind(this)}>${input}</li>
                  `)}
                </ol>
              </div>
            </div>

          </div>
        ` : ''}

        ${item.type === 'enumerate' ? html`
          <div class="ilo1-container">
            <h4>${item.question}</h4>
            <form class="checkboxes" action="">  
              ${Object.entries(item.options).map(([key, input]) => html`
                <input type="checkbox" name="${key}" value="${key}" data-answer=${item.answers.toString()} data-choice=${key}}>${input}</p>
              `)}
            </form>
          </div>
        ` : ''}

        ${item.type === 'choice3' ? html`
          <div class="ilo1-container">
            <div class="ilo1-choices">  
              <h4>${item.question}</h4>
              ${Object.entries(item.options).map(([key, input]) => html`
                <p data-answer=${item.answer} data-choice=${key} @click=${ilo1select.bind(this)}>${key}) ${input}</p>
              `)}
            </div>
          </div>
        ` : ''}
      `;
  })}
    </section>
  `;
}.bind(self)();

export { template };
