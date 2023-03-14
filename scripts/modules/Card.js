import {
  popupImage,
  popupImageItem,
  popupImageText,
  openPopup
} from "../index.js";

class Card {
  constructor(data, templateSelector) {
    this._title = data.name;
    this._url = data.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    return document.querySelector(this._templateSelector)
      .content.querySelector('.card').cloneNode(true);
  }

  generationCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.card__title').textContent = this._title;
    this._cardImage = this._element.querySelector('.card__image');
    this._cardImage.setAttribute('src', this._url);
    this._cardImage.setAttribute('alt', this._title);

    this._element.querySelector('.card__like').addEventListener('click', evt => {
      evt.target.classList.toggle('card__like_active');
    });

    this._element.querySelector('.card__delete').addEventListener('click', () => {
      this._element.remove();
    });

    this._cardImage.addEventListener('click', evt => {
      popupImageItem.setAttribute('src', this._url);
      popupImageItem.setAttribute('alt', this._title);
      popupImageText.textContent = this._title;
      openPopup(popupImage);
    });

    return this._element;
  }
}

export default Card;