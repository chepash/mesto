import { Popup } from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this.imgPopupImageElement = super._popupElement.querySelector(".popup__image");
    this.imgPopupCaption = super._popupElement.querySelector(".popup__image-caption");
  }

  open(cardName, cardPicSrc) {
    this.imgPopupImageElement.alt = cardName;
    this.imgPopupImageElement.src = cardPicSrc;
    this.imgPopupCaption.textContent = cardName;

    super._popupElement.classList.add("popup_opened");
    document.addEventListener("keydown", super._handleEscClose); //вешаем слушатель Esc
  }
}

export { PopupWithImage };
