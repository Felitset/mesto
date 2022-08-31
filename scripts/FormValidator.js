export class FormValidator {
  constructor(validationConfig, formType) {
      this.validationConfig = validationConfig;
      this.formType = formType;
      this.inputList = Array.from(this.formType.querySelectorAll(this.validationConfig.formInput));
      this.formButton = this.formType.querySelector(this.validationConfig.formButton);

  }

  _showInputError(inputElement, errorMessage) {
      const errorElement = this.formType.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.add(this.validationConfig.inputErrorClass);
      errorElement.textContent = errorMessage;
      errorElement.classList.add(this.validationConfig.errorElement);
  }

  _hideInputError(inputElement) {
      const errorElement = this.formType.querySelector(`.${inputElement.id}-error`);
      inputElement.classList.remove(this.validationConfig.inputErrorClass);
      errorElement.classList.remove(this.validationConfig.errorElement);
      errorElement.textContent = "";
  }

  _checkInputValidity(inputElement) {
      if (!inputElement.validity.valid) {
          this._showInputError(inputElement, inputElement.validationMessage);
      } else {
          this._hideInputError(inputElement);
      }
  }

  _setEventListeners() {
      this._toggleButtonState();
      this.inputList.forEach((inputElement) => {
          inputElement.addEventListener("input", () => {
              this._checkInputValidity(inputElement);
              this._toggleButtonState();
          });
      });
  }

  enableValidation() {
      this.formType.addEventListener("submit", function(evt) {
          evt.preventDefault();
      });
      this._setEventListeners(this.formType);
  }

  _activatePopupButton() {
      this.formButton.classList.add(this.validationConfig.activeButtonClass);
      this.formButton.removeAttribute("disabled");
  };

  deactivateSubmitButton() {
      this.formButton.classList.remove(this.validationConfig.activeButtonClass);
      this.formButton.setAttribute("disabled", true);
  };

  _hasInvalidInput() {
      return this.inputList.some((inputElement) => {
          return !inputElement.validity.valid;
      });
  };

  _toggleButtonState() {
      if (this._hasInvalidInput()) {
          this.deactivateSubmitButton();
      } else {
          this._activatePopupButton();
      }
  }

  clearInputErrors() {
      const inputList = Array.from(this.formType.querySelectorAll(this.validationConfig.formInput));
      const spanList = [];
      inputList.forEach((inputElement) => {
          inputElement.classList.remove(this.validationConfig.inputErrorClass);
          spanList.push(document.querySelector(`.${inputElement.id}-error`));
      });
      spanList.forEach((spanElement) => {
          spanElement.textContent = "";
      });
  }
}