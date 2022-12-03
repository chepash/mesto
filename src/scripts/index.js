import "../pages/index.css";

import {
  validationConfig,
  userInfoConfig,
  profileEditBtn,
  newCardAddBtn,
  apiOptions,
  avatarOverlayEl,
} from "../utils/constants.js";

import { Api } from "../components/Api.js";

import { handleProfileEditBtnClick, handleNewCardAddBtnClick, createCard } from "../utils/utils.js";

import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";
import { UserInfo } from "../components/UserInfo.js";

export const api = new Api(apiOptions);

export const userInfo = new UserInfo(userInfoConfig);

//инстанс отвечающий за работу попапа просмотра картинки
export const popupWithImage = new PopupWithImage(".popup_type_image");
popupWithImage.setEventListeners();

//инстанс отвечающий за работу попапа создания новой карточки
export const newCardPopup = new PopupWithForm(".popup_type_new-card", (inputsValues) => {
  const pictureNameFromInput = inputsValues["form__input_type_place-name"];
  const pictureLinkFromInput = inputsValues["form__input_type_image-link"];

  newCardPopup.renderLoading(true);
  api
    .sendNewCardInfo(pictureNameFromInput, pictureLinkFromInput)
    .then((myNewCardDataFromServer) => {
      const newCardElement = createCard(myNewCardDataFromServer, myNewCardDataFromServer.owner._id);
      elementsContainer.addItemBeforeFirstOne(newCardElement);
      newCardPopup.renderLoading(false);
      newCardPopup.close();
    });
});
newCardPopup.setEventListeners();

//инстанс отвечающий за работу попапа редактирования аватарки
const avatarEditPopup = new PopupWithForm(".popup_type_new-avatar", (inputsValues) => {
  const newAvatarUrl = inputsValues["form__input_type_avatar-link"];
  avatarEditPopup.renderLoading(true);
  api.sendUserAvatar(newAvatarUrl).then((res) => {
    userInfo.setUserAvatar(res.avatar);
    avatarEditPopup.renderLoading(false);
    avatarEditPopup.close();
  });
});
avatarEditPopup.setEventListeners();

//инстанс отвечающий за работу попапа редактирования данных о профиле
export const profilePopup = new PopupWithForm(".popup_type_profile", (inputsValues) => {
  profilePopup.renderLoading(true);
  api
    .sendUserInfo(
      inputsValues["form__input_type_profile-name"],
      inputsValues["form__input_type_profile-about"]
    )
    .then((userDataFromServer) => {
      userInfo.setUserInfo(userDataFromServer.name, userDataFromServer.about);
      profilePopup.renderLoading(false);
      profilePopup.close();
      return userDataFromServer;
    });
});
profilePopup.setEventListeners();

//инстанс отвечающий за работу попапа подтверждения удаления карточки
export const confirmationPopup = new PopupWithConfirmation(".popup_type_confirmation");
confirmationPopup.setEventListeners();

//создаем инстансы класса валидации для попапов с формами
export const profilePopupValidate = new FormValidator(validationConfig, profilePopup.form);
export const newCardPopupValidate = new FormValidator(validationConfig, newCardPopup.form);
export const newAvatarPopupValidate = new FormValidator(validationConfig, avatarEditPopup.form);

//инициализация валидации(вешание слушателей по сути)
profilePopupValidate.enableValidation();
newCardPopupValidate.enableValidation();
newAvatarPopupValidate.enableValidation();

//вешаем слушатели на основные две кнопки + аватар на основной странице
profileEditBtn.addEventListener("click", handleProfileEditBtnClick);
newCardAddBtn.addEventListener("click", handleNewCardAddBtnClick);
avatarOverlayEl.addEventListener("click", (e) => {
  avatarEditPopup.open();
});

//создаем инстанс класса Section для отрисовывания карточек
const elementsContainer = new Section({
  renderer: (initialCardsItem, myIdentificator) => {
    const сardElement = createCard(initialCardsItem, myIdentificator);
    elementsContainer.addItemAfterLastOne(сardElement);
  },
  containerSelector: ".elements__list",
});

//создаем инстанс класса Section для отрисовывания данных профиля
const profileContainer = new Section({
  renderer: (userDataFromServer) => {
    const domElements = createProfileSection(userDataFromServer);
    profileContainer.addItemAfterLastOne(domElements);
  },
  containerSelector: ".profile",
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userDataFromServer, initialCardsFromServer]) => {
    userInfo.setUserInfo(userDataFromServer.name, userDataFromServer.about);
    userInfo.setUserAvatar(userDataFromServer.avatar);
    elementsContainer.renderItems(initialCardsFromServer, userDataFromServer._id);

    return userDataFromServer;
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });
