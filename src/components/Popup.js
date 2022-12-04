export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);

    //привязываем this только один раз в конструкторе, чтобы при удалении слушателя
    //использовать точно такуюже ссылку на колбэк функцию
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  _handleEscClose(e) {
    if (e.key === "Escape") {
      this.close();
    }
  }

  //функция закрытия popup кликая на Overlay (без сохранения)
  _handlePopupOverlayClick(e) {
    if (e.currentTarget == e.target) {
      this.close();
    }
  }

  _handlePopubCloseBtnClick() {
    this.close();
  }

  setEventListeners() {
    const closeBtn = this._popup.querySelector(".button_type_close");
    closeBtn.addEventListener("click", this._handlePopubCloseBtnClick.bind(this));
    this._popup.addEventListener("click", this._handlePopupOverlayClick.bind(this));
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose); //вешаем слушатель Esc. this здесь привязывать нельзя. bind(this) !== bind(this)
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose); //снимаем слушатель Esc
  }
}
