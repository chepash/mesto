export class Card {
  constructor(options) {
    this._cardData = options.cardData;
    this._template = document.querySelector(options.templateSelector);

    this._myIdentificator = options.myIdentificator;

    this._handleOnCardClick = options.handleOnCardClick;
    this._handleDeleteBtnClick = options.handleDeleteBtnClick;
    this._handleLikeCard = options.handleLikeCard;
  }

  _setLikeBtnState(isLiked) {
    if (isLiked) {
      this._currentCardLikeBtn.classList.add("button_active");
      this._cardIsLikedByMe = true;
    } else {
      this._currentCardLikeBtn.classList.remove("button_active");
      this._cardIsLikedByMe = false;
    }
  }

  _deleteDomElement() {
    this._currentElement.remove();
    //При удалении экземпляра класса его дополнительно после удаления нужно занулять.
    //remove удаляет только разметку из html, сам объект карточки остается в памяти
    this._currentElement = null;
  }

  _setEventListeners() {
    this._currentCardPicture.addEventListener("click", () =>
      this._handleOnCardClick(this._cardData.name, this._cardData.link)
    );

    this._imageDeleteBtn = this._currentElement.querySelector(".button_type_delete");
    this._imageDeleteBtn.addEventListener("click", () => {
      this._handleDeleteBtnClick(this._cardData._id, this._deleteDomElement.bind(this));
    });

    this._currentCardLikeBtn.addEventListener("click", () => {
      this._handleLikeCard(
        this._cardIsLikedByMe,
        this._cardData._id,
        this._currentCardLikeCounter,
        this._setLikeBtnState.bind(this)
      );
    });
  }

  //метод формирования DOM-элемента карточки из template и навешивание слушателей
  createElementNode() {
    this._currentElement = this._template.content.querySelector(".element").cloneNode(true);

    this._currentCardName = this._currentElement.querySelector(".element__caption");
    this._currentCardName.textContent = this._cardData.name;

    this._currentCardPicture = this._currentElement.querySelector(".element__image");
    this._currentCardPicture.alt = this._cardData.name;
    this._currentCardPicture.src = this._cardData.link;

    this._currentCardLikeCounter = this._currentElement.querySelector(".element__like-count");
    this._currentCardLikeCounter.textContent = this._cardData.likes.length;

    this._currentCardLikeBtn = this._currentElement.querySelector(".button_type_like");

    this._cardIsLikedByMe = this._cardData.likes.some((userData) => {
      return userData._id == this._myIdentificator;
    });
    if (this._cardIsLikedByMe) {
      this._setLikeBtnState(true);
    }

    this._currentDeleteButton = this._currentElement.querySelector(".button_type_delete");
    if (this._cardData.owner._id !== this._myIdentificator) {
      this._currentDeleteButton.classList.add("button_hidden");
    }

    this._setEventListeners();

    return this._currentElement;
  }
}
