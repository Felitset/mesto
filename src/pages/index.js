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
  profileAvatar
} from "../utils/constants.js";
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
import { ApiWorker } from '../components/ApiWorker';

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

// const popupConfirmDeletion = new PopupWithConfirmation()

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

export function openConfirmationPopup() {
  popupConfirmDeletion.openPopup();
}

//submit popups
function editProfileSubmitHandler(evt, userInfo) {
  evt.preventDefault();
  userInfoOperator.setUserInfo(userInfo);
  apiCaller.saveUser(userInfo)

}

function addCardSubmitHandler(evt, placeInfo) {
  evt.preventDefault();

  let savedCard = apiCaller.saveCard(placeInfo)
  savedCard.then((res) => {
    return res.json();
  }).then((data) => {
    let placeInfoExt = Object.assign({}, placeInfo, {
      likes_number: 0,
      card_id: data._id,
      users_like_flag: 0
    });
    cardSetter.addItem(cardSetter.renderer(placeInfoExt));
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
  const card = new Card(
    item.card_title,
    item.image_link,
    item.likes_number,
    item.card_id,
    item.user_like_flag,
    item.owner_id,
    apiCaller,
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
  apiCaller.getAllCards()
    .then((res) => {
      return res.json();
    })
    .then((cards) => {
      let placesInfo = []; // объявляем список элементов для создания карточек
      cards.forEach((singleItem) => { //перебираем элементы из ответа
        let user_like_flag = 0;     // определяем значение по уморчанию для 
        singleItem.likes.forEach((like) => {  // перебираем все лайки для карточки
          searchMyLike: if (like._id == userId) { // в поисках нашего лайка
            user_like_flag = 1;   // если наш лайк найден меняем флаг
            break searchMyLike;   // останавливаем цикл
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
      // debugger
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


