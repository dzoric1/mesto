import Popup from "./Popup";

class PopupWithForm extends Popup {
  constructor({ popupSelector, handleSubmit }) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._inputs = this._popup.querySelectorAll('.popup__form-input');
    this._submitButton = this._popup.querySelector('.popup__submit');
  }

  _getInputValues() {
    const inputValues = {};
    this._inputs.forEach(input => {
      inputValues[input.name] = input.value;
    });

    return inputValues;
  }

  setEventListeners() {
    this._form.addEventListener('submit', () => {
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