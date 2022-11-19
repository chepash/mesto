export const initialCards = [
  {
    name: "Архыз",
    link: "./images/place_2016arhys.jpg",
  },
  {
    name: "Фиштинский перевал",
    link: "./images/place_2018fisht.JPG",
  },
  {
    name: "Оштен",
    link: "./images/place_2018oshten.jpg",
  },
  {
    name: "Карачаевский перевал",
    link: "./images/place_2018karach.JPG",
  },
  {
    name: "Озеро любви",
    link: "./images/place_2021lovelake.jpg",
  },
  {
    name: "Куршская коса",
    link: "./images/place_2021kurshkaya.jpg",
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
  profileOccupationSelector: ".profile__occupation",
};
