// Main page
const selectors = {
  add_card_form: '.popup__form',
  card_title_input: '.popup__input_type_card-title',
  list_of_cards: '.gallery',
  card_item: '.gallery__item',
  card_name: '.gallery__title',
  card_image_link: '.gallery__image',
  card_template: '.gallery-template',
  card_delete_button: '.gallery__delete-item',
  card_like_button: '.gallery__like'
}

const popup = document.querySelector('.popup');
const popupProfileElement = document.querySelector('.popup-profile-edit');
const formProfileElement = popupProfileElement.querySelector('.popup__form');

const popupAddCardElement = document.querySelector('.popup-add-card');
const popupCardImagePreview = document.querySelector('.popup-card-image');
const popupProfileButtonElement = document.querySelector('.profile__edit-button');
const popupAddCardButtonElement = document.querySelector('.profile__add-button');


const addCardForm = popupAddCardElement.querySelector(selectors.add_card_form);

const list_of_cards = document.querySelector(selectors.list_of_cards);
const card_template =document.querySelector(selectors.card_template);

const popupCardImagePreviewCloseButtonElement = popupCardImagePreview.querySelector('.popup__close');

const popupImage = popupCardImagePreview.querySelector('.popup__image');
const popupImageTitle = popupCardImagePreview.querySelector('.popup__image-title');
const cardTitleInput = popupAddCardElement.querySelector(selectors.card_title_input);
const cardName = popupAddCardElement.querySelector("input[name='card-title']");
const cardImgLink = popupAddCardElement.querySelector("input[name='image-link']");
const nameInput = popupProfileElement.querySelector("input[name='name']");
const jobInput = popupProfileElement.querySelector("input[name='profession']");
const popupAddCardCloseButtonElement = popupAddCardElement.querySelector('.popup__close');
const submitAddCardButtonElement = popupAddCardElement.querySelector('.popup__save-button');
const popupProfileCloseButtonElement = popupProfileElement.querySelector('.popup__close');
const submitProfileButtonElement = popupProfileElement.querySelector('.popup__save-button');


const popupInputName = popupProfileElement.querySelector('.popup__input_type_name');
const popupInputJob = popupProfileElement.querySelector('.popup__input_type_job');
const finalName = document.querySelector('.profile__name');
const finalJob = document.querySelector('.profile__description');

function openPopup(popupElement) {
  popupElement.classList.remove('popup_is-closed');
}
function closePopup(popupElement) {
  popupElement.classList.add('popup_is-closed');
}

//Popup open function
function openAddCardPopup() {
  openPopup(popupAddCardElement);
  
  cardName.value = '';
  cardImgLink.value = '';
  }

function openProfilePopup() {
  openPopup(popupProfileElement);
  
  popupInputName.value = finalName.textContent;
  popupInputJob.value = finalJob.textContent;
  
}

function openPopupCardImagePreview(card_info) {
  openPopup(popupCardImagePreview);
  popupImageTitle.textContent = card_info.name;
  popupImage.src = card_info.link;
}

//Popup close function
function closeProfilePopup() {
  closePopup(popupProfileElement);
}

function closeAddCardPopup() {
  closePopup(popupAddCardElement);
}

function closePopupCardImagePreview(event) {
  event.preventDefault();
  closePopup(popupCardImagePreview);
}


function editProfileSubmitHandler(evt) {
  evt.preventDefault();

  finalName.textContent = nameInput.value;
  finalJob.textContent = jobInput.value;

  closeProfilePopup();
}



const cardTemplate = card_template.content.querySelector(selectors.card_item);

function createCardTemplate(place_info) {
  const cardTemplateClone=cardTemplate.cloneNode(true);

  const cardImageLink = cardTemplateClone.querySelector(selectors.card_image_link);
  const cardDeleteButton=cardTemplateClone.querySelector(selectors.card_delete_button);
  const cardLikeButton=cardTemplateClone.querySelector(selectors.card_like_button);
  const cardName = cardTemplateClone.querySelector(selectors.card_name);

  cardImageLink.alt = place_info.name;
  cardName.textContent = place_info.name;
  cardImageLink.src = place_info.link;
  
  cardDeleteButton.addEventListener('click', () => {cardTemplateClone.remove();});
  cardLikeButton.addEventListener('click', () => {setLike(cardTemplateClone);});
  cardImageLink.addEventListener('click', () => {openPopupCardImagePreview(place_info);});

  return cardTemplateClone;
}




function addDefaultCards() {
  places_info.forEach((element) => {
    list_of_cards.prepend(createCardTemplate(element));
  });
}

function addCardSubmitHandler(evt) {
  evt.preventDefault();
  place_info = {
    name: cardName.value,
    link: cardImgLink.value
  };
  
  list_of_cards.prepend(createCardTemplate(place_info));

  closeAddCardPopup();
}
function setLike(template) {
  template.querySelector('.gallery__like').classList.toggle('gallery__like_status_active');
  }


//Edit profile popup
popupProfileButtonElement.addEventListener('click', openProfilePopup);
popupProfileCloseButtonElement.addEventListener('click', closeProfilePopup);
formProfileElement.addEventListener('submit', editProfileSubmitHandler);

//Add card popup
popupAddCardButtonElement.addEventListener('click', openAddCardPopup);
popupAddCardCloseButtonElement.addEventListener('click', closeAddCardPopup);
addCardForm.addEventListener('submit', addCardSubmitHandler);

//Card preview popup
popupCardImagePreviewCloseButtonElement.addEventListener('click', closePopupCardImagePreview);


addDefaultCards();