import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitFormFunction) {
    super(popupSelector);

    this.submitFormFunction = submitFormFunction;

    this.form = this._popup.querySelector(".form");

    this._inputList = this.form.querySelectorAll(".form__input");
    this._closeButton = this._popup.querySelector(".button_type_close");
    this._submitButton = this.form.querySelector(".button_type_submit");

    this._submitButtonOriginalText = this._submitButton.textContent;
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = "Сохранение...";
    } else {
      this._submitButton.textContent = this._submitButtonOriginalText;
    }
  }

  _getInputValues() {
    const inputsValues = {};
    this._inputList.forEach((input) => {
      inputsValues[input.id] = input.value;
    });
    return inputsValues;
  }

  _handleSubmitEvent(e) {
    e.preventDefault();
    this.submitFormFunction(this._getInputValues());
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this.form.addEventListener("submit", this._handleSubmitEvent.bind(this));
  }

  close() {
    super.close();
    this.form.reset();
  }
}
