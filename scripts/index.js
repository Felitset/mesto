// Main page
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

const popupProfileElement = document.querySelector(".popup-profile-edit");
const formProfileElement = popupProfileElement.querySelector(selectors.popupInputForm);

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


//Unifuncion OPEN-CLOSE (via Esc and Overlay)
function openPopup(popupElement) {
  popupElement.classList.add("popup_is-opened");
  
  document.addEventListener("keydown", handleEscClose);
}


function closePopup() {
  const activePopup = document.querySelector(".popup_is-opened");
  activePopup.classList.remove("popup_is-opened");

  document.removeEventListener("keydown", handleEscClose);
}

function handleEscClose(evt) {
    if (evt.key === "Escape") {
      closePopup();
    };
}

function handleOverlayClose(evt) {
  if (
    evt.target.querySelector(".popup__transparent-container") ||
    evt.target.querySelector(".popup__container")
  ) {

    closePopup();
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

//Popup submit function

function editProfileSubmitHandler(evt) {
  evt.preventDefault();

  finalName.textContent = nameInput.value;
  finalJob.textContent = jobInput.value;
  
  const formButton = popupProfileElement.querySelector(validationConfig.formButton);
  if (formButton) {
    deactivatePopupButton(formButton);
  };
  closePopup();
}

function addCardSubmitHandler(evt) {
  evt.preventDefault();
  const placeInfo = {
    name: cardName.value,
    link: cardImgLink.value,
  };

  listOfCards.prepend(createCardTemplate(placeInfo));

  
  const formButton = popupAddCardElement.querySelector(validationConfig.formButton);
  if (formButton) {
    deactivatePopupButton(formButton);
  };
  closePopup();
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

function setLike(template) {
  template
    .querySelector(".gallery__like")
    .classList.toggle("gallery__like_status_active");
}

document.addEventListener("click", handleOverlayClose);

//Edit profile popup
popupProfileButtonElement.addEventListener("click", openProfilePopup);
formProfileElement.addEventListener("submit", editProfileSubmitHandler);
popupProfileCloseButtonElement.addEventListener("click", closePopup);

//Add card popup
popupAddCardButtonElement.addEventListener("click", openAddCardPopup);
popupAddCardCloseButtonElement.addEventListener("click", closePopup);
addCardForm.addEventListener("submit", addCardSubmitHandler);

//Card preview popup
popupCardImagePreviewCloseButtonElement.addEventListener(
  "click",
  closePopup
);

addDefaultCards();
