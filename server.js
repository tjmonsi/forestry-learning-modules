const express = require('express');
const app = express();
// const capture = require('./capture');
app.get('/', function (req, res) {
  const puppeteer = require('puppeteer');
  // const capturedData = new Promise((resolve, reject) => {
  //   capture
  //     .captureCanvas()
  //     .then(data => {
  //       resolve(data);
  //     });
  // });
  (async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    // Adjustments particular to this page to ensure we hit desktop breakpoint.
    page.setViewport({ width: 1000, height: 600, deviceScaleFactor: 1 });

    await page.goto('http://localhost:8080/event-editing', { waitUntil: 'networkidle2' });
    /**
     * Takes a screenshot of a DOM element on the page, with optional padding.
     *
     * @param {!{path:string, selector:string, padding:(number|undefined)}=} opts
     * @return {!Promise<!Buffer>}
     */
    async function screenshotDOMElement (opts = {}) {
      const padding = 'padding' in opts ? opts.padding : 0;
      const path = 'path' in opts ? opts.path : null;
      const selector = opts.selector;

      if (!selector) {
        throw Error('Please provide a selector.');
      }

      const rect = await page.evaluate(selector => {
        const element = document.querySelector('body > main > core-lite').shadowRoot.querySelector('template-viewer-lite > template-container-lite > page-event-editing').shadowRoot.querySelector('event-editing').shadowRoot.querySelector(selector);
        if (!element) {
          return null;
        }
        const { x, y, width, height } = element.getBoundingClientRect();
        return { left: x, top: y, width, height, id: element.id };
      }, selector);

      if (!rect) {
        throw Error(`Could not find element that matches selector: ${selector}.`);
      }
      return page.screenshot({
        path,
        clip: {
          x: rect.left - padding,
          y: rect.top - padding,
          width: rect.width + padding * 2,
          height: rect.height + padding * 2
        }
      });
    }

    await screenshotDOMElement({
      path: 'element.png',
      selector: '#canvasscene0',
      padding: 16
    });

    browser.close();
  })();
});

app.listen(8081, function () {
  console.log('sever starting at 8081');
});
