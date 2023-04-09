class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getInfoUser() {
    return fetch(this._baseUrl + '/users/me', {
      headers: this._headers
    })
      .then(res => this._getResponseData(res));
  }

  editUser(data) {
    return fetch(this._baseUrl + '/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
      .then(res => this._getResponseData(res));
  }

  getCards() {
    return fetch(this._baseUrl + '/cards', {
      headers: this._headers
    })
      .then(res => this._getResponseData(res));
  }

  addNewCard(data) {
    return fetch(this._baseUrl + '/cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then(res => this._getResponseData(res));
  }

  deleteCard(cardId) {
    return fetch(this._baseUrl + '/cards/' + cardId, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(res => this._getResponseData(res));
  }

  addLike(cardId) {
    return fetch(this._baseUrl + '/cards/' + cardId + '/likes', {
      method: 'PUT',
      headers: this._headers
    })
      .then(res => this._getResponseData(res));
  }

  deleteLike(cardId) {
    return fetch(this._baseUrl + '/cards/' + cardId + '/likes', {
      method: "DELETE",
      headers: this._headers
    })
      .then(res => this._getResponseData(res));
  }

  editAvatar(link) {
    return fetch(this._baseUrl + '/users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: link
      })
    })
      .then(res => this._getResponseData(res));
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return this.addLike(cardId);
    } else {
      return this.deleteLike(cardId);
    }
  }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59',
  headers: {
    authorization: 'e8966b1f-d3a5-42d7-8115-fffa97d27cf8',
    'Content-Type': 'application/json'
  }
});

export default api;