// Main page
const selectors = {
  addCardForm: ".popup__form",
  cardTitleInput: ".popup__input_type_card-title",
  listOfCards: ".gallery",
  cardItem: ".gallery__item",
  cardName: ".gallery__title",
  cardImageLink: ".gallery__image",
  cardTemplate: ".gallery-template",
  cardDeleteButton: ".gallery__delete-item",
  cardLikeButton: ".gallery__like",
};

const popupProfileElement = document.querySelector(".popup-profile-edit");
const formProfileElement = popupProfileElement.querySelector(".popup__form");

const popupAddCardElement = document.querySelector(".popup-add-card");
const popupCardImagePreview = document.querySelector(".popup-card-image");
const popupProfileButtonElement = document.querySelector(
  ".profile__edit-button"
);
const popupAddCardButtonElement = document.querySelector(
  ".profile__add-button"
);

const addCardForm = popupAddCardElement.querySelector(selectors.addCardForm);

const listOfCards = document.querySelector(selectors.listOfCards);
const cardTemplate = document.querySelector(selectors.cardTemplate);

const popupCardImagePreviewCloseButtonElement =
  popupCardImagePreview.querySelector(".popup__close");

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
  popupAddCardElement.querySelector(".popup__close");
const submitAddCardButtonElement = popupAddCardElement.querySelector(
  ".popup__save-button"
);
const popupProfileCloseButtonElement =
  popupProfileElement.querySelector(".popup__close");
const submitProfileButtonElement = popupProfileElement.querySelector(
  ".popup__save-button"
);

const popupInputName = popupProfileElement.querySelector(
  ".popup__input_type_name"
);
const popupInputJob = popupProfileElement.querySelector(
  ".popup__input_type_job"
);
const finalName = document.querySelector(".profile__name");
const finalJob = document.querySelector(".profile__description");


//Unifuncion OPEN-CLOSE (via Esc and Overlay)
function openPopup(popupElement) {
  popupElement.classList.remove("popup_is-closed");
  popupElement.addEventListener("click", evt => handleOverlayClose(evt, popupElement));

  const formButton = popupElement.querySelector(".popup__button");
  if (formButton) {
    deactivatePopupButton(formButton);
  }
  document.addEventListener("keydown", evt => handleEscClose(evt, popupElement));
}

function closePopup(popupElement) {
  popupElement.classList.add("popup_is-closed");
  document.removeEventListener("keydown", evt => handleEscClose(evt, popupElement));
}

function handleEscClose(evt, popupElement) {
    if (evt.key === "Escape") {
      console.log('heyy');
      closePopup(popupElement);
    };
}

function handleOverlayClose(evt, popupElement) {
  if (
    evt.target.querySelector(".popup__transparent-container") ||
    evt.target.querySelector(".popup__container")
  ) {
    closePopup(popupElement);
  };
}





//Popup open function
function openAddCardPopup() {
  openPopup(popupAddCardElement);

  const formElement = popupAddCardElement.querySelector(".popup__form");
  formElement.reset();
  clearPopup();
}

function openProfilePopup() {
  openPopup(popupProfileElement);

  popupInputName.value = finalName.textContent;
  popupInputJob.value = finalJob.textContent;
  clearPopup();
}

function openPopupCardImagePreview(card_info) {
  openPopup(popupCardImagePreview);
  popupImageTitle.textContent = card_info.name;
  popupImage.src = card_info.link;
  popupImage.alt = card_info.name;
}

//Popup close function

function closeAddCardPopup() {
  closePopup(popupAddCardElement);
}

function closeProfilePopup() {
  closePopup(popupProfileElement);
}

function closePopupCardImagePreview(event) {
  event.preventDefault();
  closePopup(popupCardImagePreview);
}

function editProfileSubmitHandler(evt) {
  evt.preventDefault();

  finalName.textContent = nameInput.value;
  finalJob.textContent = jobInput.value;
  closePopup(popupProfileElement);
}

function createCardTemplate(placeInfo) {
  const cardItem = cardTemplate.content.querySelector(selectors.cardItem);
  const cardTemplateClone = cardItem.cloneNode(true);

  const cardImageLink = cardTemplateClone.querySelector(
    selectors.cardImageLink
  );
  const cardDeleteButton = cardTemplateClone.querySelector(
    selectors.cardDeleteButton
  );
  const cardLikeButton = cardTemplateClone.querySelector(
    selectors.cardLikeButton
  );
  const cardName = cardTemplateClone.querySelector(selectors.cardName);

  cardImageLink.alt = placeInfo.name;
  cardName.textContent = placeInfo.name;
  cardImageLink.src = placeInfo.link;

  cardDeleteButton.addEventListener("click", () => {
    cardTemplateClone.remove();
  });
  cardLikeButton.addEventListener("click", () => {
    setLike(cardTemplateClone);
  });
  cardImageLink.addEventListener("click", () => {
    openPopupCardImagePreview(placeInfo);
  });

  return cardTemplateClone;
}

function addDefaultCards() {
  placesInfo.forEach((element) => {
    listOfCards.prepend(createCardTemplate(element));
  });
}

function addCardSubmitHandler(evt) {
  evt.preventDefault();
  const placeInfo = {
    name: cardName.value,
    link: cardImgLink.value,
  };

  listOfCards.prepend(createCardTemplate(placeInfo));

  closePopup(popupAddCardElement);
}

function setLike(template) {
  template
    .querySelector(".gallery__like")
    .classList.toggle("gallery__like_status_active");
}

//Edit profile popup
popupProfileButtonElement.addEventListener("click", openProfilePopup);
formProfileElement.addEventListener("submit", editProfileSubmitHandler);
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

addDefaultCards();
