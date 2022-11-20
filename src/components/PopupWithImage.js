import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this.imgPopupImageElement = this._popup.querySelector(".popup__image");
    this.imgPopupCaption = this._popup.querySelector(".popup__image-caption");
  }

  open(cardName, cardPicSrc) {
    this.imgPopupImageElement.alt = cardName;
    this.imgPopupImageElement.src = cardPicSrc;
    this.imgPopupCaption.textContent = cardName;

    super.open();
  }
}
