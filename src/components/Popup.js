export class Popup {
    constructor(popupSelector) {
      this.popupSelector = popupSelector
      this.closeButtonElement = this.popupSelector.querySelector(".popup__close");
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
        document.addEventListener("keydown", (evt)=>{this._handleEscClose(evt);});
        this.closeButtonElement.addEventListener('click', ()=>{this.closePopup();});
        this.popupSelector.addEventListener('click',(evt)=>{this._handleOverlayClose(evt);})
       
    }

    removeEventListeners() {
        document.removeEventListener("keydown", (evt)=>{this._handleEscClose(evt);});
        this.closeButtonElement.removeEventListener('click', ()=>{this.closePopup();});
        this.popupSelector.removeEventListener('click',()=>{this._handleOverlayClose();})
        
    }
}