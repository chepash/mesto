const initialCards = [
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

class Card {
  constructor(cardData, templateSelector, handleCardClick) {
    this._cardName = cardData.name;
    this._cardPicSrc = cardData.link;
    this._template = document.querySelector(templateSelector);

    this._handleCardClick = handleCardClick;
  }

  //метод-обработчик добавления like на карточке
  _handleLikeCard = () => {
    this._imageLikeBtn.classList.toggle("button_active");
  };

  //метод удаления карточки
  _handleDeleteCard = () => {
    this._currentElement.remove();
  };

  //метод формирования DOM элемента карточки из template
  createElementNode = () => {
    this._currentElement = this._template.content.cloneNode(true).children[0];

    this._currentName = this._currentElement.querySelector(".element__caption");
    this._currentName.textContent = this._cardName;

    this._currentPicture = this._currentElement.querySelector(".element__image");
    this._currentPicture.alt = this._cardName;
    this._currentPicture.src = this._cardPicSrc;
    this._currentPicture.addEventListener("click", () => this._handleCardClick(this._cardName, this._cardPicSrc));

    this._imageDeleteBtn = this._currentElement.querySelector(".button_type_delete");
    this._imageDeleteBtn.addEventListener("click", this._handleDeleteCard);

    this._imageLikeBtn = this._currentElement.querySelector(".button_type_like");
    this._imageLikeBtn.addEventListener("click", this._handleLikeCard);

    return this._currentElement;
  };
}
