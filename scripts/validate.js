const validationSelectors = {
    formElement: ".popup__form",
    cardTitleInput: ".popup__input_type_card-title",
    listOfCards: ".gallery",
    cardItem: ".gallery__item",
    cardName: ".gallery__title",
    cardImageLink: ".gallery__image",
    cardTemplate: ".gallery-template",
    cardDeleteButton: ".gallery__delete-item",
    cardLikeButton: ".gallery__like",
  };

const validationConfig = {
    formElement: validationSelectors.formElement,
    formInput: ".popup__input",
    formButton: ".popup__button",
    activeButtonClass: "popup__button_active",
    inputErrorClass: "popup__input_type_error",
    errorElement: "popup__input-error_message",
  }

//Show error if not valid
const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add("popup__input_type_error");
    errorElement.textContent = errorMessage;
    errorElement.classList.add("popup__input-error_message");
  };
 
//Hide error if valid
const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove("popup__input_type_error");
    errorElement.classList.remove("popup__input-error_message");
    errorElement.textContent = "";
  };

//Check validity
const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  };
 
// Event
const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
    const formButton = formElement.querySelector(".popup__button");
    toggleButtonState(inputList, formButton);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", function () {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, formButton);
      });
    });
  };
  
const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll(".popup__form"));
    formList.forEach((formElement) => {
      formElement.addEventListener("submit", function (evt) {
        evt.preventDefault();
      });
      setEventListeners(formElement);
    });
  };
  
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };
  

//Button behaviour
const activatePopupButton = (formButton) => {
    formButton.classList.add("popup__button_active");
    formButton.removeAttribute("disabled");
  };
  
const deactivatePopupButton = (formButton) => {
    formButton.classList.remove("popup__button_active");
    formButton.setAttribute("disabled", true);
  };
  
const toggleButtonState = (inputList, formButton) => {
    // Если есть хотя бы один невалидный инпут
    if (hasInvalidInput(inputList)) {
      // сделай кнопку неактивной
      deactivatePopupButton(formButton);
    } else {
      // иначе сделай кнопку активной
      activatePopupButton(formButton);
    }
  };

  

//Input line clear
function clearPopup() {
    const inputList = Array.from(document.querySelectorAll(".popup__input"));
    const spanList = [];
    inputList.forEach((inputElement) => {
      inputElement.classList.remove("popup__input_type_error");
      spanList.push(document.querySelector(`.${inputElement.id}-error`));
    });
    spanList.forEach((spanElement) => {
      spanElement.textContent = "";
    });
  }
  


enableValidation(validationConfig);
  