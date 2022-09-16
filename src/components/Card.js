import {openConfirmationPopup} from '../pages/index.js';
export class Card {
  constructor(title, image, likesNumber, handleCardClick, cardId, ownerId) {
      this._title = title;
      this._image = image;
      this._handleCardClick = handleCardClick;
      this._cardId = cardId;
      this._ownerId = ownerId;
      this._currentLikesNumber = likesNumber;
  }

  _getTemplate() {
      const cardElement = document
          .querySelector('.gallery-template')
          .content
          .querySelector('.gallery__item')
          .cloneNode(true);
      return cardElement;
  }

  _setLikes(element){
    const likeCounter = element.querySelector('.gallery__like-counter') 
    likeCounter.textContent = this._currentLikesNumber
  }

  generateCard() {
      this._element = this._getTemplate();
      this.image = this._element.querySelector('.gallery__image');
      this._element.querySelector('.gallery__title').textContent = this._title;
      this.image.src = this._image;
      this.image.alt = this._title;
      this._setLikes(this._element);
      this._setEventListeners();
      return this._element;
  }

  _setEventListeners() {
      this._deleteButtonElement = this._element.querySelector('.gallery__delete-item')
      this._cardLikeButton = this._element.querySelector('.gallery__like');
      this._cardImageLink = this._element.querySelector('.gallery__image');

      this._deleteButtonElement.addEventListener("click", () => {
        openConfirmationPopup();
      });

      this._cardLikeButton.addEventListener("click", () => {
          this._cardLikeButton.classList.toggle("gallery__like_status_active");
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