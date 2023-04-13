import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../utils/Api.js'

import {
  profileAvatarImg,
  avatarEditButton,
  profileEditButton,
  profileAddButton,
  inputName,
  inputJob,
  validateSettings,
  profileSelectors,
  imagePopupSelectors,
  apiSettings
} from '../utils/variables.js'

let cardList;

const userInfo = new UserInfo(profileSelectors);
const api = new Api(apiSettings);

Promise.all([
  api.getUserInfo(),
  api.getCards()
])
  .then(([userData, cardsData]) => {
    renderInitialCards(cardsData)
    userInfo.setUserInfo(userData)
    console.log(userData)
  })

const handleCardClick = (e) => {
  popupWithImage.open(e);
};

const handleAddFormSubmit = (data) => {
  renderCard(data);
  popupAdd.close();
};

const handleAvatarFormSubmit = ({ avatar }) => {
  profileAvatarImg.src = avatar;
  popupAvatarEdit.close();
}

const handleEditFormSubmit = ({ name, job }) => {
  userInfo.setUserInfo({ name, job });
  popupEdit.close();
};

const renderCard = (data) => {
  const cardElement = new Card(data, '#card-template', handleCardClick).generationCard();
  cardList.addItem(cardElement);
}

const renderInitialCards = (items) => {
  cardList = new Section({
    items: items.reverse(),
    renderer: renderCard
  }, '.gallery__cards')

  cardList.render();
}

const popupWithImage = new PopupWithImage(imagePopupSelectors);
popupWithImage.setEventListeners();

const popupEdit = new PopupWithForm('.popup_type_edit', handleEditFormSubmit);
popupEdit.setEventListeners();

const popupAdd = new PopupWithForm('.popup_type_add', handleAddFormSubmit);
popupAdd.setEventListeners();

const popupAvatarEdit = new PopupWithForm('.popup_type_avatar', handleAvatarFormSubmit);
popupAvatarEdit.setEventListeners();

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

avatarEditButton.addEventListener('click', () => {
  formValidators['form-avatar'].resetValidation();
  popupAvatarEdit.open()
})

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

// document.querySelectorAll('.card__like').forEach(item => {
//   item.addEventListener('click', (e) => {
//     e.target.parentNode.querySelector('.card__like-count').textContent = 1
//   })
// })

