import {
  FormValidator
} from '../components/FormValidator.js';
import {
  Card
} from "../components/Card.js";
import {
  selectors,
  validationConfig,
  popupProfileElement,
  editProfileForm,
  popupAddCardElement,
  popupCardImagePreview,
  popupProfileButtonElement,
  popupAddCardButtonElement,
  addCardForm,
  cardName,
  cardImgLink,
  nameInput,
  jobInput,
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
} from '../components/UserInfo.js';

//Popup open (create class element)
function openAddCardPopup() {
  const addCardPopup = new PopupWithForm(popupAddCardElement,
      addCardSubmitHandler,
      addCardValidator)
  addCardPopup.openPopup()
  addCardPopup.form.reset();
}

function openProfilePopup() {
  const profilePopup = new PopupWithForm(popupProfileElement,
      editProfileSubmitHandler,
      editProfileValidator)
  profilePopup.openPopup()
  const userInfo = userInfoOperator.getUserInfo()
  profilePopup.inputName.value = userInfo.name
  profilePopup.inputJob.value = userInfo.job
}

//Popup submit
function editProfileSubmitHandler(evt) {
  evt.preventDefault();

  userInfoOperator.setUserInfo({
      name: nameInput.value,
      job: jobInput.value
  })
}

function addCardSubmitHandler(evt) {
  evt.preventDefault();
  const placeInfo = {
      name: cardName.value,
      link: cardImgLink.value,
  };
  new Section({
          items: [placeInfo],
          renderer: createCard
      },
      gallerySpace).createAllElements()
}

//Edit profile popup
popupProfileButtonElement.addEventListener("click", openProfilePopup);

//Add card popup
popupAddCardButtonElement.addEventListener("click", openAddCardPopup);

function createCard(item) {
  const popupWithImage = new PopupWithImage({
          image: item.link,
          title: item.name
      },
      popupCardImagePreview)
  const card = new Card(item.name,
      item.link,
      () => {
          popupWithImage.openPopup()
      }
  );
  const cardElement = card.generateCard();
  return cardElement;
}

const userInfoOperator = new UserInfoOperator({
  name: finalName,
  job: finalJob
})

new Section({
      items: placesInfo,
      renderer: createCard
  },
  gallerySpace).createAllElements()

// Validation for input lines
const addCardValidator = new FormValidator(validationConfig, addCardForm);
addCardValidator.enableValidation();

const editProfileValidator = new FormValidator(validationConfig, editProfileForm);
editProfileValidator.enableValidation();