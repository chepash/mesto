export class Card {
  constructor(options) {
    this._cardData = options.cardData;
    this._template = document.querySelector(options.templateSelector);

    this._myIdentificator = options.myIdentificator;

    this._handleCardClick = options.handleCardClick;
    this._handleDeleteBtnClick = options.handleDeleteBtnClick;
  }

  //метод-обработчик добавления like на карточке
  _handleLikeCard = () => {
    this._imageLikeBtn.classList.toggle("button_active");
  };

  _deleteDomElement() {
    this._currentElement.remove();
    //При удалении экземпляра класса его дополнительно после удаления нужно занулять.
    //remove удаляет только разметку из html, сам объект карточки остается в памяти
    this._currentElement = null;
  }

  _setEventListeners() {
    this._currentPicture.addEventListener("click", () =>
      this._handleCardClick(this._cardData.name, this._cardData.link)
    );

    this._imageDeleteBtn = this._currentElement.querySelector(".button_type_delete");
    this._imageDeleteBtn.addEventListener("click", () => {
      this._handleDeleteBtnClick(this._cardData._id, this._deleteDomElement.bind(this));
    });

    this._imageLikeBtn = this._currentElement.querySelector(".button_type_like");
    this._imageLikeBtn.addEventListener("click", this._handleLikeCard);
  }

  //метод формирования DOM-элемента карточки из template и навешивание слушателей
  createElementNode = () => {
    this._currentElement = this._template.content.querySelector(".element").cloneNode(true);

    this._currentName = this._currentElement.querySelector(".element__caption");
    this._currentName.textContent = this._cardData.name;

    this._currentPicture = this._currentElement.querySelector(".element__image");
    this._currentPicture.alt = this._cardData.name;
    this._currentPicture.src = this._cardData.link;

    this._currentLikeCounter = this._currentElement.querySelector(".element__like-count");
    this._currentLikeCounter.textContent = this._cardData.likes.length;

    //console.log(this._cardData);

    this._currentLikeButton = this._currentElement.querySelector(".button_type_like");
    if (this._cardData.likes.includes(this._myIdentificator)) {
      this._currentLikeButton.classList.add("button_active");
    }

    this._currentDeleteButton = this._currentElement.querySelector(".button_type_delete");
    if (this._cardData.owner._id !== this._myIdentificator) {
      this._currentDeleteButton.classList.add("button_hidden");
    }

    this._setEventListeners();

    return this._currentElement;
  };
}
