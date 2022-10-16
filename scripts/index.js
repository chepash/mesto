//находим все попапы
const profilePopup = document.querySelector('.popup_type_profile');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const popupList = document.querySelectorAll('.popup');

//кнопки
const profileEditBtn = document.querySelector('.button_type_edit');
const cardAddBtn = document.querySelector('.button_type_add');
const cardPopupSubmitBtn = cardPopup.querySelector('.button_type_submit');
const profilePopupSubmitBtn = profilePopup.querySelector('.button_type_submit');

//кнопки закрытия(все разом в виде коллекции)
const popupCloseBtnList = document.querySelectorAll('.button_type_close');

//данные профиля со страницы
const profileName = document.querySelector('.profile__name');
const profileOccupation = document.querySelector('.profile__occupation');

//элементы попапа просмотра увеличенных изображений
const imagePopupImageEl = imagePopup.querySelector('.popup__image');
const imagePopupCaption = imagePopup.querySelector('.popup__image-caption');

//формы
const profilePopupForm = profilePopup.querySelector('.form');
const cardPopupForm = cardPopup.querySelector('.form');

//все инпуты
const profilePopupInputName = profilePopup.querySelector('.form__input_type_profile-name');
const profilePopupInputOccupation = profilePopup.querySelector('.form__input_type_profile-occupation');
const cardPopupInputPlace = cardPopup.querySelector('.form__input_type_place-name');
const cardPopupInputLink = cardPopup.querySelector('.form__input_type_image-link');
const formsInputList = document.querySelectorAll('.form__input');

//все сообщения об ошибках
const formInputErrorList = document.querySelectorAll('.form__input-error');

//переменные для отображения начальных карточек
const elementsContainer = document.querySelector(".elements__list");
const template = document.querySelector(".template");


//функция очистки всех сообщений об ошибках заполнения инпутов
const clearErrorMessages = () => {
  formInputErrorList.forEach(errorElement => {
    errorElement.textContent = '';
    errorElement.classList.remove('form__input-error_active');
  });
  formsInputList.forEach(formInputElement => {
    formInputElement.classList.remove('form__input_type_error');
  });
}

//функция проверки наличия формы у popup
const isPopupHasForm = (popup) => {
  return popup.contains(popup.querySelector('.form'));
}

//функция появления формы
const openPopup = (currentPopup) => {
  currentPopup.classList.add('popup_opened');
}

//функция закрытия popup без сохранения
const closePopup = (currentPopup) => {
  currentPopup.classList.remove('popup_opened');
  if (isPopupHasForm(currentPopup)) {
    clearErrorMessages();
  }
}

//функция закрытия popup кликая на Overlay (без сохранения)
const handlePopupOverlayClick = (e) => {
  if (e.currentTarget == e.target) {
    closePopup(e.target)
  }
}

//функция закрытия popup кликая на Overlay (без сохранения)
const handleEscapeKeyPress = (key) => {
  const openedPopup = document.querySelector('.popup_opened');
  if (key === "Escape" && openedPopup) {
    closePopup(openedPopup);
  }
}

//функция-обработчик добавления like на карточке
const handleLikeCard = (e) => {
  const currentLikeBtn = e.target;
  currentLikeBtn.classList.toggle('button_active');
}

//функция-обработчик закрытия формы редактирования профиля с сохранением
const handleSaveEdit = function (e) {
  e.preventDefault();
  profileName.textContent = profilePopupInputName.value;
  profileOccupation.textContent = profilePopupInputOccupation.value;
  closePopup(profilePopup);
}


//функция-обработчик клика по кнопке edit (редактирования профиля)
const handleProfileEditBtnClick = () => {
  profilePopupInputName.value = profileName.textContent;
  profilePopupInputOccupation.value = profileOccupation.textContent;
  openPopup(profilePopup);
  setSubmitBtnState(profilePopupSubmitBtn, profilePopupForm.checkValidity());
}

//функция-обработчик клика по кнопке add (добавления карточки)
const handleCardAddBtnClick = () => {
  cardPopupForm.reset(); //метод у форм. для отчистки запомненных данных
  openPopup(cardPopup);
  setSubmitBtnState(cardPopupSubmitBtn, cardPopupForm.checkValidity());
}

//функция-обработчик клика по картинке
const handleCardClick = (cardData) => {
  imagePopupImageEl.alt = cardData.name;
  imagePopupImageEl.src = cardData.link;
  imagePopupCaption.textContent = cardData.name;
  openPopup(imagePopup);
}


//функция формирования DOM элемента из template
const createElementNode = (cardData) => {
  const currentElement = template.content.cloneNode(true);

  const currentName = currentElement.querySelector('.element__caption');
  currentName.textContent = cardData.name;

  const currentPicture = currentElement.querySelector('.element__image');
  currentPicture.alt = cardData.name;
  currentPicture.src = cardData.link;
  currentPicture.addEventListener('click', () => handleCardClick(cardData));//вместо передаваемого event создаём слушатель сразу с данными текущей карточки

  const imageDeleteBtn = currentElement.querySelector('.button_type_delete');
  imageDeleteBtn.addEventListener('click', handleDeleteCard);

  const imageLikeBtn = currentElement.querySelector('.button_type_like');
  imageLikeBtn.addEventListener('click', handleLikeCard);

  return currentElement;
}

//функция отрисовыввания начальных карточек
const render = () => {
  initialCards.forEach((initialCardsItem) => {
    const currentCard = createElementNode(initialCardsItem);
    elementsContainer.append(currentCard);
  })
}

//функция удаления карточки
const handleDeleteCard = (e) => {
  const currentCard = e.target.closest('.element');
  currentCard.remove();
}

//функция закрытия формы добавления карточки с сохранением
const handleAddCard = (e) => {
  e.preventDefault();
  const newCard = createElementNode({name: cardPopupInputPlace.value, link: cardPopupInputLink.value});
  elementsContainer.prepend(newCard);
  closePopup(cardPopup);
}


//вешаем слушатели на интерактивные элементы
profileEditBtn.addEventListener('click', handleProfileEditBtnClick);
cardAddBtn.addEventListener('click', handleCardAddBtnClick);

profilePopupForm.addEventListener('submit', handleSaveEdit);
cardPopupForm.addEventListener('submit', handleAddCard);

popupCloseBtnList.forEach(btn => {
  const popup = btn.closest('.popup');
  btn.addEventListener('click', () => {
    closePopup(popup);
  });
})

popupList.forEach(popupElement => {
  popupElement.addEventListener('click', handlePopupOverlayClick);
})

document.addEventListener('keydown', (e) => {
  handleEscapeKeyPress(e.key)
} );

//вызываем функцию начальной отрисовки карточек
render();
