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

//все специфические формы
const profilePopupForm = profilePopup.querySelector('.form');
const cardPopupForm = cardPopup.querySelector('.form');

//все специфические инпуты
const profilePopupInputName = profilePopup.querySelector('.form__input_type_profile-name');
const profilePopupInputOccupation = profilePopup.querySelector('.form__input_type_profile-occupation');
const cardPopupInputPlace = cardPopup.querySelector('.form__input_type_place-name');
const cardPopupInputLink = cardPopup.querySelector('.form__input_type_image-link');

//переменные для отображения начальных карточек
const elementsContainer = document.querySelector(".elements__list");
const template = document.querySelector(".template");


//функция появления popup
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscapeKeyPress); //вешаем слушатель Esc
}

//функция закрытия popup (без сохранения)
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscapeKeyPress); //снимаем слушатель Esc
}

//функция закрытия popup кликая на Overlay (без сохранения)
const handlePopupOverlayClick = (e) => {
  if (e.currentTarget == e.target) {
    closePopup(e.target)
  }
}

//функция закрытия popup при клике на клавишу Escape (без сохранения)
const handleEscapeKeyPress = (e) => {
  if (e.key === "Escape") {
    const openedPopup = document.querySelector('.popup_opened');
    if (openedPopup) {
      closePopup(openedPopup);
    } else {
      console.log('не могу найти открытый popup')
    }
  }
}

//функция-обработчик добавления like на карточке
const handleLikeCard = (e) => {
  const currentLikeBtn = e.target;
  currentLikeBtn.classList.toggle('button_active');
}


//функция-обработчик клика по кнопке edit (редактирования профиля)
const handleProfileEditBtnClick = () => {
  profilePopupInputName.value = profileName.textContent;
  profilePopupInputOccupation.value = profileOccupation.textContent;
  openPopup(profilePopup);
  clearErrorMessages(profilePopup);
  setSubmitBtnState(validationConfig, profilePopupSubmitBtn, profilePopupForm.checkValidity());
}

//функция-обработчик клика по кнопке add (добавления карточки)
const handleCardAddBtnClick = () => {
  openPopup(cardPopup);
  setSubmitBtnState(validationConfig, cardPopupSubmitBtn, cardPopupForm.checkValidity());
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

//функция-обработчик закрытия формы редактирования профиля (с сохранением)
const handleSaveEdit = function (e) {
  e.preventDefault();
  profileName.textContent = profilePopupInputName.value;
  profileOccupation.textContent = profilePopupInputOccupation.value;
  clearErrorMessages(profilePopup);
  closePopup(profilePopup);
}

//функция закрытия формы добавления карточки (с сохранением)
const handleAddCard = (e) => {
  e.preventDefault();
  const newCard = createElementNode({name: cardPopupInputPlace.value, link: cardPopupInputLink.value});
  elementsContainer.prepend(newCard);
  clearErrorMessages(cardPopup);
  closePopup(cardPopup);
  cardPopupForm.reset(); //метод у форм. для отчистки запомненных данных
}


//вешаем слушатели на интерактивные элементы
profileEditBtn.addEventListener('click', handleProfileEditBtnClick);
cardAddBtn.addEventListener('click', handleCardAddBtnClick);

profilePopupForm.addEventListener('submit', handleSaveEdit);
cardPopupForm.addEventListener('submit', handleAddCard);

popupCloseBtnList.forEach(btn => {
  const popup = btn.closest('.popup');
  btn.addEventListener('click', () => closePopup(popup));
})

popupList.forEach(popupElement => {
  popupElement.addEventListener('click', handlePopupOverlayClick);
})

//вызываем функцию начальной отрисовки карточек
render();
