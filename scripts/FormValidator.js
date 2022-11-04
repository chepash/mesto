const validationConfig = {
  //селекторы с точкой в начале:
  formSelector: ".form",
  inputSelector: ".form__input",
  errorSelector: ".form__error",
  submitButtonSelector: ".button_type_submit",
  //классы без точки в начале:
  inactiveButtonClass: "button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible",
};

class FormValidator {
  constructor(validationConfig, popup) {
    this._validationConfig = validationConfig;
    this._popup = popup;
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

    if (this._form.checkValidity()) {
      this.setSubmitBtnState(true);
    } else {
      this.setSubmitBtnState(false);
    }
  };

  //Вешаем слушатели события Input на все поля ввода для проверяем их валидности и установки валидности кнопки submit
  _setEventListeners = () => {
    this._submitBtn = this._form.querySelector(this._validationConfig.submitButtonSelector);
    this._inputList = Array.from(this._form.querySelectorAll(this._validationConfig.inputSelector));
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._handleInput(inputElement);
      });
    });
  };

  //функция очистки всех сообщений формы об ошибках заполнения инпутов
  clearErrorMessages = () => {
    this._formErrorList = this._popup.querySelectorAll(this._validationConfig.errorSelector);
    this._formsInputList = this._popup.querySelectorAll(this._validationConfig.inputSelector);

    this._formErrorList.forEach((errorElement) => {
      errorElement.textContent = "";
      errorElement.classList.remove(this._validationConfig.errorClass);
    });
    this._formsInputList.forEach((formInputElement) => {
      formInputElement.classList.remove(this._validationConfig.inputErrorClass);
    });
  };

  //функция установки состояния кнопки submit
  setSubmitBtnState = (isEnabled) => {
    if (!isEnabled) {
      this._submitBtn.setAttribute("disabled", true);
      this._submitBtn.classList.add(this._validationConfig.inactiveButtonClass);
    } else {
      this._submitBtn.removeAttribute("disabled");
      this._submitBtn.classList.remove(this._validationConfig.inactiveButtonClass);
    }
  };

  //Функция валидации. Ищем форму в попапе, и вешает слушатели submit на неё и слушатели input на элементы формы
  enableValidation = () => {
    this._form = this._popup.querySelector(this._validationConfig.formSelector);
    this._setEventListeners();
  };
}

export { FormValidator, validationConfig };
