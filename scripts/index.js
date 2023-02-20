import { initialCards } from './card.js';

const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupImage = document.querySelector('.popup_type_image');
const popups = document.querySelectorAll('.popup');
const popupImageItem = popupImage.querySelector('.popup__image');
const popupImageText = popupImage.querySelector('.popup__location');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const inputName = document.querySelector('.popup__form-input_type_name');
const inputJob = document.querySelector('.popup__form-input_type_job');
const inputLocation = document.querySelector('.popup__form-input_type_location');
const inputUrl = document.querySelector('.popup__form-input_type_url');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__work');
const formEdit = document.querySelector('.popup__form_type_edit');
const formAdd = document.querySelector('.popup__form_type_add');
const cardContainer = document.querySelector('.gallery__cards');
const cardTemplate = document.querySelector('#card-template').content;

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup(popupEdit);
}

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  addCard(generationCard(inputLocation.value, inputUrl.value));
  closePopup(popupAdd);
  evt.target.reset();
}

function setInputsEditForm() {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
}

function openPopup(popup) {
  popup.classList.add('popup_open');
}

function closePopup(popup) {
  popup.classList.remove('popup_open');
}

function generationCard(title, url) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');

  cardElement.querySelector('.card__title').textContent = title;
  cardImage.setAttribute('src', url);
  cardImage.setAttribute('alt', title);
  cardElement.querySelector('.card__like').addEventListener('click', evt => {
    evt.target.classList.toggle('card__like_active');
  });
  cardElement.querySelector('.card__delete').addEventListener('click', () => {
    cardElement.remove();
  });
  cardImage.addEventListener('click', evt => {
    popupImageItem.setAttribute('src', evt.target.getAttribute('src'));
    popupImageItem.setAttribute('alt', evt.target.getAttribute('alt'));
    popupImageText.textContent = cardElement.querySelector('.card__title').textContent;
    openPopup(popupImage);
  });

  return cardElement;
}

function addCard(card) {
  cardContainer.prepend(card);
}

profileEditButton.addEventListener('click', () => {
  setInputsEditForm();
  openPopup(popupEdit);
});

profileAddButton.addEventListener('click', () => openPopup(popupAdd));

popups.forEach(popup => {
  popup.addEventListener('click', evt => {
    if (evt.target.classList.contains('popup_open') || evt.target.classList.contains('popup__close')) {
      closePopup(popup);
    }
  });
});

formEdit.addEventListener('submit', handleEditFormSubmit);
formAdd.addEventListener('submit', handleAddFormSubmit);

initialCards.forEach(card => {
  addCard(generationCard(card.name, card.link));
});