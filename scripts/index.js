import { initialCards, validationConfig, userInfoConfig } from "./data.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { Section } from "./Section.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { UserInfo } from "./UserInfo.js";

const userInfo = new UserInfo(userInfoConfig);

//создаём инстансы всех попапов и сразу вешаем слушатели на них
const popupWithImage = new PopupWithImage(".popup_type_image");
popupWithImage.setEventListeners();

const newCardPopup = new PopupWithForm(".popup_type_new-card", (inputsValues) => {
  const newCardElement = createCard({
    name: inputsValues["form__input_type_place-name"],
    link: inputsValues["form__input_type_image-link"],
  });
  elementsContainer.addItem(newCardElement);

  newCardPopupValidate.clearErrorMessages();
  newCardPopup.close();
});
newCardPopup.setEventListeners();

const profilePopup = new PopupWithForm(".popup_type_profile", (inputsValues) => {
  userInfo.setUserInfo(
    inputsValues["form__input_type_profile-name"],
    inputsValues["form__input_type_profile-occupation"]
  );
});
profilePopup.setEventListeners();

//находим кнопки на странице
const profileEditBtn = document.querySelector(".button_type_edit");
const newCardAddBtn = document.querySelector(".button_type_add");

//специфические инпуты формы редактирования профиля
//(чтобы каждый раз их не искать при открытии попапа)
const profilePopupInputName = profilePopup.form.querySelector(".form__input_type_profile-name");
const profilePopupInputOccupation = profilePopup.form.querySelector(".form__input_type_profile-occupation");

//создаем экземпляры класса валидации для попапов
const profilePopupValidate = new FormValidator(validationConfig, profilePopup.form);
const newCardPopupValidate = new FormValidator(validationConfig, newCardPopup.form);

//инициализация валидации(вешание слушателей по сути)
profilePopupValidate.enableValidation();
newCardPopupValidate.enableValidation();

//функция-обработчик клика по кнопке edit (открытие попапа редактирования профиля)
const handleProfileEditBtnClick = () => {
  const userData = userInfo.getUserInfo();
  profilePopupInputName.value = userData.profileName;
  profilePopupInputOccupation.value = userData.profileOccupation;

  profilePopupValidate.clearErrorMessages();
  profilePopupValidate.setSubmitBtnState();

  profilePopup.open();
};

//функция-обработчик клика по кнопке add (открытие попапа добавления карточки)
const handleNewCardAddBtnClick = () => {
  newCardPopupValidate.setSubmitBtnState();
  newCardPopup.open();
};

//функция-обработчик клика по картинке (открытие попапа просмотра картинки)
const handleCardClick = (cardName, cardPicSrc) => {
  popupWithImage.open(cardName, cardPicSrc);
};

//функция создания карточки(DOM-элемента) на основе класса
const createCard = (cardData) => {
  const сardInstance = new Card(cardData, ".template", handleCardClick);
  return сardInstance.createElementNode();
};

//вешаем слушатели на основные две кнопки на основной странице
profileEditBtn.addEventListener("click", handleProfileEditBtnClick);
newCardAddBtn.addEventListener("click", handleNewCardAddBtnClick);

//создаем инстанс класса Section для отрисовывания карточек
const elementsContainer = new Section(
  {
    items: initialCards,
    renderer: (initialCardsItem) => {
      const сardElement = createCard(initialCardsItem);
      elementsContainer.addItem(сardElement);
    },
  },
  ".elements__list"
);

elementsContainer.renderItems();
