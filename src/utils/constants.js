const place_2016arhys = new URL("../images/place_2016arhys.jpg", import.meta.url);
const place_2018fisht = new URL("../images/place_2018fisht.JPG", import.meta.url);
const place_2018oshten = new URL("../images/place_2018oshten.jpg", import.meta.url);
const place_2018karach = new URL("../images/place_2018karach.JPG", import.meta.url);
const place_2021lovelake = new URL("../images/place_2021lovelake.jpg", import.meta.url);
const place_2021kurshkaya = new URL("../images/place_2021kurshkaya.jpg", import.meta.url);

export const apiOptions = {
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-55",
  headers: {
    authorization: "8abcd093-addb-4bd1-b00f-f600aa41c00a",
    "Content-Type": "application/json",
  },
};

export let initialCards = [
  {
    name: "Архыз",
    link: place_2016arhys,
  },
  {
    name: "Фиштинский перевал",
    link: place_2018fisht,
  },
  {
    name: "Оштен",
    link: place_2018oshten,
  },
  {
    name: "Карачаевский перевал",
    link: place_2018karach,
  },
  {
    name: "Озеро любви",
    link: place_2021lovelake,
  },
  {
    name: "Куршская коса",
    link: place_2021kurshkaya,
  },
];

export const validationConfig = {
  //селекторы с точкой в начале:
  //formSelector: ".form", не используется
  inputSelector: ".form__input",
  //errorSelector: ".form__error", не используется
  submitButtonSelector: ".button_type_submit",
  //классы без точки в начале:
  inactiveButtonClass: "button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__error_visible",
};

export const userInfoConfig = {
  profileNameSelector: ".profile__name",
  profileAboutSelector: ".profile__about",
};

//находим кнопки на странице
export const profileEditBtn = document.querySelector(".button_type_edit");
export const newCardAddBtn = document.querySelector(".button_type_add");
