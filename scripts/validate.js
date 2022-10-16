const setSubmitBtnState = (buttonElement, isEnabled) => {
  if (!isEnabled) {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add('button_disabled');
  } else {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove('button_disabled');
  }
}

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('form__input_type_error');
  errorElement.classList.add('form__input-error_active');
  errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('form__input_type_error');
  errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = '';
};


const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

//Вешаем слушатели события Input на все поля ввода для проверяем их валидности и установки валидности кнопки submit
const setEventListeners = (formElement) => {
  const submitBtn = formElement.querySelector('.button_type_submit');
  const inputList = Array.from(formElement.querySelectorAll('.form__input'));
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);

      if (formElement.checkValidity()) {
        setSubmitBtnState(submitBtn, true);
      } else {
        setSubmitBtnState(submitBtn, false);
      }
    });
  });
};

//Функция валидации. Ищет все формы, и вешает слушатели на них и их элементы
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
}

enableValidation();
