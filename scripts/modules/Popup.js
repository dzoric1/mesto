class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._closeEscPopup);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._closeEscPopup);
  }

  _closeEscPopup(e) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', e => {
      if (e.target.classList.contains('popup_opened') || e.target.classList.contains('popup__close')) {
        this.close();
      }
    });
  }
}

export default Popup;