
const validationConfig = {
    formElement: ".popup__form",
    formInput: ".popup__input",
    formButton: ".popup__button",
    activeButtonClass: "popup__button_active",
    inputErrorClass: "popup__input_type_error",
    errorElement: "popup__input-error_message"
  }

//Show error if not valid
const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationConfig.errorElement);
  };
 
//Hide error if valid
const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validationConfig.inputErrorClass);
    errorElement.classList.remove(validationConfig.errorElement);
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
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.formInput));
    const formButton = formElement.querySelector(validationConfig.formButton);
    toggleButtonState(inputList, formButton);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", function () {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, formButton);
      });
    });
  };
  
const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll(validationConfig.formElement));
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
    formButton.classList.add(validationConfig.activeButtonClass);
    formButton.removeAttribute("disabled");
  };
  
const deactivatePopupButton = (formButton) => {
    formButton.classList.remove(validationConfig.activeButtonClass);
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
    const inputList = Array.from(document.querySelectorAll(validationConfig.formInput));
    const spanList = [];
    inputList.forEach((inputElement) => {
      inputElement.classList.remove(validationConfig.inputErrorClass);
      spanList.push(document.querySelector(`.${inputElement.id}-error`));
    });
    spanList.forEach((spanElement) => {
      spanElement.textContent = "";
    });
  }
  


enableValidation(validationConfig);
  