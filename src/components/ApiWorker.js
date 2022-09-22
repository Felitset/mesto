import {
    authToken,
    cardUrl,
    userUrl
} from "../utils/api_config";

export class ApiWorker {
    constructor() { }

    saveRemoteLike(cardId) {
        fetch(cardUrl + '/' + cardId + '/likes', {
            method: 'PUT',
            headers: {
                'authorization': authToken
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    deleteRemoteLike(cardId) {
        fetch(cardUrl + '/' + cardId + '/likes', {
            method: 'DELETE',
            headers: {
                'authorization': authToken
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    saveUser(userInfo) {
        return fetch(userUrl, {
            method: 'PATCH',
            headers: {
                'authorization': authToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: userInfo.name,
                about: userInfo.profession
            })
        }).catch((err) => {
            console.log(err);
        });
    }

    getUser() {
        return fetch(userUrl, {
            method: 'GET',
            headers: {
                'authorization': authToken
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    saveCard(placeInfo) {
        return fetch(cardUrl, {
            method: 'POST',
            headers: {
                'authorization': authToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: placeInfo.card_title,
                link: placeInfo.image_link
            })
        })
            .catch((err) => {
                console.log(err);
            });
    }

    deleteCard(cardId) {
        return fetch(cardUrl + '/' + cardId,
            {
                method: 'DELETE',
                headers: {
                    'authorization': authToken,
                    'Content-Type': 'application/json'
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    getAllCards() {
        return fetch(cardUrl, {
            method: 'GET',
            headers: {
                'authorization': authToken
            }
        })
            .catch((err) => {
                console.log(err);
            });
    }

    postNewAvatar(imageLink) {
        return fetch(userUrl + '/avatar', {
            method: 'PATCH',
            headers: {
                'authorization': authToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: imageLink.avatar_link
            })
        }).catch((err) => {
            console.log(err);
        });
    }
}