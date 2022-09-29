import '../pages/index.css';
import {
  FormValidator
} from '../components/FormValidator.js';
import {
  authToken,
  apiHost
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
  popupConfirmCardDeletion
} from "../utils/constants.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfoOperator } from '../components/UserInfoOperator.js';
import { Api } from '../components/Api.js';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation.js';

const apiCaller = new Api(apiHost, authToken);
//class elements creation (UserInfoOperator and Section)
const userInfoOperator = new UserInfoOperator({
  name: finalName,
  profession: finalJob
},
  profileAvatar)

const cardSetter = new Section(
  createCard,
  gallerySpace)

//create popups
const addCardPopup = new PopupWithForm(popupAddCardElement,
  addCardSubmitHandler);

const profilePopup = new PopupWithForm(popupProfileElement,
  editProfileSubmitHandler);

const avatarPopup = new PopupWithForm(popupAvatarEdit,
  editAvatarImageHandler);

const popupWithImage = new PopupWithImage(popupCardImagePreview);
const popupConfirmDeletion = new PopupWithConfirmation(
  popupConfirmCardDeletion);

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
  profilePopup.changeSubmitButtonText('Сохранение...');

  apiCaller.saveUser(userInfo)
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      profilePopup.changeSubmitButtonText('Сохранить')
    })
}

function addCardSubmitHandler(evt, placeInfo) {
  evt.preventDefault();
  addCardPopup.changeSubmitButtonText('Сохранение...')
  apiCaller.saveCard(placeInfo)
    .then((data) => {
      const placeInfoExt = {
        name: placeInfo.card_title,
        link: placeInfo.image_link,
        likes: [],
        _id: data._id,
        owner: { _id: apiCaller.userId }
      }

      cardSetter.addNewElementOnPage(cardSetter.renderer(placeInfoExt))

    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      addCardPopup.changeSubmitButtonText('Сохранить')
    })
}

function editAvatarImageHandler(evt, imageLink) {
  evt.preventDefault();
  userInfoOperator.setUserAvatar(imageLink.avatar_link)

  avatarPopup.changeSubmitButtonText('Сохранение...')

  apiCaller.postNewAvatar(imageLink)
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      avatarPopup.changeSubmitButtonText('Сохранить')
    })
}

//Listeners for open buttons
popupProfileButtonElement.addEventListener("click", openProfilePopup);
popupAddCardButtonElement.addEventListener("click", openAddCardPopup);
editAvatarButton.addEventListener("click", openEditAvatarPopup);

//class element Card creation
function createCard(item) {
  const card = new Card(
    item,
    apiCaller,
    () => {
      popupWithImage.openPopup({
        image: item.image_link,
        title: item.card_title
      })
    },
    () => {
      popupConfirmDeletion.setSubmitHandler(() => {
        apiCaller.deleteCard(item._id)
          .then(() => {
            card.deleteCard();
            popupConfirmDeletion.closePopup();
          })
          .catch((err) => {
            console.log(err);
          })
      });
      popupConfirmDeletion.openPopup();
    }
  );
  const cardElement = card.generateCard();
  return cardElement;
}

function drawCardsFromAPI() {
  Promise.all([apiCaller.getUser(), apiCaller.getAllCards()])
    .then((values) => {
      return values
    }
    )
    .then((values) => {
      const user = values[0]
      const cards = values[1]

      apiCaller.userId = user._id

      cardSetter.renderAllElements(cards);
      cardSetter.addElementsOnPage();
    })
    .catch((err) => {
      console.log(err);
    })
};

// Validation for input lines
const addCardValidator = new FormValidator(validationConfig, addCardForm);
addCardValidator.enableValidation();

const editProfileValidator = new FormValidator(validationConfig, editProfileForm);
editProfileValidator.enableValidation();

const editAvatarValidator = new FormValidator(validationConfig, newAvatarForm);
editAvatarValidator.enableValidation();

let userDefaultInfo = {};

function setDefaultPersonalInfo() {
  apiCaller.getUser()
    .then((data) => {
      userDefaultInfo = {
        name: data.name,
        profession: data.about
      }
      userInfoOperator.setUserInfo(userDefaultInfo);
      userInfoOperator.setUserAvatar(data.avatar)
    })
    .catch((err) => {
      console.log(err);
    })
}

setDefaultPersonalInfo();
drawCardsFromAPI();

