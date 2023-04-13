export const
  formEdit = document.querySelector('.popup__form_type_edit'),
  formAdd = document.querySelector('.popup__form_type_add'),
  profileEditButton = document.querySelector('.profile__edit-button'),
  profileAddButton = document.querySelector('.profile__add-button'),
  inputName = document.querySelector('.popup__form-input_type_name'),
  inputJob = document.querySelector('.popup__form-input_type_job'),
  profileAvatarImg = document.querySelector('.profile__avatar'),
  avatarEditButton = document.querySelector('.profile__avatar-wrapper'),
  validateSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__form-input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_type_disabled',
    inputErrorClass: 'popup__form-input_type_error',
  },
  profileSelectors = {
    profileNameSelector: '.profile__name',
    profileJobSelector: '.profile__work'
  },
  imagePopupSelectors = {
    popupSelector: '.popup_type_image',
    imageSelector: '.popup__image',
    textSelector: '.popup__location'
  },
  apiSettings = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-64',
    headers: {
      authorization: '20215c55-16b8-4e5b-8b47-0ed8b95a6c7d',
      'Content-Type': 'application/json'
    }
  }