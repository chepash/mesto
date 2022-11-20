export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  _handleEscClose = (e) => {
    if (e.key === "Escape") {
      this.close();
    }
  };

  //функция закрытия popup кликая на Overlay (без сохранения)
  _handlePopupOverlayClick = (e) => {
    if (e.currentTarget == e.target) {
      this.close();
    }
  };

  setEventListeners() {
    const closeBtn = this._popup.querySelector(".button_type_close");
    closeBtn.addEventListener("click", () => {
      this.close();
    });
    this._popup.addEventListener("click", this._handlePopupOverlayClick);
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose); //вешаем слушатель Esc
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose); //снимаем слушатель Esc
  }
}
