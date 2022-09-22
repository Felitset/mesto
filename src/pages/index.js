import '../pages/index.css';
import {
  FormValidator
} from '../components/FormValidator.js';
import {
  userId
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
import { ApiWorker } from '../components/ApiWorker';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation.js'

const apiCaller = new ApiWorker();
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
    .then(() => {
      profilePopup.changeSubmitButtonText('Сохранить')
    })
}

function addCardSubmitHandler(evt, placeInfo) {
  evt.preventDefault();
  addCardPopup.changeSubmitButtonText('Сохранение...')
  let savedCard = apiCaller.saveCard(placeInfo)
  savedCard.then((res) => {
    return res.json();
  }).then((data) => {
    let placeInfoExt = Object.assign({}, placeInfo, {
      likes_number: 0,
      card_id: data._id,
      users_like_flag: 0,
      owner_id: userId
    })
    cardSetter.addItem(cardSetter.renderer(placeInfoExt))

  })
    .then(() => {
      addCardPopup.changeSubmitButtonText('Сохранить')
    })
}

function editAvatarImageHandler(evt, imageLink) {
  evt.preventDefault();
  profileAvatar.src = imageLink.avatar_link;
  avatarPopup.changeSubmitButtonText('Сохранение...')

  apiCaller.postNewAvatar(imageLink)
    .then(() => {
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
        popupConfirmDeletion.changeSubmitButtonText('Удаление...');
        apiCaller.deleteCard(item.card_id)
          .then(() => {
            card.deleteCard();
            popupConfirmDeletion.closePopup();
          })
          .then(() => {
            popupConfirmDeletion.changeSubmitButtonText('Да');
          })
      });
      popupConfirmDeletion.openPopup();
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
  apiCaller.getAllCards()
    .then((res) => {
      return res.json();
    })
    .then((cards) => {
      let placesInfo = [];
      cards.forEach((singleItem) => {
        let user_like_flag = 0;
        singleItem.likes.forEach((like) => {
          searchMyLike: if (like._id == userId) {
            user_like_flag = 1;
            break searchMyLike;
          };
        });

        placesInfo.push({
          card_title: singleItem.name,
          image_link: singleItem.link,
          likes_number: singleItem.likes.length,
          card_id: singleItem._id,
          user_like_flag: user_like_flag,
          owner_id: singleItem.owner._id
        });
      })
      cardSetter = new Section({
        items: placesInfo,
        renderer: createCard
      },
        gallerySpace)
      return cardSetter
    }
    )
    .then((cardSetter) => {
      cardSetter.createAllElements();
    })
};

drawCardsFromAPI();

// Validation for input lines
const addCardValidator = new FormValidator(validationConfig, addCardForm);
addCardValidator.enableValidation();

const editProfileValidator = new FormValidator(validationConfig, editProfileForm);
editProfileValidator.enableValidation();

const editAvatarValidator = new FormValidator(validationConfig, newAvatarForm);
editAvatarValidator.enableValidation();

let userDefaultInfo = {};

function setDefaultNameProfession() {
  apiCaller.getUser()
    .then((res) => {
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


