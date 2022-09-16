export class Popup {
    constructor(popupSelector) {
      this.popupSelector = popupSelector;
      this.closeButtonElement = this.popupSelector.querySelector(".popup__close");
      this._handleEscClose = this._handleEscClose.bind(this);
      this._handleOverlayClose = this._handleOverlayClose.bind(this);
      this.closePopup = this.closePopup.bind(this);
      this.yesButton = this.popupSelector.querySelector(".popup__button-yes");
    };

    openPopup () {
        this.popupSelector.classList.add("popup_is-opened");
        document.addEventListener('keydown', this._handleEscClose);
        this.setEventListeners();
    };

    closePopup () {
        this.popupSelector.classList.remove("popup_is-opened");
        document.removeEventListener('keydown', this._handleEscClose);
        this.removeEventListeners();
    };

    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            this.closePopup();
        }
    }

    _handleOverlayClose(evt) {
        if (
            evt.target.querySelector(".popup__transparent-container") ||
            evt.target.querySelector(".popup__container")
        ) {
        this.closePopup();
        };
      }

deleteCardfunction() {
        document.querySelector(".gallery__item").remove();
}

    setEventListeners() {
        this.closeButtonElement.addEventListener('click', this.closePopup);
        this.popupSelector.addEventListener('click', this._handleOverlayClose);
    }

    removeEventListeners() {
        this.closeButtonElement.removeEventListener('click', this.closePopup);
        this.popupSelector.removeEventListener('click', this._handleOverlayClose);
    }
}