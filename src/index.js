import {
    FormValidator
  } from '../scripts/FormValidator.js';
import {
    Card
  } from "../scripts/Card.js";
import {
    selectors, 
    validationConfig
  } from "../utils/constants.js";
import {
    placesInfo
  } from "../scripts/card-array.js";
import {
    Section
  } from "../scripts/Section.js";
import {
    PopupWithImage
  } from "../scripts/PopupWithImage.js";
import { 
    PopupWithForm 
  } from '../scripts/PopupWithForm.js';
import { 
    UserInfoOperator 
  } from '../scripts/UserInfo.js';
  
  const popupProfileElement = document.querySelector(".popup-profile-edit");
  const editProfileForm = popupProfileElement.querySelector(selectors.popupInputForm);
  
  const popupAddCardElement = document.querySelector(".popup-add-card");
  const popupCardImagePreview = document.querySelector(".popup-card-image");
  const popupProfileButtonElement = document.querySelector(
    ".profile__edit-button"
  );
  const popupAddCardButtonElement = document.querySelector(
    ".profile__add-button"
  );
  
  const addCardForm = popupAddCardElement.querySelector(selectors.popupInputForm);
  
  const cardName = popupAddCardElement.querySelector("input[name='card-title']");
  const cardImgLink = popupAddCardElement.querySelector(
    "input[name='image-link']"
  );
  const nameInput = popupProfileElement.querySelector("input[name='name']");
  const jobInput = popupProfileElement.querySelector("input[name='profession']");

  const finalName = document.querySelector(".profile__name");
  const finalJob = document.querySelector(".profile__description");
  
  const gallerySpace = document.querySelector('.gallery');
  
  //Popup open function
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
  
  //Popup submit function
  
  function editProfileSubmitHandler(evt) {
    evt.preventDefault();
    userInfoOperator.setUserInfo({name:nameInput.value,
                                job:jobInput.value})
  }
  
  function addCardSubmitHandler(evt) {
    evt.preventDefault();
    const placeInfo = {
        name: cardName.value,
        link: cardImgLink.value,
    };
    debugger
    new Section({items: [placeInfo], renderer: createCard},
        gallerySpace).createAllElements()
  }
  
  //Edit profile popup
  popupProfileButtonElement.addEventListener("click", openProfilePopup);

  //Add card popup
  popupAddCardButtonElement.addEventListener("click", openAddCardPopup);

  function createCard(item) {
    const popupWithImage = new PopupWithImage({image:item.link,
                            title:item.name},
                            popupCardImagePreview)
    const card = new Card(item.name, 
                          item.link, 
                          ()=>{popupWithImage.openPopup()}
                         )
    ;
    const cardElement = card.generateCard();
    return cardElement;
    }
  const userInfoOperator = new UserInfoOperator({name:finalName,
                                job:finalJob})
  new Section({items: placesInfo, renderer: createCard},
                gallerySpace).createAllElements()
 

  // Validation for input lines
  const addCardValidator = new FormValidator(validationConfig, addCardForm);
  addCardValidator.enableValidation();
  
  const editProfileValidator = new FormValidator(validationConfig, editProfileForm);
  editProfileValidator.enableValidation();