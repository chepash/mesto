import { initialCards, validationConfig } from "./data.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

//находим все попапы
const profilePopup = document.querySelector(".popup_type_profile");
const newCardPopup = document.querySelector(".popup_type_new-card");
const imagePopup = document.querySelector(".popup_type_image");
const popupList = document.querySelectorAll(".popup");

//кнопки
const profileEditBtn = document.querySelector(".button_type_edit");
const newCardAddBtn = document.querySelector(".button_type_add");

//кнопки закрытия(все разом в виде коллекции)
const popupCloseBtnList = document.querySelectorAll(".button_type_close");

//данные профиля со страницы
const profileName = document.querySelector(".profile__name");
const profileOccupation = document.querySelector(".profile__occupation");

//элементы попапа просмотра увеличенных изображений
const imagePopupImageEl = imagePopup.querySelector(".popup__image");
const imagePopupCaption = imagePopup.querySelector(".popup__image-caption");

//все специфические формы
const profilePopupForm = profilePopup.querySelector(".form");
const newCardPopupForm = newCardPopup.querySelector(".form");

//все специфические инпуты
const profilePopupInputName = profilePopup.querySelector(".form__input_type_profile-name");
const profilePopupInputOccupation = profilePopup.querySelector(".form__input_type_profile-occupation");
const newCardPopupInputPlace = newCardPopup.querySelector(".form__input_type_place-name");
const newCardPopupInputLink = newCardPopup.querySelector(".form__input_type_image-link");

//переменные для отображения начальных карточек
const elementsContainer = document.querySelector(".elements__list");

//создаем экземпляры класса валидации для попапов
const profilePopupValidate = new FormValidator(validationConfig, profilePopupForm);
const newCardPopupValidate = new FormValidator(validationConfig, newCardPopupForm);

//функция появления popup
const openPopup = (popup) => {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handleEscapeKeyPress); //вешаем слушатель Esc
};

//функция закрытия popup (без сохранения)
const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleEscapeKeyPress); //снимаем слушатель Esc
};

//функция закрытия popup кликая на Overlay (без сохранения)
const handlePopupOverlayClick = (e) => {
  if (e.currentTarget == e.target) {
    closePopup(e.target);
  }
};

//функция закрытия popup при клике на клавишу Escape (без сохранения)
const handleEscapeKeyPress = (e) => {
  if (e.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    if (openedPopup) {
      closePopup(openedPopup);
    } else {
      console.log("не могу найти открытый popup");
    }
  }
};

//функция-обработчик клика по кнопке edit (редактирования профиля)
const handleProfileEditBtnClick = () => {
  profilePopupInputName.value = profileName.textContent;
  profilePopupInputOccupation.value = profileOccupation.textContent;

  profilePopupValidate.clearErrorMessages();
  profilePopupValidate.setSubmitBtnState();

  openPopup(profilePopup);
};

//функция-обработчик клика по кнопке add (добавления карточки)
const handleNewCardAddBtnClick = () => {
  newCardPopupValidate.setSubmitBtnState();
  openPopup(newCardPopup);
};

//функция-обработчик клика по картинке
const handleCardClick = (cardName, cardPicSrc) => {
  imagePopupImageEl.alt = cardName;
  imagePopupImageEl.src = cardPicSrc;
  imagePopupCaption.textContent = cardName;
  openPopup(imagePopup);
};

//функция-обработчик закрытия формы редактирования профиля (с сохранением)
const handleSaveProfileEdit = function (e) {
  e.preventDefault();
  profileName.textContent = profilePopupInputName.value;
  profileOccupation.textContent = profilePopupInputOccupation.value;
  closePopup(profilePopup);
};

//функция создания карточки(DOM-элемента) на основе класса
const createCard = (cardData) => {
  const сardInstance = new Card(cardData, ".template", handleCardClick);
  return сardInstance.createElementNode();
};

//функция закрытия формы добавления карточки (с сохранением)
const handleAddNewCard = (e) => {
  e.preventDefault();

  const newCardElement = createCard({
    name: newCardPopupInputPlace.value,
    link: newCardPopupInputLink.value,
  });
  elementsContainer.prepend(newCardElement);

  newCardPopupValidate.clearErrorMessages();
  closePopup(newCardPopup);
  newCardPopupForm.reset(); //метод у форм. для отчистки запомненных данных
};

//вешаем слушатели на интерактивные элементы
profileEditBtn.addEventListener("click", handleProfileEditBtnClick);
newCardAddBtn.addEventListener("click", handleNewCardAddBtnClick);

profilePopupForm.addEventListener("submit", handleSaveProfileEdit);
newCardPopupForm.addEventListener("submit", handleAddNewCard);

popupCloseBtnList.forEach((btn) => {
  const popup = btn.closest(".popup");
  btn.addEventListener("click", () => closePopup(popup));
});

popupList.forEach((popupElement) => {
  popupElement.addEventListener("click", handlePopupOverlayClick);
});

//инициализация валидации(вешание слушателей по сути)
profilePopupValidate.enableValidation();
newCardPopupValidate.enableValidation();

//функция отрисовыввания начальных карточек(через класс)
const render = () => {
  initialCards.forEach((initialCardsItem) => {
    const сardElement = createCard(initialCardsItem);
    elementsContainer.append(сardElement);
  });
};

//вызываем функцию начальной отрисовки карточек через инстанс класса
render();
