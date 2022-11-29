import "../pages/index.css";

import {
  initialCards,
  validationConfig,
  userInfoConfig,
  profileEditBtn,
  newCardAddBtn,
  apiOptions,
} from "../utils/constants.js";

import { Api } from "../components/Api.js";

import { handleProfileEditBtnClick, handleNewCardAddBtnClick, createCard } from "../utils/utils.js";

import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";

const api = new Api(apiOptions);

export const userInfo = new UserInfo(userInfoConfig);

api.getUserInfo().then((userDataFromServer) => {
  userInfo.setUserInfo(userDataFromServer.name, userDataFromServer.about);
});

//создаём инстансы классов всех попапов и сразу вешаем слушатели на них
export const popupWithImage = new PopupWithImage(".popup_type_image");
popupWithImage.setEventListeners();

export const newCardPopup = new PopupWithForm(".popup_type_new-card", (inputsValues) => {
  const newCardElement = createCard({
    name: inputsValues["form__input_type_place-name"],
    link: inputsValues["form__input_type_image-link"],
  });
  elementsContainer.addItem(newCardElement);

  newCardPopup.close();
});
newCardPopup.setEventListeners();

export const profilePopup = new PopupWithForm(".popup_type_profile", (inputsValues) => {
  userInfo.setUserInfo(
    inputsValues["form__input_type_profile-name"],
    inputsValues["form__input_type_profile-occupation"]
  );
});
profilePopup.setEventListeners();

//создаем инстансы класса валидации для попапов
export const profilePopupValidate = new FormValidator(validationConfig, profilePopup.form);
export const newCardPopupValidate = new FormValidator(validationConfig, newCardPopup.form);

//инициализация валидации(вешание слушателей по сути)
profilePopupValidate.enableValidation();
newCardPopupValidate.enableValidation();

//вешаем слушатели на основные две кнопки на основной странице
profileEditBtn.addEventListener("click", handleProfileEditBtnClick);
newCardAddBtn.addEventListener("click", handleNewCardAddBtnClick);

api.getInitialCards().then((initialCards) => {
  //создаем асинхронно инстанс класса Section для отрисовывания карточек
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
  //и сразу отрисовываем
  elementsContainer.renderItems();
});
