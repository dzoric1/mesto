import Popup from "./Popup.js";

class PopupWithConfirm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit
    this._form = this._popup.querySelector('.popup__form');
    this._submitButton = this._popup.querySelectorAll('.popup__submit');
  }

  static id = null

  open(id) {
    this.id = id
    console.log(this.id)
    super.open()
  }

  setEventListeners() {
    this._form.addEventListener('submit', (e) => {
      e.preventDefault();
      this._handleSubmit(this.id);
    })
    super.setEventListeners();
  }

}

export default PopupWithConfirm;