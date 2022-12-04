import {
  newCardPopup,
  popupWithImage,
  profilePopup,
  userInfo,
  profilePopupValidate,
  newCardPopupValidate,
  confirmationPopup,
  api,
} from "../scripts/index.js";

import { Card } from "../components/Card.js";

//функция-обработчик клика по кнопке edit (открытие попапа редактирования профиля)
export const handleProfileEditBtnClick = () => {
  const userDataFromPage = userInfo.getUserInfo();

  //у инпутов теперь есть атрибут name, который сочетается с
  //названиями свойств объекта userData, получаемого из класса UserInfo методом getUserInfo
  profilePopup.setInputValues(userDataFromPage);

  profilePopupValidate.clearErrorMessages();
  profilePopupValidate.setSubmitBtnState();

  profilePopup.open();
};

//функция-обработчик клика по кнопке add (открытие попапа добавления карточки)
export const handleNewCardAddBtnClick = () => {
  profilePopupValidate.clearErrorMessages();
  newCardPopupValidate.setSubmitBtnState();
  newCardPopup.open();
};

//функция-обработчик клика по картинке (открытие попапа просмотра картинки)
export const handleOnCardClick = (cardName, cardPicSrc) => {
  popupWithImage.open(cardName, cardPicSrc);
};

//функция-обработчик клика по кнопке удаления (открытие попапа подтверждения удаления карточки)
const handleDeleteBtnClick = (cardId, deleteCurrentDomElement) => {
  confirmationPopup.open();
  confirmationPopup
    .waitUntilClosed()
    .then((isConfirmed) => {
      if (isConfirmed) {
        confirmationPopup.renderLoading(true);
        return api.sendСardDeleteRequest(cardId);
      }
      return Promise.reject(false);
    })
    .then((res) => {
      if (res) {
        deleteCurrentDomElement();
        confirmationPopup.close();
        return;
      }
    })
    .catch((falseFromPopupClosed) => {
      console.log(`${falseFromPopupClosed}: передумал удалять`);
    })
    .finally(() => {
      confirmationPopup.renderLoading(false);
    });
};

//метод-обработчик добавления like на карточке
const handleLikeCard = (isCardAlreadyLikedByMe, cardId, setLikeBtnStateWithCounts) => {
  if (!isCardAlreadyLikedByMe) {
    api
      .sendSetLikeRequest(cardId)
      .then((cardDataFromServer) => {
        setLikeBtnStateWithCounts(true, cardDataFromServer.likes.length);
      })
      .catch((err) => {
        console.log(`Ошибка api: ${err}`);
      });
  } else {
    api
      .sendRemoveLikeRequest(cardId)
      .then((cardDataFromServer) => {
        setLikeBtnStateWithCounts(false, cardDataFromServer.likes.length);
      })
      .catch((err) => {
        console.log(`Ошибка api: ${err}`);
      });
  }
};

//функция создания карточки(DOM-элемента) на основе класса
export const createCard = (cardData, myIdentificator) => {
  const сardInstance = new Card({
    cardData: cardData,
    templateSelector: ".template_type_card",
    myIdentificator: myIdentificator,
    handleOnCardClick: handleOnCardClick,
    handleDeleteBtnClick: handleDeleteBtnClick,
    handleLikeCard: handleLikeCard,
  });
  return сardInstance.createElementNode();
};
