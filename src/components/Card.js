import { openConfirmationPopup } from '../pages/index.js';
import { userId } from '../utils/api_config.js';

export class Card {
    constructor(title, image, 
        initialLikesNumber, cardId, userLikeFlag,
         ownerId, apiCaller, handleCardClick) {
        this._title = title;
        this._image = image;
        this._handleCardClick = handleCardClick;
        this._cardId = cardId;
        this._ownerId = ownerId;
        this._likesNumber = initialLikesNumber;
        this._userLikeFlag = userLikeFlag;
        this._apiCaller = apiCaller;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector('.gallery-template')
            .content
            .querySelector('.gallery__item')
            .cloneNode(true);
        return cardElement;
    }

    _setLikesOnCard() {
        const likeCounter = this._element.querySelector('.gallery__like-counter')
        likeCounter.textContent = this._likesNumber
    }

    generateCard() {
        this._element = this._getTemplate();
        this.image = this._element.querySelector('.gallery__image');
        this._element.querySelector('.gallery__title').textContent = this._title;
        this.image.src = this._image;
        this.image.alt = this._title;
        this._setLikesOnCard();
        this._setEventListeners();
        this._manageDeleteButton();
        if (this._userLikeFlag == 1) {
            this._changeHeart()
        };
        return this._element;
    }

    _changeHeart() {
        this._cardLikeButton.classList.toggle("gallery__like_status_active");
    }

    _changeLikeStatus() {
        this._changeHeart();
        if (this._cardLikeButton.classList.contains("gallery__like_status_active")) {
            this._apiCaller.saveRemoteLike(this._cardId);
            this._likesNumber = this._likesNumber + 1
        }
        else {
            this._apiCaller.deleteRemoteLike(this._cardId);
            this._likesNumber = this._likesNumber - 1
        }
        this._setLikesOnCard()
    }

    _manageDeleteButton() {
        if (this._ownerId !== userId) {
            this._deleteButtonElement.style.display = "none";
        }
    }

    _setEventListeners() {
        this._deleteButtonElement = this._element.querySelector('.gallery__delete-item');
        this._cardLikeButton = this._element.querySelector('.gallery__like');
        this._cardImageLink = this._element.querySelector('.gallery__image');

        this._deleteButtonElement.addEventListener("click", () => {
            openConfirmationPopup();
        });

        this._cardLikeButton.addEventListener("click", () => {
            this._changeLikeStatus();
        });

        this._cardImageLink.addEventListener("click", () => {
            const card_info = {
                name: this._title,
                link: this._image
            }
            this._handleCardClick(card_info)
        });
    }
}