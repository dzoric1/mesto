const popup = document.querySelector('.popup');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileCloseButton = document.querySelector('.popup__close');
const inputName = document.querySelector('.popup__form-input_type_name');
const inputJob = document.querySelector('.popup__form-input_type_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__work');
const formElement = document.querySelector('.popup__form');

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  popup.classList.remove('popup_open');
}

profileEditButton.addEventListener('click', function () {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  popup.classList.add('popup_open');
});

profileCloseButton.addEventListener('click', function () {
  popup.classList.remove('popup_open')
});

formElement.addEventListener('submit', handleFormSubmit);

