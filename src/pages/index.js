import '../pages/index.css';
import {
  FormValidator
} from '../components/FormValidator.js';
import {
  Card
} from "../components/Card.js";
import {
  validationConfig,
  popupProfileElement,
  editProfileForm,
  popupAddCardElement,
  popupCardImagePreview,
  popupProfileButtonElement,
  popupAddCardButtonElement,
  addCardForm,
  finalName,
  finalJob,
  gallerySpace
} from "../utils/constants.js";
import {
  placesInfo
} from "../utils/card-array.js";
import {
  Section
} from "../components/Section.js";
import {
  PopupWithImage
} from "../components/PopupWithImage.js";
import {
  PopupWithForm
} from '../components/PopupWithForm.js';
import {
  UserInfoOperator
} from '../components/UserInfoOperator.js';

//create popups
const addCardPopup = new PopupWithForm(popupAddCardElement,
  addCardSubmitHandler,
  addCardValidator);

const profilePopup = new PopupWithForm(popupProfileElement,
    editProfileSubmitHandler,
    editProfileValidator);

//open popups
function openAddCardPopup() {
  addCardPopup.openPopup();
  addCardPopup.form.reset();
  addCardValidator.clearInputErrors();
  addCardValidator.deactivateSubmitButton();
}

function openProfilePopup() {
  profilePopup.openPopup();
  const userInfo = userInfoOperator.getUserInfo();
  profilePopup.setInputValues(userInfo);
  editProfileValidator.clearInputErrors();
  editProfileValidator.deactivateSubmitButton();
}

//submit popups
function editProfileSubmitHandler(evt, userInfo) {
  evt.preventDefault();
  userInfoOperator.setUserInfo(userInfo);
}

function addCardSubmitHandler(evt, placeInfo) {
  evt.preventDefault();
  cardSetter.addItem(cardSetter.renderer(placeInfo));
}

//Listeners for open buttons
popupProfileButtonElement.addEventListener("click", openProfilePopup);
popupAddCardButtonElement.addEventListener("click", openAddCardPopup);


//class element Card creation
function createCard(item) {
  const popupWithImage = new PopupWithImage({
          image: item.image_link,
          title: item.card_title
      },
      popupCardImagePreview)
  const card = new Card(item.card_title,
      item.image_link,
      () => {
          popupWithImage.openPopup()
      }
  );
  const cardElement = card.generateCard();
  return cardElement;
}

//class elements creation (UserInfoOperator and Section)
const userInfoOperator = new UserInfoOperator({
  name: finalName,
  profession: finalJob
})

const cardSetter = new Section({
      items: placesInfo,
      renderer: createCard
  },
  gallerySpace)
  
cardSetter.createAllElements()

// Validation for input lines
const addCardValidator = new FormValidator(validationConfig, addCardForm);
addCardValidator.enableValidation();

const editProfileValidator = new FormValidator(validationConfig, editProfileForm);
editProfileValidator.enableValidation();