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
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";
import { UserInfo } from "../components/UserInfo.js";

export const api = new Api(apiOptions);

export const userInfo = new UserInfo(userInfoConfig);

//создаём инстансы классов всех попапов и сразу вешаем слушатели на них
export const popupWithImage = new PopupWithImage(".popup_type_image");
popupWithImage.setEventListeners();

export const newCardPopup = new PopupWithForm(".popup_type_new-card", (inputsValues) => {
  const pictureNameFromInput = inputsValues["form__input_type_place-name"];
  const pictureLinkFromInput = inputsValues["form__input_type_image-link"];

  api.sendNewCardInfo(pictureNameFromInput, pictureLinkFromInput).then((myNewCardDataFromServer) => {
    const newCardElement = createCard(myNewCardDataFromServer, myNewCardDataFromServer.owner._id);
    elementsContainer.addItemBeforeFirstOne(newCardElement);
  });
});
newCardPopup.setEventListeners();

export const profilePopup = new PopupWithForm(".popup_type_profile", (inputsValues) => {
  //отправляем данные на сервер и обновляем на странице
  api
    .sendUserInfo(inputsValues["form__input_type_profile-name"], inputsValues["form__input_type_profile-about"])
    .then((res) => {
      userInfo.setUserInfo(
        inputsValues["form__input_type_profile-name"],
        inputsValues["form__input_type_profile-about"]
      );
      return res;
    });
});
profilePopup.setEventListeners();

export const confirmationPopup = new PopupWithConfirmation(".popup_type_confirmation");
confirmationPopup.setEventListeners();

//создаем инстансы класса валидации для попапов
export const profilePopupValidate = new FormValidator(validationConfig, profilePopup.form);
export const newCardPopupValidate = new FormValidator(validationConfig, newCardPopup.form);

//инициализация валидации(вешание слушателей по сути)
profilePopupValidate.enableValidation();
newCardPopupValidate.enableValidation();

//вешаем слушатели на основные две кнопки на основной странице
profileEditBtn.addEventListener("click", handleProfileEditBtnClick);
newCardAddBtn.addEventListener("click", handleNewCardAddBtnClick);

//создаем инстанс класса Section для отрисовывания карточек
const elementsContainer = new Section(
  {
    renderer: (initialCardsItem, myIdentificator) => {
      const сardElement = createCard(initialCardsItem, myIdentificator);
      elementsContainer.addItemAfterLastOne(сardElement);
    },
  },
  ".elements__list"
);

// api.getInitialCards().then((initialCardsFromServer) => {
//   console.log(initialCardsFromServer);
//   elementsContainer.renderItems(initialCardsFromServer);
// });

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userDataFromServer, initialCardsFromServer]) => {
    userInfo.setUserInfo(userDataFromServer.name, userDataFromServer.about);
    elementsContainer.renderItems(initialCardsFromServer, userDataFromServer._id);

    return userDataFromServer;
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });
