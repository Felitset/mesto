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

  list_of_cards.prepend(template);
}

function setLike(template) {
  template.querySelector('.gallery__like').classList.toggle('gallery__like_status_active');
}

function addDefaultCards() {
  const places_info = [
    {
      name: 'Аргентина',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Австралия',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Индонезия, о. Бали',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Исландия',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Россия, Сибирь',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Новая Зеландия',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
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
// function addEventListeners() {
//     addCardForm.addEventListener('submit', function(event) {
//         event.preventDefault();
//         addCardSubmitHandler();
//     })
//   }
// addEventListeners();
addDefaultCards();