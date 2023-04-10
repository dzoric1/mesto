class Api {
  constructor(options) {
    // тело конструктора
  }

  getInitialCards() {
    // ...
  }

  // другие методы работы с API
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-64',
  headers: {
    authorization: '20215c55-16b8-4e5b-8b47-0ed8b95a6c7d',
    'Content-Type': 'application/json'
  }
}); 