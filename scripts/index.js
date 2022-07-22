// Main page
const popupProfileElement = document.querySelector('.popup-profile-edit');
const popupProfileButtonElement = document.querySelector('.profile__edit-button');
const popupAddCardButtonElement = document.querySelector('.profile__add-button');

const popup = document.querySelector('.popup');


function openPopup(popupElement) {
  popupElement.classList.remove('popup_is-closed');
}
function closePopup(popupElement) {
  popupElement.classList.add('popup_is-closed');
}


function openAddCardPopup() {
  openPopup(popupAddCardElement)
    
  addCardForm.addEventListener('submit', addCardSubmitHandler)
  };
  
popupAddCardButtonElement.addEventListener('click', openAddCardPopup);

function openProfilePopup() {
  openPopup(popupProfileElement)
  
  popupInputName.value = finalName.textContent;
  popupInputJob.value = finalJob.textContent;
  formProfileElement.addEventListener('submit', editProfileSubmitHandler);
};

popupProfileButtonElement.addEventListener('click', openProfilePopup);

function openPopupCardImagePreview(card_info) {
  openPopup(popupCardImagePreview)
  
  popupImage.src = card_info.link;
  popupImageTitle.textContent = card_info.name;
}

const finalName = document.querySelector('.profile__name');
const finalJob = document.querySelector('.profile__description');

// Profile edditing popup
const popupProfileCloseButtonElement = popupProfileElement.querySelector('.popup__close');
const submitProfileButtonElement = popupProfileElement.querySelector('.popup__save-button');

const formProfileElement = popupProfileElement.querySelector('.popup__form');
const popupInputName = popupProfileElement.querySelector('.popup__input_type_name');
const popupInputJob = popupProfileElement.querySelector('.popup__input_type_job');

function closeProfilePopup() {
  closePopup(popupProfileElement);
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


const popupAddCardElement = document.querySelector('.popup-add-card');

const list_of_cards = document.querySelector(selectors.list_of_cards);
const card_template =document.querySelector(selectors.card_template);
const popupCardImagePreview = document.querySelector('.popup-card-image');
const popupCardImagePreviewCloseButtonElement = popupCardImagePreview.querySelector('.popup__close');


// Card adding popup
const popupAddCardCloseButtonElement = popupAddCardElement.querySelector('.popup__close');
const submitAddCardButtonElement = popupAddCardElement.querySelector('.popup__save-button');

function closeAddCardPopup() {
  closePopup(popupAddCardElement);
};


popupAddCardCloseButtonElement.addEventListener('click', closeAddCardPopup);


const addCardForm = popupAddCardElement.querySelector(selectors.add_card_form);
const cardTitleInput = popupAddCardElement.querySelector(selectors.card_title_input);
const cardName = popupAddCardElement.querySelector("input[name='card-title']");
const cardImgLink = popupAddCardElement.querySelector("input[name='image-link']");


popupProfileCloseButtonElement.addEventListener('click', closeProfilePopup);


function createCardTemplate(place_info) {
const cardTemplate = card_template.content.querySelector(selectors.card_item).cloneNode(true)

cardTemplate.querySelector(selectors.card_image_link).src = place_info.link
cardTemplate.querySelector(selectors.card_name).textContent = place_info.name
 
cardTemplate.querySelector(selectors.card_delete_button).addEventListener('click', () => {cardTemplate.remove();});
cardTemplate.querySelector(selectors.card_like_button).addEventListener('click', () => {setLike(cardTemplate);});
cardTemplate.querySelector(selectors.card_image_link).addEventListener('click', () => {openPopupCardImagePreview(place_info);});

return cardTemplate
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
  places_info.forEach((element) => {
    list_of_cards.prepend(createCardTemplate(element));
  });
}


function addCardSubmitHandler(evt) {
  evt.preventDefault();
  let place_info = {
    name: cardName.value,
    link: cardImgLink.value
  }
  
  const card_template = createCardTemplate(place_info)
  list_of_cards.prepend(card_template);

  closeAddCardPopup();
}

addDefaultCards();

// Card preview popup

const popupImage = popupCardImagePreview.querySelector('.popup__image');
const popupImageTitle = popupCardImagePreview.querySelector('.popup__image-title');


function closePopupCardImagePreview(event) {
  event.preventDefault();
  closePopup(popupCardImagePreview);
}

popupCardImagePreviewCloseButtonElement.addEventListener('click', closePopupCardImagePreview);