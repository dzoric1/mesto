const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupImage = document.querySelector('.popup_type_image');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const profileCloseButtons = document.querySelectorAll('.popup__close');
const inputName = document.querySelector('.popup__form-input_type_name');
const inputJob = document.querySelector('.popup__form-input_type_job');
const inputLocation = document.querySelector('.popup__form-input_type_location');
const inputUrl = document.querySelector('.popup__form-input_type_url');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__work');
const formEdit = document.querySelector('.popup__form_type_edit');
const formAdd = document.querySelector('.popup__form_type_add');
const cardContainer = document.querySelector('.gallery__cards');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  popupEdit.classList.remove('popup_open');
}

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  addCard(inputLocation.value, inputUrl.value);
  popupAdd.classList.remove('popup_open');
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

function addCard(title, url) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__title').textContent = title;
  cardElement.querySelector('.card__image').setAttribute('src', url);
  cardElement.querySelector('.card__image').setAttribute('alt', title);
  cardElement.querySelector('.card__like').addEventListener('click', evt => {
    evt.target.classList.toggle('card__like_active');
  });
  cardElement.querySelector('.card__delete').addEventListener('click', evt => {
    evt.target.parentNode.remove();
  });

  cardContainer.prepend(cardElement);
}

profileEditButton.addEventListener('click', () => openPopup(popupEdit));
profileAddButton.addEventListener('click', () => openPopup(popupAdd));

profileCloseButtons.forEach(btn => {
  btn.addEventListener('click', e => {
    closePopup(e.target.closest('.popup'));
  });
});

formEdit.addEventListener('submit', handleEditFormSubmit);
formAdd.addEventListener('submit', handleAddFormSubmit);

cardContainer.addEventListener('click', evt => {
  if (evt.target.classList.contains('card__image')) {
    popupImage.querySelector('.popup__image').setAttribute('src', evt.target.getAttribute('src'));
    const card = evt.target.closest('.card');
    popupImage.querySelector('.popup__location').textContent = card.querySelector('.card__title').textContent;
    openPopup(popupImage);
  }
});

initialCards.forEach(card => {
  addCard(card.name, card.link);
});

setInputsEditForm();