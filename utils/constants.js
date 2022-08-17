const selectors = {
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

const validationConfig = {
  formInput: ".popup__input",
  formButton: ".popup__button",
  activeButtonClass: "popup__button_active",
  inputErrorClass: "popup__input_type_error",
  errorElement: "popup__input-error_message"
}

export {selectors, validationConfig};