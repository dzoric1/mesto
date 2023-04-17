import Popup from "./Popup.js";

class PopupWithConfirm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit
    this._form = this._popup.querySelector('.popup__form');
    this._submitButton = this._popup.querySelector('[type="submit"]');
  }

  open(card) {
    this._card = card
    super.open()
  }

  setEventListeners() {
    this._form.addEventListener('submit', (e) => {
      e.preventDefault();
      this._submitButton.textContent = 'Удаление...';
      this._handleSubmit(this._card);
    })
    super.setEventListeners();
  }

}

export default PopupWithConfirm;