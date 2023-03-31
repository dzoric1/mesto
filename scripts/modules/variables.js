export const
  formEdit = document.querySelector('.popup__form_type_edit'),
  formAdd = document.querySelector('.popup__form_type_add'),
  profileEditButton = document.querySelector('.profile__edit-button'),
  profileAddButton = document.querySelector('.profile__add-button'),
  inputName = document.querySelector('.popup__form-input_type_name'),
  inputJob = document.querySelector('.popup__form-input_type_job'),
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
  initialCards = [
    {
      location: 'Архыз',
      url: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      location: 'Челябинская область',
      url: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      location: 'Иваново',
      url: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      location: 'Камчатка',
      url: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      location: 'Холмогорский район',
      url: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      location: 'Байкал',
      url: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];