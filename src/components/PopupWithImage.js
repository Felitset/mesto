import {
  Popup
} from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this.popup = popupSelector.querySelector(".popup__image");
    this.popupTitle = popupSelector.querySelector(".popup__image-title");
  };

  openPopup(data) {
    this._image = data.image;
    this._title = data.title;
    this.popup.src = this._image;
    this.popupTitle.textContent = this._title;
    this.popup.alt = this._title;

    super.openPopup();
  }
}