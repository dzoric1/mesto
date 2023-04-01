import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor({ popupSelector, imageSelector, textSelector }) {
    super(popupSelector);
    this._image = this._popup.querySelector(imageSelector);
    this._text = this._popup.querySelector(textSelector);
  }

  open(e) {
    this._image.setAttribute('src', e.target.src);
    this._image.setAttribute('alt', e.target.alt);
    this._text.textContent = e.target.alt;
    super.open();
  }
}

export default PopupWithImage;