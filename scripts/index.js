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