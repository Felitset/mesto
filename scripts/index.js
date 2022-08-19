import {
  FormValidator
} from './FormValidator.js';
import {
  Card
} from "./Card.js";
import {
  selectors, 
  validationConfig
} from "../utils/constants.js";
import {
  placesInfo
} from "./card-array.js";

const popupProfileElement = document.querySelector(".popup-profile-edit");
const editProfileForm = popupProfileElement.querySelector(selectors.popupInputForm);

const popupAddCardElement = document.querySelector(".popup-add-card");
const popupCardImagePreview = document.querySelector(".popup-card-image");
const popupProfileButtonElement = document.querySelector(
  ".profile__edit-button"
);
const popupAddCardButtonElement = document.querySelector(
  ".profile__add-button"
);

const addCardForm = popupAddCardElement.querySelector(selectors.popupInputForm);

const listOfCards = document.querySelector(selectors.listOfCards);
const cardTemplate = document.querySelector(selectors.cardTemplate);

const popupCardImagePreviewCloseButtonElement =
  popupCardImagePreview.querySelector(selectors.popupCloseButton);

const popupImage = popupCardImagePreview.querySelector(".popup__image");
const popupImageTitle = popupCardImagePreview.querySelector(
  ".popup__image-title"
);
const cardTitleInput = popupAddCardElement.querySelector(
  selectors.cardTitleInput
);
const cardName = popupAddCardElement.querySelector("input[name='card-title']");
const cardImgLink = popupAddCardElement.querySelector(
  "input[name='image-link']"
);
const nameInput = popupProfileElement.querySelector("input[name='name']");
const jobInput = popupProfileElement.querySelector("input[name='profession']");
const popupAddCardCloseButtonElement =
  popupAddCardElement.querySelector(selectors.popupCloseButton);

const popupProfileCloseButtonElement =
  popupProfileElement.querySelector(selectors.popupCloseButton);

const popupInputName = popupProfileElement.querySelector(
  ".popup__input_type_name"
);
const popupInputJob = popupProfileElement.querySelector(
  ".popup__input_type_job"
);
const finalName = document.querySelector(".profile__name");
const finalJob = document.querySelector(".profile__description");

const formButton = popupAddCardElement.querySelector('.popup__button');
const formAddCard = popupAddCardElement.querySelector(".popup__form");

const gallerySpace = document.querySelector('.gallery');

//Unifuncion OPEN-CLOSE (via Esc and Overlay)
function openPopup(popupElement) {
  popupElement.classList.add("popup_is-opened");

  document.addEventListener("keydown", handleEscClose);
}

function closePopup(popupElement) {
  popupElement.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscClose);
}

function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const activePopup = document.querySelector(".popup_is-opened");
    closePopup(activePopup);
  };
}

function handleOverlayClose(evt) {
  if (
      evt.target.querySelector(".popup__transparent-container") ||
      evt.target.querySelector(".popup__container")
  ) {
    const activePopup = document.querySelector(".popup_is-opened"); 
    closePopup(activePopup);
  };
}


//Popup open function
function openAddCardPopup() {
  openPopup(popupAddCardElement);
  formAddCard.reset();
  addCardValidator.clearInputErrors();
  addCardValidator.deactivatePopupButton();
}

function openProfilePopup() {
  openPopup(popupProfileElement);

  popupInputName.value = finalName.textContent;
  popupInputJob.value = finalJob.textContent;
  editProfileValidator.clearInputErrors();
  editProfileValidator.deactivatePopupButton();
}

export function openPopupCardImagePreview(card_info) {
  openPopup(popupCardImagePreview);
  popupImageTitle.textContent = card_info.name;
  popupImage.src = card_info.link;
  popupImage.alt = card_info.name;
}

// Popup close functions
function closeAddCardPopup() {
  closePopup(popupAddCardElement);
}

function closeProfilePopup() {
  closePopup(popupProfileElement);
}

function closePopupCardImagePreview() {
  closePopup(popupCardImagePreview);
}

//Popup submit function

function editProfileSubmitHandler(evt) {
  evt.preventDefault();

  finalName.textContent = nameInput.value;
  finalJob.textContent = jobInput.value;

  closePopup(popupProfileElement);
}

function addCardSubmitHandler(evt) {
  evt.preventDefault();
  const placeInfo = {
      name: cardName.value,
      link: cardImgLink.value,
  };
  const card = createCard(placeInfo);
  addCard(card);
  closePopup(popupAddCardElement);
}
//Close via overlay
document.addEventListener("click", handleOverlayClose);

//Edit profile popup
popupProfileButtonElement.addEventListener("click", openProfilePopup);
editProfileForm.addEventListener("submit", editProfileSubmitHandler);
popupProfileCloseButtonElement.addEventListener("click", closeProfilePopup);

//Add card popup
popupAddCardButtonElement.addEventListener("click", openAddCardPopup);
popupAddCardCloseButtonElement.addEventListener("click", closeAddCardPopup);
addCardForm.addEventListener("submit", addCardSubmitHandler);

//Card preview popup
popupCardImagePreviewCloseButtonElement.addEventListener(
  "click",
  closePopupCardImagePreview
);

function createCard(item) {
  const card = new Card(item.name, item.link, openPopupCardImagePreview);
  const cardElement = card.generateCard();
  return cardElement;
}


placesInfo.forEach((item) => addCard(createCard(item)));

function addCard(cardElement) {
  gallerySpace.prepend(cardElement);
}

// Validation for input lines
const addCardValidator = new FormValidator(validationConfig, addCardForm);
addCardValidator.enableValidation();

const editProfileValidator = new FormValidator(validationConfig, editProfileForm);
editProfileValidator.enableValidation();