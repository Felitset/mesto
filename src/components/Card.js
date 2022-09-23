// import { userId } from '../utils/api_config.js';

export class Card {
    constructor(item, apiCaller, handleCardClick, handleDeleteClick) {
        this._title = item.card_title;
        this._image = item.image_link;
        this.cardId = item.card_id;
        this._ownerId = item.owner_id;
        this._likesNumber = item.likes_number;
        this._userLikeFlag = item.user_like_flag;
        this._apiCaller = apiCaller;

        this._handleCardClick = handleCardClick;
        this._handleDeleteClick = handleDeleteClick;
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
            this._apiCaller.saveRemoteLike(this.cardId);
            this._likesNumber = this._likesNumber + 1
        }
        else {
            this._apiCaller.deleteRemoteLike(this.cardId);
            this._likesNumber = this._likesNumber - 1
        }
        this._setLikesOnCard()
    }

    _manageDeleteButton() {
        if (this._ownerId !== this._apiCaller.userId) {
            this._deleteButtonElement.style.display = "none";
        }
    }

    deleteCard() {
        this._element.remove();
    }

    _setEventListeners() {
        this._deleteButtonElement = this._element.querySelector('.gallery__delete-item');
        this._cardLikeButton = this._element.querySelector('.gallery__like');
        this._cardImageLink = this._element.querySelector('.gallery__image');

        this._deleteButtonElement.addEventListener("click", () => {
            this._handleDeleteClick()
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