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
const popupAddCardElement = document.querySelector('.popup-add-card');
const popupProfileElement = document.querySelector('.popup-profile-edit');
const popupProfileButtonElement = document.querySelector('.profile__edit-button');
const popupAddCardButtonElement = document.querySelector('.profile__add-button');
const popup = document.querySelector('.popup');
const finalName = document.querySelector('.profile__name');
const finalJob = document.querySelector('.profile__description');
const list_of_cards = document.querySelector(selectors.list_of_cards);
const cardTemplate = document.querySelector(selectors.card_template);
const addCardForm = popupAddCardElement.querySelector(selectors.add_card_form);
const popupProfileCloseButtonElement = popupProfileElement.querySelector('.popup__close');
const submitProfileButtonElement = popupProfileElement.querySelector('.popup__save-button');
const formProfileElement = popupProfileElement.querySelector('.popup__form');
const popupInputName = popupProfileElement.querySelector('.popup__input_type_name');
const popupInputJob = popupProfileElement.querySelector('.popup__input_type_job');
const nameInput = popupProfileElement.querySelector("input[name='name']");
const jobInput = popupProfileElement.querySelector("input[name='profession']");
const cardTitleInput = popupAddCardElement.querySelector(selectors.card_title_input);
const cardName = popupAddCardElement.querySelector("input[name='card-title']");
const cardImgLink = popupAddCardElement.querySelector("input[name='image-link']");
const popupCardImagePreview = document.querySelector('.popup-card-image');
const popupCardImagePreviewCloseButtonElement = popupCardImagePreview.querySelector('.popup__close');
const popupAddCardCloseButtonElement = popupAddCardElement.querySelector('.popup__close');
const submitAddCardButtonElement = popupAddCardElement.querySelector('.popup__save-button');

const card_template = createCardTemplate(place_info);
const cardTemplateImageLink = popupAddCardElement.querySelector(selectors.card_image_link);
const popupImage = popupCardImagePreview.querySelector('.popup__image');
const popupImageTitle = popupCardImagePreview.querySelector('.popup__image-title');



function openPopup(popupElement) {
  popupElement.classList.remove('popup_is-closed');
}

function closePopup(popupElement) {
  popupElement.classList.add('popup_is-closed');
}

function openAddCardPopup() {
  openPopup(popupAddCardElement);
  
  cardName.value = '';
  cardImgLink.value = '';
}

function openProfilePopup() {
  openPopup(popupProfileElement);
  
  popupInputName.value = finalName.textContent;
  popupInputJob.value = finalJob.textContent;
  formProfileElement.addEventListener('submit', editProfileSubmitHandler);
}

function openPopupCardImagePreview(card_info) {
  openPopup(popupCardImagePreview);
  popupImageTitle.textContent = card_info.name;
  popupImage.src = card_info.link;
}

function closeProfilePopup() {
  closePopup(popupProfileElement);
}

function editProfileSubmitHandler(evt) {
  evt.preventDefault();

  finalName.textContent = nameInput.value;
  finalJob.textContent = jobInput.value;

  closeProfilePopup();
}

function closeAddCardPopup() {
  closePopup(popupAddCardElement);
}

// const cardTemplate1 = card_template.content.querySelector(selectors.card_item);

function createCardTemplate(place_info) {
cardTemplate.cloneNode(true);
place_info = {
  name: cardName.value,
  link: cardImgLink.value
};
cardTemplateImageLink.alt = place_info.name;
cardTemplate.querySelector(selectors.card_name).textContent = place_info.name;
cardTemplateImageLink.src = place_info.link;
 
return cardTemplate;
}

function setLike(template) {
template.querySelector('.gallery__like').classList.toggle('gallery__like_status_active');
}

function addDefaultCards() {
  
  places_info.forEach((element) => {
    list_of_cards.prepend(createCardTemplate(element));
  });
}

function addCardSubmitHandler(evt) {
  evt.preventDefault();
  
  list_of_cards.prepend(card_template);

  closeAddCardPopup();
}

function closePopupCardImagePreview(event) {
  event.preventDefault();
  closePopup(popupCardImagePreview);
}
popupProfileButtonElement.addEventListener('click', openProfilePopup);
popupProfileCloseButtonElement.addEventListener('click', closeProfilePopup);
popupAddCardCloseButtonElement.addEventListener('click', closeAddCardPopup);

popupProfileCloseButtonElement.addEventListener('click', closeProfilePopup);
cardTemplate.querySelector(selectors.card_delete_button).addEventListener('click', () => {cardTemplate.remove();});
cardTemplate.querySelector(selectors.card_like_button).addEventListener('click', () => {setLike(cardTemplate);});
cardTemplateImageLink.addEventListener('click', () => {openPopupCardImagePreview(place_info);});

addCardForm.addEventListener('submit', addCardSubmitHandler);

popupAddCardButtonElement.addEventListener('click', openAddCardPopup);
popupCardImagePreviewCloseButtonElement.addEventListener('click', closePopupCardImagePreview);
addDefaultCards();