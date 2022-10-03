let currentPopup = null;

const editProfileBtn = document.querySelector('.button_type_edit');
const newCardBtn = document.querySelector('.button_type_add');

const profileName = document.querySelector('.profile__name');
const profileOccupation = document.querySelector('.profile__occupation');

const PopupInputName = document.querySelector('.popup__input_type_profile-name');
const PopupInputOccupation = document.querySelector('.popup__input_type_profile-occupation');

const PopupInputPlace = document.querySelector('.popup__input_type_place-name');
const PopupInputImgLink = document.querySelector('.popup__input_type_image-link');

//переменные для отображаем список начальных карточек
const elementsContainer = document.querySelector(".elements__list");
const template = document.querySelector(".template");


//функция формирования DOM элемента из template
const createElementNode = (name, link) => {
  const currentElement = template.content.cloneNode(true);

  const currentName = currentElement.querySelector('.element__caption');
  currentName.textContent = name;

  const currentPicture = currentElement.querySelector('.element__image');
  currentPicture.src = link;
  currentPicture.alt = name;
  currentPicture.addEventListener('click', handleOpenPopup);

  const deleteBtn = currentElement.querySelector('.button_type_delete');
  deleteBtn.addEventListener('click', handleDeleteCard);

  const likeBtn = currentElement.querySelector('.button_type_like');
  likeBtn.addEventListener('click', handleLikeCard);

  return currentElement;
}

//функция отрисовыввания начальных карточек
const render = () => {
  //современный метод замены всех дочерних элементов. поддерживается уже почти везде
  elementsContainer.replaceChildren();
  initialCards.forEach((card) => {
    const currentCard = createElementNode(card.name, card.link);
    elementsContainer.append(currentCard);
  })
}

//функция удаления карточки
const handleDeleteCard = (e) => {
  const currentCard = e.target.closest('.element');
  currentCard.remove();
}

//функция добавления like на карточке
const handleLikeCard = (e) => {
  const currentLikeBtn = e.target.closest('.button_type_like');
  currentLikeBtn.classList.toggle('button_active');
}


//функция закрытия формы редактирования профиля с сохранением
const handleSaveEdit = function (e) {
  e.preventDefault();
  currentPopup.classList.remove('popup_opened');
  profileName.textContent = PopupInputName.value;
  profileOccupation.textContent = PopupInputOccupation.value;
}

//функция закрытия формы с сохранением
const handleAddCard = function (e) {
  e.preventDefault();
  currentPopup.classList.remove('popup_opened');
  initialCards.unshift({name: PopupInputPlace.value, link: PopupInputImgLink.value});
  render();
}


//универсальная функция открытия форм
const handleOpenPopup = (e) => {


  //если кликнули по кнопке edit редактирования профиля
  if (e.target.classList.contains('button_type_edit')) {
    currentPopup = document.querySelector('.popup_type_profile-edit');
    PopupInputName.value = profileName.textContent;
    PopupInputOccupation.value = profileOccupation.textContent;

    currentPopup.addEventListener('submit', handleSaveEdit);
  }

  //если кликнули по кнопке add добавления карточки
  if (e.target.classList.contains('button_type_add')) {
    currentPopup = document.querySelector('.popup_type_add-card');
    PopupInputPlace.value = 'Архыз';
    PopupInputImgLink.value = './images/place_2016arhys.jpg';

    currentPopup.addEventListener('submit', handleAddCard);
  }

  //если кликнули по картинке карточки
  if (e.target.classList.contains('element__image')) {
    currentPopup = document.querySelector('.popup_type_card-view');
    currentPopup.classList.add('popup_opened');

    const currentPopupImgEl = currentPopup.querySelector('.popup__image');
    currentPopupImgEl.src = e.target.src;
    currentPopupImgEl.alt = e.target.alt;

    const currentCard = e.target.closest('.element'); //ищем ближайшего родителя, дом элемент всей карточки, по которой кликнули
    const currentCardCaption = currentCard.querySelector('.element__caption'); //теперь в полученной карточке ищем подпись к картинке, хотя можно было взять из e.target.alt;
    const currentPopupCaption = currentPopup.querySelector('.popup__image-caption');
    currentPopupCaption.textContent = currentCardCaption.textContent;
  }


  currentPopup.classList.add('popup_opened');
  const closeButton = currentPopup.querySelector('.popup__close');
  closeButton.addEventListener('click', handleСlosePopup);
}



//функция закрытия формы без сохранения
const handleСlosePopup = function () {
  currentPopup.classList.remove('popup_opened');
  currentPopup = null;
}

newCardBtn.addEventListener('click', handleOpenPopup);
editProfileBtn.addEventListener('click', handleOpenPopup);




//вызываем функцию начальной отрисовки карточек
render();
