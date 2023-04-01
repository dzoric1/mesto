import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

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
} from '../utils/variables.js'

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

const createCard = (data) => {
  const cardElement = new Card(data, '#card-template', handleCardClick).generationCard();
  return cardElement;
}

const renderCard = (data) => {
  cardList.addItem(createCard(data));
}

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
  const { job, name } = userInfo.getUserInfo();
  inputName.value = name;
  inputJob.value = job;
  formValidators['form-edit'].resetValidation();
  popupEdit.open();
});

profileAddButton.addEventListener('click', () => {
  formValidators['form-add'].resetValidation();
  popupAdd.open();
});

const formValidators = {}

const enableValidation = (config) => {
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach(formElement => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name');

    formValidators[formName] = validator;
    validator.enableValidation()
  })
}

enableValidation(validateSettings);

