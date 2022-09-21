import {
    Popup
} from "./Popup.js";

export class PopupWithConfirmation extends Popup {

    constructor(popupSelector, submitHandler) {
        super(popupSelector);
        this._submitButton = this.popupSelector.querySelector('.popup__button-yes');
        this._submitHandler = submitHandler
    }

    setEventListeners() {
        super.setEventListeners();
        this._submitButton.addEventListener("click",
            this._submitHandler)
    }

    removeEventListeners() {
        super.removeEventListeners();
        this._submitButton.removeEventListener("click",
            this._submitHandler)
    }

    setSubmitHandler(func) {
        this._submitHandler = func
    }

}