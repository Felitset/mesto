export class Card {
  constructor(title, image, handleCardClick) {
      this._title = title;
      this._image = image;
      this._handleCardClick = handleCardClick;

  }

  setlike() {
      this._element
          .querySelector(".gallery__like")
          .classList.toggle("gallery__like_status_active");
  }

  _getTemplate() {
      const cardElement = document
          .querySelector('.gallery-template')
          .content
          .querySelector('.gallery__item')
          .cloneNode(true);

      return cardElement;
  }

  generateCard() {
      this._element = this._getTemplate();
      this._element.querySelector('.gallery__title').textContent = this._title;
      this._element.querySelector('.gallery__image').src = this._image;
      this._element.querySelector('.gallery__image').alt = this._title;
      this._setEventListeners()
      return this._element;
  }

  _setEventListeners() {
      this._deleteButtonElement = this._element.querySelector('.gallery__delete-item')
      this._cardLikeButton = this._element.querySelector('.gallery__like');
      this._cardImageLink = this._element.querySelector('.gallery__image');

      this._deleteButtonElement.addEventListener("click", () => {
          this._element.remove();
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