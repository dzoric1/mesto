class Card {
  constructor(
    data,
    templateSelector,
    handleCardClick,
    handleCardDeleteClick,
    handleCardLikeClick,
    userId) {

    this._title = data.name;
    this._url = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._ownerId = data.owner._id;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDeleteClick = handleCardDeleteClick;
    this._handleCardLikeClick = handleCardLikeClick;
    this._userId = userId;
  }

  _getTemplate() {
    return document.querySelector(this._templateSelector)
      .content.querySelector('.card').cloneNode(true);
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', e => {
      e.target.classList.toggle('card__like_active');
      if (e.target.classList.contains('card__like_active')) {
        this._likeCounter.textContent++
      } else {
        this._likeCounter.textContent === '1' ? this._likeCounter.textContent = '' : this._likeCounter.textContent--
      }
      this._handleCardLikeClick(e)
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
    this._likeCounter = this._element.querySelector('.card__like-count');
    this._likeButton = this._element.querySelector('.card__like');
    if (this._likes.some(like => like._id === this._userId)) {
      this._likeButton.classList.add('card__like_active')
    }
    this._likeCounter.textContent = this._likes.length ? this._likes.length : '';
    this._delete = this._element.querySelector('.card__delete')
    if (!(this._ownerId === this._userId)) this._delete.classList.add('card__delete_hide')
    this._cardImage = this._element.querySelector('.card__image');
    this._cardImage.setAttribute('src', this._url);
    this._cardImage.setAttribute('alt', this._title);

    this._setEventListeners();

    return this._element;
  }
}

export default Card;