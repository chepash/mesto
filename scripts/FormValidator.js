class FormValidator {
  constructor(validationConfig, popup) {
    this._validationConfig = validationConfig;
    this._popup = popup;
  }

  //функция очистки всех сообщений формы об ошибках заполнения инпутов
  _clearErrorMessages = (popup) => {
    this._formErrorList = popup.querySelectorAll(validationConfig.errorSelector);
    this._formsInputList = popup.querySelectorAll(validationConfig.inputSelector);

    this._formErrorList.forEach((errorElement) => {
      errorElement.textContent = "";
      errorElement.classList.remove(validationConfig.errorClass);
    });
    this._formsInputList.forEach((formInputElement) => {
      formInputElement.classList.remove(validationConfig.inputErrorClass);
    });
  };

  //функция установки состояния кнопки submit
  _setSubmitBtnState = (validationConfig, buttonElement, isEnabled) => {
    if (!isEnabled) {
      buttonElement.setAttribute("disabled", true);
      buttonElement.classList.add(validationConfig.inactiveButtonClass);
    } else {
      buttonElement.removeAttribute("disabled");
      buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    }
  };

  //показываем красные ошибки у инпута
  _showInputError = (validationConfig, formElement, inputElement, errorMessage) => {
    this._errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(validationConfig.inputErrorClass);
    this._errorElement.classList.add(validationConfig.errorClass);
    this._errorElement.textContent = errorMessage;
  };

  //убираем красные ошибки у инпута
  _hideInputError = (validationConfig, formElement, inputElement) => {
    this._errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(validationConfig.inputErrorClass);
    this._errorElement.classList.remove(validationConfig.errorClass);
    this._errorElement.textContent = "";
  };

  //проверяем валидность инпута
  _checkInputValidity = (validationConfig, formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(validationConfig, formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(validationConfig, formElement, inputElement);
    }
  };

  //Вешаем слушатели события Input на все поля ввода для проверяем их валидности и установки валидности кнопки submit
  _setEventListeners = (validationConfig, formElement) => {
    this._submitBtn = formElement.querySelector(validationConfig.submitButtonSelector);
    this._inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(validationConfig, formElement, inputElement);

        if (formElement.checkValidity()) {
          this._setSubmitBtnState(validationConfig, this._submitBtn, true);
        } else {
          this._setSubmitBtnState(validationConfig, this._submitBtn, false);
        }
      });
    });
  };

  //Функция валидации. Ищем форму в попапе, и вешает слушатели submit на неё и слушатели input на элементы формы
  enableValidation = () => {
    this._form = document.querySelector(this._validationConfig.formSelector);
    this._setEventListeners(this._validationConfig, this._form);
  };
}
