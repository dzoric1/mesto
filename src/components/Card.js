class Card {
  constructor(data, templateSelector, handleCardClick, handleCardDeleteClick) {
    this._title = data.name;
    this._url = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._ownerId = data.owner._id;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDeleteClick = handleCardDeleteClick;
  }

  _getTemplate() {
    return document.querySelector(this._templateSelector)
      .content.querySelector('.card').cloneNode(true);
  }

  _setEventListeners() {
    this._element.querySelector('.card__like').addEventListener('click', e => {
      e.target.classList.toggle('card__like_active');
    });

    this._delete.addEventListener('click', (e) => {
      this._handleCardDeleteClick(e)
    });

    this._cardImage.addEventListener('click', e => {
      this._handleCardClick(e);
    })
  }

  generationCard() {
    this._element = this._getTemplate();
    this._element.setAttribute('id', this._id)
    this._element.querySelector('.card__title').textContent = this._title;
    this._element.querySelector('.card__like-count').textContent = this._likes.length;
    this._delete = this._element.querySelector('.card__delete')
    if (!(this._ownerId == "c480573b2234194e528595b2")) this._delete.classList.add('card__delete_hide')
    this._cardImage = this._element.querySelector('.card__image');
    this._cardImage.setAttribute('src', this._url);
    this._cardImage.setAttribute('alt', this._title);

    this._setEventListeners();

    return this._element;
  }
}

export default Card;