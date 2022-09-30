import {
  Popup
} from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this.submitHandler = submitHandler;
    this.submiting = this.submiting.bind(this)
    this.inputName = this.popupSelector.querySelector(".popup__input_type_name");
    this.inputJob = this.popupSelector.querySelector(".popup__input_type_job");
    this.form = this.popupSelector.querySelector(".popup__form");
    this.submitButton = this.popupSelector.querySelector('.popup__button');
    this._inputList = this.popupSelector.querySelectorAll('.popup__input');
    this.closePopup = this.closePopup.bind(this);
  };

  _getInputValues() {
    const _formValues = {};
    this._inputList.forEach(input => {
      _formValues[input.name] = input.value;
    });

    return _formValues;
  }

  setInputValues(values) {
    this._inputList.forEach((input) => {
      input.value = values[input.name];
    });
  }

  submiting(evt) {
    const inputValues = this._getInputValues()
    this.submitHandler(evt, inputValues)
  }

  changeSubmitButtonText(text) {
    this.submitButton.textContent = text
  }

  setEventListeners() {
    super.setEventListeners();
    this.popupSelector.addEventListener("submit",
      this.submiting)
  }

  removeEventListeners() {
    super.removeEventListeners()
    this.popupSelector.removeEventListener("submit",
      this.submiting);
  }

  closePopup() {
    this.form.reset();
    super.closePopup();
  }
}