import {
    Popup
  } from "./Popup.js";
  
export class PopupWithForm extends Popup {
    constructor(popupSelector, submitActor, formValidator) {
        super(popupSelector);
        this.submitActor = submitActor;
        this.formValidator = formValidator

        this.inputName = this.popupSelector.querySelector(
            ".popup__input_type_name"
          );
        this.inputJob = this.popupSelector.querySelector(
            ".popup__input_type_job"
          );
        this.form = this.popupSelector.querySelector(".popup__form");
        this.submitButton = this.popupSelector.querySelector('.popup__button');
        
    };

    setEventListeners() {
        super.setEventListeners()
        this.popupSelector.addEventListener("submit", (evt) => {
            this.submitActor(evt);
            this.closePopup();});
    }

    removeEventListeners() {
        super.removeEventListeners()
        this.popupSelector.removeEventListener("submit", (evt) => {
            this.submitActor(evt);
            this.closePopup();});
    }

   closePopup() {
    super.closePopup();
   }
}