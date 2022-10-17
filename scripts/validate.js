const validationConfig = {
  //селекторы с точкой в начале:
  formSelector: '.form',
  inputSelector: '.form__input',
  errorSelector: '.form__error',
  submitButtonSelector: '.button_type_submit',
  //классы без точки в начале:
  inactiveButtonClass: 'button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error_visible'
};

const setSubmitBtnState = (validationConfig, buttonElement, isEnabled) => {
  if (!isEnabled) {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
  } else {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  }
}

const showInputError = (validationConfig, formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.classList.add(validationConfig.errorClass);
  errorElement.textContent = errorMessage;
};

const hideInputError = (validationConfig, formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = '';
};


const checkInputValidity = (validationConfig, formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(validationConfig, formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(validationConfig, formElement, inputElement);
  }
};

//Вешаем слушатели события Input на все поля ввода для проверяем их валидности и установки валидности кнопки submit
const setEventListeners = (validationConfig, formElement) => {
  const submitBtn = formElement.querySelector(validationConfig.submitButtonSelector);
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(validationConfig, formElement, inputElement);

      if (formElement.checkValidity()) {
        setSubmitBtnState(validationConfig, submitBtn, true);
      } else {
        setSubmitBtnState(validationConfig, submitBtn, false);
      }
    });
  });
};



//Функция валидации. Ищет все формы, и вешает слушатели на них и их элементы
const enableValidation = (validationConfig) => {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(validationConfig, formElement);
  });
}

enableValidation(validationConfig);
