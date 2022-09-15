import '../pages/index.css';
import {
  FormValidator
} from '../components/FormValidator.js';
import {
  authToken,
  cardUrl,
  userUrl
} from "../utils/api_config";
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
  gallerySpace,
  popupAvatarEdit,
  newAvatarForm,
  editAvatarButton,
  profileAvatar,
  avatarImageInput
} from "../utils/constants.js";
import {
  placesInfo
} from "../utils/card-array.js";
import {
  Section
} from "../components/Section.js";
import {
  Popup
} from "../components/Popup.js";
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

const avatarPopup = new PopupWithForm(popupAvatarEdit,
  editAvatarImageHandler,
  editAvatarValidator);

const popupWithImage = new PopupWithImage(popupCardImagePreview);

const popupConfirmDeletion = new Popup( )

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

function openEditAvatarPopup() {
  avatarPopup.openPopup();
  avatarPopup.form.reset();
  editAvatarValidator.clearInputErrors();
  editAvatarValidator.deactivateSubmitButton();
}

//submit popups
function editProfileSubmitHandler(evt, userInfo) {
  evt.preventDefault();
  userInfoOperator.setUserInfo(userInfo);
  fetch(userUrl, {
    method: 'PATCH',
    headers: {
      'authorization': authToken,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: userInfo.name,
      about: userInfo.profession
    })
  })
}

function addCardSubmitHandler(evt, placeInfo) {
  evt.preventDefault();
  cardSetter.addItem(cardSetter.renderer(placeInfo));
  fetch(cardUrl, {
    method: 'POST',
    headers: {
      'authorization': authToken,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: placeInfo.card_title,
      link: placeInfo.image_link
    })
  })
}

function editAvatarImageHandler(evt, imageLink) {
  evt.preventDefault();
  profileAvatar.src = imageLink.avatar_link;
}

//Listeners for open buttons
popupProfileButtonElement.addEventListener("click", openProfilePopup);
popupAddCardButtonElement.addEventListener("click", openAddCardPopup);
editAvatarButton.addEventListener("click", openEditAvatarPopup);


//class element Card creation
function createCard(item) {
  const card = new Card(item.card_title,
    item.image_link,
    () => {
      popupWithImage.openPopup({
        image: item.image_link,
        title: item.card_title
      })
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

var cardSetter;
function drawCardsFromAPI() {
  fetch(cardUrl, {
    method: 'GET',
    headers: {
      'authorization': authToken
    }
  }).then((res) => {
    return res.json();
  })
    .then((data) => {
      let placesInfo = [];
      data.forEach((singleItem) => {
        placesInfo.push({
          card_title: singleItem.name,
          image_link: singleItem.link
        });
      })
      cardSetter = new Section({
        items: placesInfo,
        renderer: createCard
      },
        gallerySpace)
        return cardSetter}
    )
    .then((cardSetter)=>{
      cardSetter.createAllElements();
    })
  };

// const cardSetter = new Section({
//   items: placesInfo,
//   renderer: createCard
// },
//   gallerySpace)
drawCardsFromAPI();
// debugger
// cardSetter.createAllElements();

// Validation for input lines
const addCardValidator = new FormValidator(validationConfig, addCardForm);
addCardValidator.enableValidation();

const editProfileValidator = new FormValidator(validationConfig, editProfileForm);
editProfileValidator.enableValidation();

const editAvatarValidator = new FormValidator(validationConfig, newAvatarForm);
editAvatarValidator.enableValidation();

let userDefaultInfo = {};

function setDefaultNameProfession() {
  fetch(userUrl, {
    method: 'GET',
    headers: {
      'authorization': authToken
    }
  }).then((res) => {
    return res.json();
  })
    .then((data) => {
      userDefaultInfo = {
        name: data.name,
        profession: data.about
      }
      userInfoOperator.setUserInfo(userDefaultInfo);
    })
}

setDefaultNameProfession()


