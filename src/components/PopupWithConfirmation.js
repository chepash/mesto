import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleConfirm) {
    super(popupSelector);
    this._handleConfirm = handleConfirm;
    this.form = this._popup.querySelector(".form");
    this._submitButton = this._popup.querySelector(".button_type_submit");

    this._submitButtonOriginalText = this._submitButton.textContent;
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = "Сохранение...";
    } else if (!isLoading) {
      this._submitButton.textContent = this._submitButtonOriginalText;
    }
  }

  _handleSubmitEvent(e) {
    e.preventDefault();
    this._handleConfirm(this.cardId, this.deleteCurrentDomElement);
  }

  keepCurrentCardOptions(cardId, deleteCurrentDomElement) {
    this.cardId = cardId;
    this.deleteCurrentDomElement = deleteCurrentDomElement;
  }

  deleteCurrentCardOptions() {
    this.cardId = null;
    this.deleteCurrentDomElement = null;
  }

  setEventListeners() {
    super.setEventListeners();
    this.form.addEventListener("submit", this._handleSubmitEvent.bind(this));
  }
}
