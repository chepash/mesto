class FormValidator {
  constructor(validationConfig, form) {
    this._validationConfig = validationConfig;
    this._form = form;

    this._submitBtn = this._form.querySelector(this._validationConfig.submitButtonSelector);
  }

  //показываем красные ошибки у инпута
  _showInputError = (inputElement, errorMessage) => {
    this._errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._validationConfig.inputErrorClass);
    this._errorElement.classList.add(this._validationConfig.errorClass);
    this._errorElement.textContent = errorMessage;
  };

  //убираем красные ошибки у инпута
  _hideInputError = (inputElement) => {
    this._errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._validationConfig.inputErrorClass);
    this._errorElement.classList.remove(this._validationConfig.errorClass);
    this._errorElement.textContent = "";
  };

  //проверяем валидность инпута
  _checkInputValidity = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  //обработчик события input и полях ввода
  _handleInput = (inputElement) => {
    this._checkInputValidity(inputElement);
    this.setSubmitBtnState();
  };

  //Вешаем слушатели события Input на все поля ввода для проверяем их валидности и установки валидности кнопки submit
  _setEventListeners = () => {
    this._inputList = Array.from(this._form.querySelectorAll(this._validationConfig.inputSelector));
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._handleInput(inputElement);
      });
    });
  };

  //функция очистки всех сообщений формы об ошибках заполнения инпутов
  clearErrorMessages = () => {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  };

  //функция установки состояния кнопки submit
  setSubmitBtnState = () => {
    if (!this._form.checkValidity()) {
      this._submitBtn.setAttribute("disabled", true);
      this._submitBtn.classList.add(this._validationConfig.inactiveButtonClass);
    } else {
      this._submitBtn.removeAttribute("disabled");
      this._submitBtn.classList.remove(this._validationConfig.inactiveButtonClass);
    }
  };

  //Функция валидации. Ищем форму в попапе, и вешает слушатели submit на неё и слушатели input на элементы формы
  enableValidation = () => {
    this._setEventListeners();
  };
}

export { FormValidator };
