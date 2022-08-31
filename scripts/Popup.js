export class Popup {
    constructor(popupSelector) {
      this.popupSelector = popupSelector
      this.closeButtonElement = document.querySelector(".popup__close");
    };

    openPopup () {
        this.popupSelector.classList.add("popup_is-opened");
        this.setEventListeners();
    };

    closePopup () {
        this.popupSelector.classList.remove("popup_is-opened");
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

    setEventListeners() {
        this.closeButtonElement.addEventListener('click', () => {this.closePopup();});
        this.popupSelector.addEventListener('click',(evt)=>{this._handleOverlayClose(evt);})
        document.addEventListener("keydown", (evt)=>{this._handleEscClose(evt);});
    }

    removeEventListeners() {
        this.closeButtonElement.removeEventListener('click', () => {this.closePopup();});
        this.popupSelector.removeEventListener('click',()=>{this._handleOverlayClose();})
        document.removeEventListener("keydown", (evt)=>{this._handleEscClose(evt);});
    }
}