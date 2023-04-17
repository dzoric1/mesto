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
  })
  .catch(err => console.warn(err))

const handleCardClick = (src, alt) => {
  popupWithImage.open(src, alt);
};

const handleCardLikeClick = (card, isLiked) => {
  if (isLiked) {
    api.toggleLike(card._id, 'DELETE')
      .then(res => {
        card.toggleLike();
        card.setLikes(res.likes.length);
      })
      .catch(err => console.warn(err))
  } else {
    api.toggleLike(card._id, 'PUT')
      .then(res => {
        card.toggleLike();
        card.setLikes(res.likes.length);
      })
      .catch(err => console.warn(err))
  }
}

const handleCardDeleteClick = (card) => {
  popupWithConfirm.open(card)
}

const handleAddFormSubmit = (data) => {
  api.addCard(data)
    .then(data => {
      renderCard(data);
      popupAdd.close();
    })
    .catch(err => console.warn(err))
    .finally(() => popupAdd.setSubmitButtonText('Создать'))
};

const handleDeleteSubmit = (card) => {
  api.deleteCard(card._id)
    .then(() => {
      card.deleteCard();
      popupWithConfirm.close()
    })
    .catch(err => console.warn(err))

}

const handleAvatarFormSubmit = ({ avatar }) => {
  api.updateAvatar({ avatar })
    .then(({ avatar }) => {
      profileAvatarImg.src = avatar;
      popupAvatarEdit.close();
    })
    .catch(err => console.warn(err))
    .finally(() => popupAvatarEdit.setSubmitButtonText('Сохранить'))
}

const handleEditFormSubmit = (data) => {
  api.patchUserInfo(data)
    .then((data) => {
      userInfo.setUserInfo(data);
      popupEdit.close();
    })
    .catch(err => console.warn(err))
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
