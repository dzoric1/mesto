import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirm from '../components/PopupWithConfirm';
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
  apiSettings,
} from '../utils/variables.js'

let cardList;
let userId;
let cards = {};

const userInfo = new UserInfo(profileSelectors);
const api = new Api(apiSettings);

Promise.all([
  api.getUserInfo(),
  api.getCards()
])
  .then(([userData, cardsData]) => {
    userId = userData._id;
    renderInitialCards(cardsData);
    userInfo.setUserInfo(userData);
    profileAvatarImg.src = userData.avatar;
    console.log(cardsData);
    console.log(userData);
  })

const handleCardClick = (src, alt) => {
  popupWithImage.open(src, alt);
};

const handleCardLikeClick = async (cardId, isLiked) => {
  if (isLiked) {
    const res = await api.toggleLike(cardId, 'DELETE');
    return res;
  } else {
    const res = await api.toggleLike(cardId, 'PUT');
    return res;
  }
}

const handleCardDeleteClick = (id) => {
  popupWithConfirm.open(id)
}

const handleAddFormSubmit = (data) => {
  api.addCard(data)
    .then(data => {
      renderCard(data);
      popupAdd.close();
    })
    .finally(() => popupAdd.setSubmitButtonText('Создать'))
};

const handleDeleteSubmit = (id) => {
  api.deleteCard(id)
    .then(() => {
      cards[id].deleteCard();
    })
  popupWithConfirm.close()
}

const handleAvatarFormSubmit = ({ avatar }) => {
  api.updateAvatar({ avatar })
    .then(({ avatar }) => {
      profileAvatarImg.src = avatar;
      popupAvatarEdit.close();
    })
    .finally(() => popupAvatarEdit.setSubmitButtonText('Сохранить'))
}

const handleEditFormSubmit = (data) => {
  api.patchUserInfo(data)
    .then((data) => {
      userInfo.setUserInfo(data);
      popupEdit.close();
    })
    .finally(() => popupEdit.setSubmitButtonText('Сохранить'))
};

const renderCard = (data) => {
  const card = new Card(
    data,
    '#card-template',
    handleCardClick,
    handleCardDeleteClick,
    handleCardLikeClick,
    userId
  );
  cards[data._id] = card;
  const cardElement = card.generationCard();
  cardList.addItem(cardElement);
}

const renderInitialCards = (items) => {
  cardList = new Section({
    items: items.reverse(),
    renderer: renderCard
  }, '.gallery__cards')

  cardList.render();
}

const popupWithConfirm = new PopupWithConfirm('.popup_type_confirm', handleDeleteSubmit);
popupWithConfirm.setEventListeners();

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
  popupAvatarEdit.open();
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
