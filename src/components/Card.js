export class Card {
  constructor(options) {
    this._cardData = options.cardData;
    this._template = document.querySelector(options.templateSelector);

    this._myId = options.myId;

    this._handleOnCardClick = options.handleOnCardClick;
    this._handleDeleteBtnClick = options.handleDeleteBtnClick;
    this._handleLikeCard = options.handleLikeCard;
  }

  _setLikeBtnStateWithCounts(isLiked, countsOfLikesFromServer) {
    if (isLiked) {
      this._isCardLikedByMe = true;
      this._currentCardLikeBtn.classList.add("button_active");
    } else {
      this._isCardLikedByMe = false;
      this._currentCardLikeBtn.classList.remove("button_active");
    }

    this._currentCardLikeCounterEl.textContent = countsOfLikesFromServer;
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

    this._currentCardDeleteButton.addEventListener("click", () => {
      this._handleDeleteBtnClick(this._cardData._id, this._deleteDomElement.bind(this));
    });

    this._currentCardLikeBtn.addEventListener("click", () => {
      this._handleLikeCard(
        this._isCardLikedByMe,
        this._cardData._id,
        this._setLikeBtnStateWithCounts.bind(this)
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

    this._currentCardLikeBtn = this._currentElement.querySelector(".button_type_like");

    this._currentCardLikeCounterEl = this._currentElement.querySelector(".element__like-count");
    this._isCardLikedByMe = this._cardData.likes.some((userData) => {
      return userData._id == this._myId;
    });
    if (this._isCardLikedByMe) {
      this._setLikeBtnStateWithCounts(true, this._cardData.likes.length);
    } else {
      this._setLikeBtnStateWithCounts(false, this._cardData.likes.length);
    }

    this._currentCardDeleteButton = this._currentElement.querySelector(".button_type_delete");
    if (this._cardData.owner._id !== this._myId) {
      this._currentCardDeleteButton.classList.add("button_hidden");
    }

    this._setEventListeners();

    return this._currentElement;
  }
}
