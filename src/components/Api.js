export class Api {
    constructor(apiHost, authToken) {
        this.apiHost = apiHost;
        this.authToken = authToken;

        this.cardUrl = this.apiHost + '/cards';
        this.userUrl = this.apiHost + '/users/me';
        this.avatarUrl = this.userUrl + '/avatar';

    }

    getUserId() {
        return this.getUser()
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                this.userId = data._id
            });
    }

    saveRemoteLike(cardId) {
        fetch(this.cardUrl + '/' + cardId + '/likes', {
            method: 'PUT',
            headers: {
                'authorization': this.authToken
            }
        });
    }

    deleteRemoteLike(cardId) {
        fetch(this.cardUrl + '/' + cardId + '/likes', {
            method: 'DELETE',
            headers: {
                'authorization': this.authToken
            }
        });
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
        });
    }

    getUser() {
        return fetch(this.userUrl, {
            method: 'GET',
            headers: {
                'authorization': this.authToken
            }
        });
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
        });
    }

    deleteCard(cardId) {
        return fetch(this.cardUrl + '/' + cardId,
            {
                method: 'DELETE',
                headers: {
                    'authorization': this.authToken,
                    'Content-Type': 'application/json'
                }
            });
    }

    getAllCards() {
        return fetch(this.cardUrl, {
            method: 'GET',
            headers: {
                'authorization': this.authToken
            }
        });
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
        });
    }

    checkForError() {

    }
}