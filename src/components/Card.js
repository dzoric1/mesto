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
    this._likeButton.addEventListener('click', () => {
      this._handleCardLikeClick(this, this._isLikeActive());
    });

    this._deleteButton.addEventListener('click', () => {
      this._handleCardDeleteClick(this);
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._url, this._title);
    })
  }

  generationCard() {
    this._element = this._getTemplate();
    this._element.querySelector('.card__title').textContent = this._title;
    this._cardImage = this._element.querySelector('.card__image');
    this._cardImage.setAttribute('src', this._url);
    this._cardImage.setAttribute('alt', this._title);
    this._likeButton = this._element.querySelector('.card__like');
    this._likeCounter = this._element.querySelector('.card__like-count');
    this._deleteButton = this._element.querySelector('.card__delete');
    this.setLikes(this._likes.length);
    this._isLiked();
    this._isHideDeleteButton();
    this._setEventListeners();

    return this._element;
  }

  toggleLike() {
    this._likeButton.classList.toggle('card__like_active');
  }

  setLikes(count) {
    this._likeCounter.textContent = count ? count : '';
  }

  _isLikeActive() {
    return this._likeButton.classList.contains('card__like_active');
  }

  _isLiked() {
    if (this._likes.some(like => like._id === this._userId)) {
      this._likeButton.classList.add('card__like_active');
    }
  }

  _isHideDeleteButton() {
    if (!(this._ownerId === this._userId)) {
      this._deleteButton.classList.add('card__delete_hide');
    }
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }
}

export default Card;