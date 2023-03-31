import Card from './modules/Card.js';
import FormValidator from './modules/FormValidator.js';
import Section from './modules/section.js';
import PopupWithImage from './modules/PopupWithImage.js';
import PopupWithForm from './modules/PopupWithForm.js';
import UserInfo from './modules/UserInfo.js';


import { initialCards } from './initialCards.js';

const popupEdit1 = '.popup_type_edit';
// const popupAdd = document.querySelector('.popup_type_add');
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

const profileSelectors = {
  profileNameSelector: '.profile__name',
  profileJobSelector: '.profile__work'
}

const qwe = {
  popupSelector: '.popup_type_image',
  imageSelector: '.popup__image',
  textSelector: '.popup__location'
}

const handleCardClick = (e) => {
  popupWithImage.open(e);
};

const handleAddFormSubmit = (data) => {
  renderCard(data);
  popupAdd.close();
}

const handleEditFormSubmit = ({ name, job }) => {
  userInfo.setUserInfo({ name, job });
  popupEdit.close();
}

const renderCard = (data) => {
  const card = new Card(data, '#card-template', handleCardClick).generationCard();
  cardList.addItem(card);
}

const cardList = new Section({ items: initialCards, renderer: renderCard }, '.gallery__cards')
cardList.render()

const userInfo = new UserInfo(profileSelectors);

const popupWithImage = new PopupWithImage(qwe)
popupWithImage.setEventListeners();

const popupEdit = new PopupWithForm(popupEdit1, handleEditFormSubmit)
popupEdit.setEventListeners();

const popupAdd = new PopupWithForm('.popup_type_add', handleAddFormSubmit)
popupAdd.setEventListeners();

profileEditButton.addEventListener('click', () => {
  inputName.value = userInfo.getUserInfo().name;
  inputJob.value = userInfo.getUserInfo().job;
  formEditValidator.singleValidation();
  popupEdit.open();
});

profileAddButton.addEventListener('click', () => {
  formAddValidator.singleValidation();
  popupAdd.open();
})

const formEditValidator = new FormValidator(validateSettings, formEdit);
formEditValidator.enableValidation();
const formAddValidator = new FormValidator(validateSettings, formAdd);
formAddValidator.enableValidation();
