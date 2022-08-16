export class FormValidator {
    constructor(validationConfig) {
      
    }

    _showInputError() {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationConfig.errorElement);
    }

    _hideInputError() {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(validationConfig.inputErrorClass);
        errorElement.classList.remove(validationConfig.errorElement);
        errorElement.textContent = "";
    }

    _checkInputValidity() {
        if (!inputElement.validity.valid) {
            showInputError(formElement, inputElement, inputElement.validationMessage);
          } else {
            hideInputError(formElement, inputElement);
          }
    }

    _setEventListeners() {
        const inputList = Array.from(formElement.querySelectorAll(validationConfig.formInput));
        const formButton = formElement.querySelector(validationConfig.formButton);
        toggleButtonState(inputList, formButton);
        inputList.forEach((inputElement) => {
          inputElement.addEventListener("input", function () {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, formButton);
          });
        });
    }

    enableValidation() {
        const formList = Array.from(document.querySelectorAll(validationConfig.formElement));
        formList.forEach((formElement) => {
          formElement.addEventListener("submit", function (evt) {
            evt.preventDefault();
          });
          setEventListeners(formElement);
        });
    }

    toggleButtonState(inputList, formButton) {
        const activatePopupButton = (formButton) => {
            formButton.classList.add(validationConfig.activeButtonClass);
            formButton.removeAttribute("disabled");
          };
          
        const deactivatePopupButton = (formButton) => {
            formButton.classList.remove(validationConfig.activeButtonClass);
            formButton.setAttribute("disabled", true);
          };
          const hasInvalidInput = (inputList) => {
            return inputList.some((inputElement) => {
              return !inputElement.validity.valid;
            });
          };
            // Если есть хотя бы один невалидный инпут
            if (hasInvalidInput(inputList)) {
              // сделай кнопку неактивной
              deactivatePopupButton(formButton);
            } else {
              // иначе сделай кнопку активной
              activatePopupButton(formButton);
            }
    }

    clearPopup() {
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
}