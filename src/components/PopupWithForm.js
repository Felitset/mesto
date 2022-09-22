import {
  Popup
} from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler, formValidator) {
    super(popupSelector);
    this.submitHandler = submitHandler;
    this.submiting = this.submiting.bind(this)
    this.formValidator = formValidator;
    this.inputName = this.popupSelector.querySelector(
      ".popup__input_type_name"
    );
    this.inputJob = this.popupSelector.querySelector(
      ".popup__input_type_job"
    );
    this.form = this.popupSelector.querySelector(".popup__form");
    this.submitButton = this.popupSelector.querySelector('.popup__button');
    this.closePopup = this.closePopup.bind(this);
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

  setEventListeners() {
    super.setEventListeners();
    this.popupSelector.addEventListener("submit",
      this.submiting)

    this.popupSelector.addEventListener("submit",
      this.closePopup)
  }

  removeEventListeners() {
    super.removeEventListeners()
    this.popupSelector.removeEventListener("submit",
      this.submiting);

    this.popupSelector.removeEventListener("submit",
      this.closePopup)
  }

  closePopup() {
    this.form.reset();
    super.closePopup();
  }
}