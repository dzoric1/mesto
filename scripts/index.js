import Card from './modules/Card.js';
import FormValidator from './modules/FormValidator.js';
import Section from './modules/Section.js';
import PopupWithImage from './modules/PopupWithImage.js';
import PopupWithForm from './modules/PopupWithForm.js';
import UserInfo from './modules/UserInfo.js';

import {
  formEdit,
  formAdd,
  profileEditButton,
  profileAddButton,
  inputName,
  inputJob,
  validateSettings,
  profileSelectors,
  imagePopupSelectors,
  initialCards
} from './modules/variables.js'

const handleCardClick = (e) => {
  popupWithImage.open(e);
};

const handleAddFormSubmit = (data) => {
  renderCard(data);
  popupAdd.close();
};

const handleEditFormSubmit = ({ name, job }) => {
  userInfo.setUserInfo({ name, job });
  popupEdit.close();
};

const renderCard = (data) => {
  const card = new Card(data, '#card-template', handleCardClick).generationCard();
  cardList.addItem(card);
};

const cardList = new Section({ items: initialCards, renderer: renderCard }, '.gallery__cards')
cardList.render();

const userInfo = new UserInfo(profileSelectors);

const popupWithImage = new PopupWithImage(imagePopupSelectors);
popupWithImage.setEventListeners();

const popupEdit = new PopupWithForm('.popup_type_edit', handleEditFormSubmit);
popupEdit.setEventListeners();

const popupAdd = new PopupWithForm('.popup_type_add', handleAddFormSubmit);
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
});

const formEditValidator = new FormValidator(validateSettings, formEdit);
formEditValidator.enableValidation();
const formAddValidator = new FormValidator(validateSettings, formAdd);
formAddValidator.enableValidation();
