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
            console.log(err); // выведем ошибку в консоль
        });
    }

    deleteRemoteLike(cardId) {
        fetch(cardUrl + '/' + cardId + '/likes', {
            method: 'DELETE',
            headers: {
                'authorization': authToken
            }
        }).catch((err) => {
            console.log(err); // выведем ошибку в консоль
        });
    }

    saveUser(userInfo) {
        fetch(userUrl, {
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
            console.log(err); // выведем ошибку в консоль
        });
    }

    getUser() {
        return fetch(userUrl, {
            method: 'GET',
            headers: {
                'authorization': authToken
            }
        }).catch((err) => {
            console.log(err); // выведем ошибку в консоль
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
                console.log(err); // выведем ошибку в консоль
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
                console.log(err); // выведем ошибку в консоль
            });
    }

}