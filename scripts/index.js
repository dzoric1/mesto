import { initialCards } from './initialCards.js';
import Card from './modules/Card.js';
import FormValidator from './modules/FormValidator.js';

const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
export const popupImage = document.querySelector('.popup_type_image');
const popups = document.querySelectorAll('.popup');
export const popupImageItem = popupImage.querySelector('.popup__image');
export const popupImageText = popupImage.querySelector('.popup__location');
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

const validateSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_type_disabled',
  inputErrorClass: 'popup__form-input_type_error',
};

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopup(popupEdit);
}

function handleAddFormSubmit(evt) {
  evt.preventDefault();

  const data = {
    name: inputLocation.value,
    link: inputUrl.value
  };

  addCard(createCard(data));
  closePopup(popupAdd);
  evt.target.reset();
  formAddValidator.singleValidation();
}

function setInputsEditForm() {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
}

export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeEscPopup);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeEscPopup);
}

function closeEscPopup(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}

function createCard(data) {
  const card = new Card(data, '#card-template');
  return card.generationCard();
}

function addCard(card) {
  cardContainer.prepend(card);
}

profileEditButton.addEventListener('click', () => {
  setInputsEditForm();
  formEditValidator.singleValidation();
  openPopup(popupEdit);
});

profileAddButton.addEventListener('click', () => openPopup(popupAdd));

popups.forEach(popup => {
  popup.addEventListener('click', evt => {
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close')) {
      closePopup(popup);
    }
  });
});

formEdit.addEventListener('submit', handleEditFormSubmit);
formAdd.addEventListener('submit', handleAddFormSubmit);

initialCards.forEach(data => {
  addCard(createCard(data));
});

const formEditValidator = new FormValidator(validateSettings, formEdit);
formEditValidator.enableValidation();
const formAddValidator = new FormValidator(validateSettings, formAdd);
formAddValidator.enableValidation();
