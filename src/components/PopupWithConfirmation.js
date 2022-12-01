import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this.form = this._popup.querySelector(".form");
    this._closeButton = this._popup.querySelector(".button_type_close");
    this._submitButton = this._popup.querySelector(".button_type_submit");

    this._promise = null;
  }

  _handleEscClose(e) {
    super._handleEscClose(e);

    if (this._promise !== null) {
      this._resolve(false);
      this._promise = null;
    }
  }

  _handlePopubCloseBtnClick() {
    super._handlePopubCloseBtnClick();

    if (this._promise !== null) {
      this._resolve(false);
      this._promise = null;
    }
  }

  _handlePopupOverlayClick(e) {
    if (e.currentTarget == e.target) {
      if (this._promise !== null) {
        this._resolve(false);
        this._promise = null;
      }
      super.close();
    }
  }

  _handleSubmitEvent(e) {
    e.preventDefault();

    if (this._promise !== null) {
      this._resolve(true);
      this._promise = null;
    }

    super.close();
  }

  waitUntilClosed() {
    if (this._promise == null) {
      this._promise = new Promise((resolve, reject) => {
        this._resolve = resolve;
      });
    }
    return this._promise;
  }

  setEventListeners() {
    super.setEventListeners();
    this.form.addEventListener("submit", this._handleSubmitEvent.bind(this));
  }
}
