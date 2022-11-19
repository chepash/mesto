import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitFormFunction) {
    super(popupSelector);
    this.submitFormFunction = submitFormFunction;

    this.form = this._popup.querySelector(".form");
  }

  _getInputValues() {
    this._inputs = this.form.querySelectorAll(".form__input");
    const inputsValues = {};
    this._inputs.forEach((input) => {
      inputsValues[input.id] = input.value;
    });
    return inputsValues;
  }

  _handleSubmitEvent(e) {
    e.preventDefault();
    this.submitFormFunction(this._getInputValues());
    this.close();
  }

  setEventListeners() {
    const closeBtn = this._popup.querySelector(".button_type_close");
    closeBtn.addEventListener("click", () => {
      this.close();
    });
    this._popup.addEventListener("click", this._handlePopupOverlayClick);
    this.form.addEventListener("submit", this._handleSubmitEvent.bind(this));
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose); //снимаем слушатель Esc
    this.form.reset();
  }
}
