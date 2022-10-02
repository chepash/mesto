let currentPopup = null;

const editProfileBtn = document.querySelector('.button_type_edit');
const newCardBtn = document.querySelector('.button_type_add');


//const saveButton = document.querySelector('.button_type_save');

const profileName = document.querySelector('.profile__name');
const profileOccupation = document.querySelector('.profile__occupation');

const PopupInputName = document.querySelector('.popup__input_type_profile-name');
const PopupInputOccupation = document.querySelector('.popup__input_type_profile-occupation');

const PopupInputPlace = document.querySelector('.popup__input_type_place-name');
const PopupInputImgLink = document.querySelector('.popup__input_type_image-link');

//переменные для отображаем список начальных карточек
const elementsContainer = document.querySelector(".elements__list");
const template = document.querySelector(".template");




//функция закрытия формы редактирования профиля с сохранением
const saveEdit = function (e) {
  e.preventDefault();
  currentPopup.classList.remove('popup_opened');
  profileName.textContent = PopupInputName.value;
  profileOccupation.textContent = PopupInputOccupation.value;
}

//функция закрытия формы с сохранением
const addCard = function (e) {
  e.preventDefault();
  currentPopup.classList.remove('popup_opened');
  initialCards.unshift({name: PopupInputPlace.value, link: PopupInputImgLink.value});
  render();
}




//универсальная функция открытия форм
const openPopup = (e) => {
  //если кликнули по кнопке edit редактирования профиля
  if (e.target.classList.contains('button_type_edit')) {
    currentPopup = document.querySelector('.popup_type_profile-edit');
    PopupInputName.value = profileName.textContent;
    PopupInputOccupation.value = profileOccupation.textContent;

    currentPopup.addEventListener('submit', saveEdit);
  }

  //если кликнули по кнопке add добавления карточки
  if (e.target.classList.contains('button_type_add')) {
    currentPopup = document.querySelector('.popup_type_add-card');
    PopupInputPlace.value = 'Архыз';
    PopupInputImgLink.value = './images/place_2016arhys.jpg';

    currentPopup.addEventListener('submit', addCard);
  }

  //если кликнули по карточке
  // if (e.target.classList.contains('')) {
  //   currentPopup = document.querySelector('.popup_type_add-card');
  //   currentPopup.classList.add('popup_opened');
  // }


  currentPopup.classList.add('popup_opened');
  const closeButton = currentPopup.querySelector('.popup__close');
  closeButton.addEventListener('click', closePopup);
}



//функция закрытия формы без сохранения
const closePopup = function () {
  currentPopup.classList.remove('popup_opened');
  currentPopup = null;
}

newCardBtn.addEventListener('click', openPopup);
editProfileBtn.addEventListener('click', openPopup);

















//функция отрисовыввания начальных карточек
const render = () => {

  //новый метод замены всех дочерних элементов на что-тоновое
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

//функция добавления like на карточку
const handleLikeCard = (e) => {
  const currentBtn = e.target.closest('.button_type_like');
  currentBtn.classList.toggle('button_active');
}

//функция формирования DOM элемента из template
const createElementNode = (name, link) => {
  const currentElement = template.content.cloneNode(true);
  const currentName = currentElement.querySelector('.element__caption');
  const currentPicture = currentElement.querySelector('.element__image');

  currentName.textContent = name;
  currentPicture.src = link;
  currentPicture.alt = name;

  const deleteBtn = currentElement.querySelector('.button_type_delete');
  deleteBtn.addEventListener('click', handleDeleteCard);

  const likeBtn = currentElement.querySelector('.button_type_like');
  likeBtn.addEventListener('click', handleLikeCard);

  return currentElement;
}





render();
