export class Card {
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
    //При удалении экземпляра класса его дополнительно после удаления нужно занулять.
    //remove удаляет только разметку из html, сам объект карточки остается в памяти
    this._currentElement = null;
  };

  //метод формирования DOM-элемента карточки из template и навешивание слушателей
  createElementNode = () => {
    this._currentElement = this._template.content.querySelector(".element").cloneNode(true);

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
