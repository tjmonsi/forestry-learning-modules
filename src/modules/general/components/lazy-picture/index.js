import { TemplateLite } from '@tjmonsi/element-lite/mixins/template-lite.js';
import { template } from './template.js';
import style from './style.styl';
const { HTMLElement, customElements, Event } = window;

class Component extends TemplateLite(HTMLElement) {
  static get is () { return 'lazy-picture'; }

  static get observedAttributes () {
    return ['thumbnail', 'src', 'srcset', 'alt', 'cover', 'active'];
  }

  constructor () {
    super();
    this._boundImageLoaded = this._imageLoaded.bind(this);
    this._boundActivateImage = this._activateImage.bind(this);
    this._thumbnailElement = document.createElement('img');
    this._src = '';
    this._imageElement = document.createElement('img');
    this._thumbnailElement.classList.add('lazy-picture-thumbnail');
    this._imageElement.classList.add('lazy-picture-image');
    this._imageElement.addEventListener('load', this._boundImageLoaded);
  }

  connectedCallback () {
    if (super.connectedCallback) super.connectedCallback();
    const options = {
      threshold: [0.25, 0.75]
    };
    setTimeout(() => {
      try {
        this._observer = new window.IntersectionObserver(this._boundActivateImage, options);
        this._observer.observe(this);

        const sources = this.querySelectorAll('source');
        const picture = this.shadowRoot.querySelector('picture');
        for (let i = 0; i < sources.length; i++) {
          const source = sources[i];
          picture.appendChild(source.cloneNode(true));
        }
      } catch (error) {
        this.active = true;
        console.error(error);
        if (window.Raven) {
          window.Raven.captureException(error);
        }
      }
    });
  }

  disconnectedCallback () {
    if (this._observer && 'disconnect' in this._observer) this._observer.disconnect();
  }

  template () {
    return `<style>${style.toString()}</style>${template()}`;
  }

  set active (active) {
    this._active = typeof active === 'boolean' ? active : (active !== null && active !== undefined);
    if (this._src || this._srcset) this.loadImage();
    if (this._active) {
      this.setAttribute('active', '');
    } else {
      this.removeAttribute('active');
    }
  }

  get active () {
    return this._active;
  }

  set cover (cover) {
    this._cover = typeof cover === 'boolean' ? cover : (cover !== null && cover !== undefined);
    if (this._cover) {
      this.setAttribute('cover', '');
      this._thumbnailElement.setAttribute('cover', '');
      this._imageElement.setAttribute('cover', '');
    } else {
      this.removeAttribute('cover');
      this._thumbnailElement.removeAttribute('cover');
      this._imageElement.removeAttribute('cover');
    }
  }

  get cover () {
    return this._cover || false;
  }

  set src (src) {
    this._src = src;
    if (this._src) this.loadImage();
  }

  get src () {
    return this._src || '';
  }

  set alt (alt) {
    this._alt = alt;
    this._thumbnailElement.alt = alt;
    this._imageElement.alt = alt;
  }

  get alt () {
    return this._alt || '';
  }

  set srcset (srcset) {
    this._srcset = srcset;
    if (this._srcset) this.loadImage();
  }

  get srcset () {
    return this._srcset || '';
  }

  set sizes (sizes) {
    this._sizes = sizes;
    this._imageElement.sizes = sizes;
  }

  get sizes () {
    return this._sizes || '';
  }

  attributeChangedCallback (attr, oldValue, newValue) {
    if (oldValue !== newValue) this[attr] = newValue;
  }

  loadImage () {
    if (this.shadowRoot) {
      const picture = this.shadowRoot.querySelector('picture');
      if (this._active) {
        if (this.thumbnail && !this.shadowRoot.contains(this._thumbnailElement)) {
          this.shadowRoot.insertBefore(this._thumbnailElement, picture);
        }
        setTimeout(() => {
          if (this.thumbnail) this._thumbnailElement.src = this.thumbnail;
          if (this._src) this._imageElement.src = this._src;
          if (this._srcset) this._imageElement.srcset = this._srcset;
          if (picture && !picture.contains(this._imageElement)) setTimeout(() => { picture.appendChild(this._imageElement); });
        });
      }
    }
  }

  _imageLoaded () {
    const event = new Event('load');
    event.detail = { originalTarget: this._img };
    this._thumbnailElement.classList.add('lazy-picture-image-loaded');
    this._imageElement.classList.add('lazy-picture-image-loaded');
    this.dispatchEvent(event);
  }

  _activateImage (entries) {
    this.active = entries[0].intersectionRatio > 0.25;
  }
}

if (!customElements.get(Component.is)) {
  customElements.define(Component.is, Component);
} else {
  console.warn(`${Component.is} is already defined somewhere. Please check your code.`);
}
