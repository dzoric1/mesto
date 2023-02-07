const popup = document.querySelector('.popup');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileCloseButton = document.querySelector('.popup__close');
const inputName = document.querySelector('.popup__form-input_type_name');
const inputJob = document.querySelector('.popup__form-input_type_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__work');
const formElement = document.querySelector('.popup__form');
const cardContainer = document.querySelector('.gallery__cards');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  popup.classList.remove('popup_open');
}

function openPopup() {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  popup.classList.add('popup_open');
}

function closePopup() {
  popup.classList.remove('popup_open');
}

profileEditButton.addEventListener('click', openPopup);
profileCloseButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', handleFormSubmit);


function likeCard() {

}

function deleteCard() {

}

function addCard(title, url) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__title').textContent = title;
  cardElement.querySelector('.card__image').setAttribute('src', url);
  cardElement.querySelector('.card__image').setAttribute('alt', title);
  cardElement.querySelector('.card__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__like_active');
  });
  cardElement.querySelector('.card__delete').addEventListener('click', function (evt) {
    evt.target.parentNode.remove();
  });

  cardContainer.append(cardElement);
}

initialCards.forEach(card => {
  addCard(card.name, card.link);
});