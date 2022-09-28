export class Api {
    constructor(apiHost, authToken) {
        this.apiHost = apiHost;
        this.authToken = authToken;

        this.cardUrl = this.apiHost + '/cards';
        this.userUrl = this.apiHost + '/users/me';
        this.avatarUrl = this.userUrl + '/avatar';

    }

    saveRemoteLike(cardId) {
        fetch(this.cardUrl + '/' + cardId + '/likes', {
            method: 'PUT',
            headers: {
                'authorization': this.authToken
            }
        })
            .then(this._checkResponse);
    }

    deleteRemoteLike(cardId) {
        fetch(this.cardUrl + '/' + cardId + '/likes', {
            method: 'DELETE',
            headers: {
                'authorization': this.authToken
            }
        })
            .then(this._checkResponse);
    }

    saveUser(userInfo) {
        return fetch(this.userUrl, {
            method: 'PATCH',
            headers: {
                'authorization': this.authToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: userInfo.name,
                about: userInfo.profession
            })
        })
            .then(this._checkResponse);
    }

    getUser() {
        return fetch(this.userUrl, {
            method: 'GET',
            headers: {
                'authorization': this.authToken
            }
        })
            .then(this._checkResponse);
    }

    saveCard(placeInfo) {
        return fetch(this.cardUrl, {
            method: 'POST',
            headers: {
                'authorization': this.authToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: placeInfo.card_title,
                link: placeInfo.image_link
            })
        })
            .then(this._checkResponse);
    }

    deleteCard(cardId) {
        return fetch(this.cardUrl + '/' + cardId,
            {
                method: 'DELETE',
                headers: {
                    'authorization': this.authToken,
                    'Content-Type': 'application/json'
                }
            })
            .then(this._checkResponse);
    }

    getAllCards() {
        return fetch(this.cardUrl, {
            method: 'GET',
            headers: {
                'authorization': this.authToken
            }
        })
            .then(this._checkResponse);
    }

    postNewAvatar(imageLink) {
        return fetch(this.avatarUrl, {
            method: 'PATCH',
            headers: {
                'authorization': this.authToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: imageLink.avatar_link
            })
        })
            .then(this._checkResponse);
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

}