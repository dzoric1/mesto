import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor({ popupSelector, imageSelector, textSelector }) {
    super(popupSelector);
    this._image = this._popup.querySelector(imageSelector);
    this._text = this._popup.querySelector(textSelector);
  }

  open(src, alt) {
    this._image.setAttribute('src', src);
    this._image.setAttribute('alt', alt);
    this._text.textContent = alt;
    super.open();
  }
}

export default PopupWithImage;