export const selectors = {
  popupInputForm: ".popup__form",
  cardTitleInput: ".popup__input_type_card-title",
  listOfCards: ".gallery",
  cardItem: ".gallery__item",
  cardName: ".gallery__title",
  cardImageLink: ".gallery__image",
  cardTemplate: ".gallery-template",
  cardDeleteButton: ".gallery__delete-item",
  cardLikeButton: ".gallery__like",
  popupCloseButton: ".popup__close"
};

export const validationConfig = {
  formInput: ".popup__input",
  formButton: ".popup__button",
  activeButtonClass: "popup__button_active",
  inputErrorClass: "popup__input_type_error",
  errorElement: "popup__input-error_message"
}

export const popupProfileElement = document.querySelector(".popup-profile-edit");
export const editProfileForm = popupProfileElement.querySelector(selectors.popupInputForm);

export const popupAddCardElement = document.querySelector(".popup-add-card");
export const popupCardImagePreview = document.querySelector(".popup-card-image");
export const popupProfileButtonElement = document.querySelector(
  ".profile__edit-button"
);
export const popupAddCardButtonElement = document.querySelector(
  ".profile__add-button"
);

export const addCardForm = popupAddCardElement.querySelector(selectors.popupInputForm);

export const cardName = popupAddCardElement.querySelector("input[name='card-title']");
export const cardImgLink = popupAddCardElement.querySelector(
  "input[name='image-link']"
);
export const nameInput = popupProfileElement.querySelector("input[name='name']");
export const jobInput = popupProfileElement.querySelector("input[name='profession']");

export const finalName = document.querySelector(".profile__name");
export const finalJob = document.querySelector(".profile__description");

export const gallerySpace = document.querySelector('.gallery');