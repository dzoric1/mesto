import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._inputs = this._popup.querySelectorAll('.popup__form-input');
  }

  _getInputValues() {
    const inputValues = {}
    this._inputs.forEach(input => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setEventListeners() {
    this._form.addEventListener('submit', (e) => {
      e.preventDefault();
      this._handleSubmit(this._getInputValues());
    })
    super.setEventListeners();
  }

  close() {
    this._form.reset();
    super.close();
  }
}

export default PopupWithForm;