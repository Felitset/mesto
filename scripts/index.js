// Main page
const popupProfileElement = document.querySelector('.popup-profile-edit');
const popupProfileButtonElement = document.querySelector('.profile__edit-button');
const popupAddCardButtonElement = document.querySelector('.profile__add-button');

const openGalleryElementPopup = function() {
  popupAddCardElement.classList.remove('popup_is-closed');
}
popupAddCardButtonElement.addEventListener('click', openGalleryElementPopup);

const openProfilePopup = function() {
  popupProfileElement.classList.remove('popup_is-closed');
  popupInputName.value = finalName.textContent;
  popupInputJob.value = finalJob.textContent;
  formProfileElement.addEventListener('submit', editProfileSubmitHandler);
};

popupProfileButtonElement.addEventListener('click', openProfilePopup);

const finalName = document.querySelector('.profile__name');
const finalJob = document.querySelector('.profile__description');

// Profile edditing popup
const popupProfileCloseButtonElement = popupProfileElement.querySelector('.popup__close');
const submitProfileButtonElement = popupProfileElement.querySelector('.popup__save-button');

let formProfileElement = popupProfileElement.querySelector('.popup__form');
let popupInputName = popupProfileElement.querySelector('.popup__input_type_name');
let popupInputJob = popupProfileElement.querySelector('.popup__input_type_job');

const closeProfilePopup = function() {
  popupProfileElement.classList.add('popup_is-closed');
};

popupProfileCloseButtonElement.addEventListener('click', closeProfilePopup);

let nameInput = popupProfileElement.querySelector("input[name='name']");
let jobInput = popupProfileElement.querySelector("input[name='profession']");

function editProfileSubmitHandler(evt) {
  evt.preventDefault();

  finalName.textContent = nameInput.value;
  finalJob.textContent = jobInput.value;

  closeProfilePopup();
}

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
// Main page
const popupAddCardElement = document.querySelector('.popup-add-card');

const list_of_cards = document.querySelector(selectors.list_of_cards);
const card_template =document.querySelector(selectors.card_template);
const popupCardImagePreview = document.querySelector('.popup-card-image');
const popupCardImagePreviewCloseButtonElement = popupCardImagePreview.querySelector('.popup__close');


// Card adding popup
const popupAddCardCloseButtonElement = popupAddCardElement.querySelector('.popup__close');
const submitAddCardButtonElement = popupAddCardElement.querySelector('.popup__save-button');

const closeAddCardPopup = function() {
  popupAddCardElement.classList.add('popup_is-closed');
};


popupAddCardCloseButtonElement.addEventListener('click', closeAddCardPopup);


const addCardForm = popupAddCardElement.querySelector(selectors.add_card_form);
const cardTitleInput = popupAddCardElement.querySelector(selectors.card_title_input);
const cardName = popupAddCardElement.querySelector("input[name='card-title']");
const cardImgLink = popupAddCardElement.querySelector("input[name='image-link']");

const openAddCardPopup = function() {
popupAddCardElement.classList.remove('popup_is-closed');
addCardForm.addEventListener('submit', addCardSubmitHandler)
};



popupAddCardButtonElement.addEventListener('click', openAddCardPopup);

popupProfileCloseButtonElement.addEventListener('click', closeProfilePopup);


function createCard(place_info) {
const template = card_template.content.querySelector(selectors.card_item).cloneNode(true)

template.querySelector(selectors.card_image_link).src = place_info.link
template.querySelector(selectors.card_name).textContent = place_info.name
 

template.querySelector(selectors.card_delete_button).addEventListener('click', () => {template.remove();});
template.querySelector(selectors.card_like_button).addEventListener('click', () => {setLike(template);});
template.querySelector(selectors.card_image_link).addEventListener('click', () => {openPopupCardImagePreview(place_info);});
list_of_cards.prepend(template);
}

function setLike(template) {
template.querySelector('.gallery__like').classList.toggle('gallery__like_status_active');
}

function addDefaultCards() {
const places_info = [
  {
    name: 'Аргентина',
    link: 'https://images.unsplash.com/photo-1591022560022-ae375e13cbc4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80'
  },
  {
    name: 'Австралия',
    link: 'https://images.unsplash.com/photo-1529108190281-9a4f620bc2d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1139&q=80'
  },
  {
    name: 'Индонезия, о. Бали',
    link: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
  },
  {
    name: 'Исландия',
    link: 'https://images.unsplash.com/photo-1504829857797-ddff29c27927?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
  },
  {
    name: 'Россия, Сибирь',
    link: 'https://images.unsplash.com/photo-1630475915483-7e492dcccf18?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
  },
  {
    name: 'Новая Зеландия',
    link: 'https://images.unsplash.com/photo-1591041263035-d5e9caf59aff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
  }
];

places_info.forEach(createCard);
}


function addCardSubmitHandler(evt) {
  evt.preventDefault();
  let place_info = {
    name: cardName.value,
    link: cardImgLink.value
  }
  
  createCard(place_info)

  closeAddCardPopup();
}

addDefaultCards();

// Card preview popup

function openPopupCardImagePreview(card_info) {
  popupCardImagePreview.classList.remove('popup_is-closed');
  popupCardImagePreview.querySelector('.popup__image').src = card_info.link;
  popupCardImagePreview.querySelector('.popup__image-title').textContent = card_info.name;
}

function closePopupCardImagePreview(event) {
  event.preventDefault();
  popupCardImagePreview.classList.add('popup_is-closed');
}

popupCardImagePreviewCloseButtonElement.addEventListener('click', closePopupCardImagePreview);