let currentPopup = null;

const profileEditBtn = document.querySelector('.button_type_edit');
const newCardBtn = document.querySelector('.button_type_add');

const profileName = document.querySelector('.profile__name');
const profileOccupation = document.querySelector('.profile__occupation');

const popupInputName = document.querySelector('.popup__input_type_profile-name');
const popupInputOccupation = document.querySelector('.popup__input_type_profile-occupation');

const popupInputPlace = document.querySelector('.popup__input_type_place-name');
const popupInputImgLink = document.querySelector('.popup__input_type_image-link');

//переменные для отображаем список начальных карточек
const elementsContainer = document.querySelector(".elements__list");
const template = document.querySelector(".template");


//функция добавления like на карточке
const handleLikeCard = (e) => {
  const currentLikeBtn = e.target;
  currentLikeBtn.classList.toggle('button_active');
}

//функция закрытия формы редактирования профиля с сохранением
const handleSaveEdit = function (e) {
  e.preventDefault();
  currentPopup.classList.remove('popup_opened');
  profileName.textContent = popupInputName.value;
  profileOccupation.textContent = popupInputOccupation.value;
}

//универсальная функция открытия форм
const handleOpenPopup = (e) => {

  //если кликнули по кнопке edit редактирования профиля
  if (e.target.classList.contains('button_type_edit')) {
    currentPopup = document.querySelector('.popup_type_profile-edit');
    popupInputName.value = profileName.textContent;
    popupInputOccupation.value = profileOccupation.textContent;
    currentPopup.addEventListener('submit', handleSaveEdit);
  }

  //если кликнули по кнопке add добавления карточки
  if (e.target.classList.contains('button_type_add')) {
    currentPopup = document.querySelector('.popup_type_add-card');
    popupInputPlace.value = '';
    popupInputImgLink.value = '';
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
    const currentCardCaption = currentCard.querySelector('.element__caption'); //теперь в полученной карточке ищем подпись к картинке
    const currentPopupCaption = currentPopup.querySelector('.popup__image-caption');
    currentPopupCaption.textContent = currentCardCaption.textContent;
  }

  currentPopup.classList.add('popup_opened');
  const closeButton = currentPopup.querySelector('.popup__close');
  closeButton.addEventListener('click', handleСlosePopup);
}

//функция закрытия формы без сохранения
const handleСlosePopup = () => {
  currentPopup.classList.add('popup_closed'); //плавно закрываемся с помощью класса стиля

  // 0.3 секунды ждём пока закончится плавная анимация скрытия формы и чистим больше ненужные классы
  setTimeout(function(){
    currentPopup.classList.remove('popup_opened');
    currentPopup.classList.remove('popup_closed');
    currentPopup = null;
  }, 300);
}

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

//функция закрытия формы добавления карточки с сохранением
const handleAddCard = (e) => {
  e.preventDefault();
  initialCards.unshift({name: popupInputPlace.value, link: popupInputImgLink.value});

  currentPopup.classList.add('popup_closed'); //плавно закрываемся с помощью добавлени класса стиля
  // 0.3 секунды ждём пока закончится плавная анимация скрытия формы и чистим больше ненужные классы
  setTimeout(function(){
    currentPopup.classList.remove('popup_opened');
    currentPopup.classList.remove('popup_closed');
    currentPopup = null;
  }, 300);

  render();
}

newCardBtn.addEventListener('click', handleOpenPopup);
profileEditBtn.addEventListener('click', handleOpenPopup);

//вызываем функцию начальной отрисовки карточек
render();
