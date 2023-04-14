import Popup from "./Popup.js";

class PopupWithConfirm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit
    this._form = this._popup.querySelector('.popup__form');
    this._submitButton = this._popup.querySelectorAll('[type="submit"]');
  }

  id = null;

  open(id) {
    this._submitButton.textContent = 'Сохранить';
    this.id = id
    super.open()
  }

  setEventListeners() {
    this._form.addEventListener('submit', (e) => {
      e.preventDefault();
      this._submitButton.textContent = 'Сохранение...';
      this._handleSubmit(this.id);
    })
    super.setEventListeners();
  }

}

export default PopupWithConfirm;