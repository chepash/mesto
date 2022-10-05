//находим все попапы
const profilePopup = document.querySelector('.popup_type_profile');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

//кнопки
const profileEditBtn = document.querySelector('.button_type_edit');
const cardAddBtn = document.querySelector('.button_type_add');

//данные профиля со страницы
const profileName = document.querySelector('.profile__name');
const profileOccupation = document.querySelector('.profile__occupation');

//формы
const profilePopupForm = profilePopup.querySelector('.popup__form');
const cardPopupForm = cardPopup.querySelector('.popup__form');

//кнопки закрытия
const profilePopupCloseBtn = profilePopup.querySelector('.button_type_close');
const cardPopupCloseBtn = cardPopup.querySelector('.button_type_close');
const imagePopupCloseBtn = imagePopup.querySelector('.button_type_close');

//все инпуты
const profilePopupInputName = profilePopup.querySelector('.popup__input_type_profile-name');
const profilePopupInputOccupation = profilePopup.querySelector('.popup__input_type_profile-occupation');
const cardPopupInputPlace = cardPopup.querySelector('.popup__input_type_place-name');
const cardPopupInputLink = cardPopup.querySelector('.popup__input_type_image-link');

//переменные для отображения начальных карточек
const elementsContainer = document.querySelector(".elements__list");
const template = document.querySelector(".template");

//функция появления формы
const openPopup = (currentPopup) => {
  currentPopup.classList.add('popup_opened');
}

//функция закрытия формы без сохранения
const closePopup = (e) => {
  e.target.closest('.popup').classList.remove('popup_opened');
}

//функция-обработчик добавления like на карточке
const handleLikeCard = (e) => {
  const currentLikeBtn = e.target;
  currentLikeBtn.classList.toggle('button_active');
}

//функция-обработчик закрытия формы редактирования профиля с сохранением
const handleSaveEdit = function (e) {
  e.preventDefault();
  profileName.textContent = profilePopupInputName.value;
  profileOccupation.textContent = profilePopupInputOccupation.value;
  closePopup(e);
}



//функция-обработчик клика по кнопке edit (редактирования профиля)
const handleProfileEditBtnClick = () => {
  profilePopupInputName.value = profileName.textContent;
  profilePopupInputOccupation.value = profileOccupation.textContent;
  openPopup(profilePopup);
}

//функция-обработчик клика по кнопке add (добавления карточки)
const handleCardAddBtnClick = () => {
  cardPopupInputPlace.value = '';
  cardPopupInputLink.value = '';
  openPopup(cardPopup);
}

//функция-обработчик клика по картинке
const handleCardClick = (currentPictureData) => {
  const imagePopupImageEl = imagePopup.querySelector('.popup__image');
  imagePopupImageEl.alt = currentPictureData.name;
  imagePopupImageEl.src = currentPictureData.link;

  const imagePopupCaption = imagePopup.querySelector('.popup__image-caption');
  imagePopupCaption.textContent = currentPictureData.name;

  openPopup(imagePopup);
}


//функция формирования DOM элемента из template
const createElementNode = (cardData) => {
  const currentElement = template.content.cloneNode(true);

  const currentName = currentElement.querySelector('.element__caption');
  currentName.textContent = cardData.name;

  const currentPicture = currentElement.querySelector('.element__image');
  currentPicture.alt = cardData.name;
  currentPicture.src = cardData.link;
  currentPicture.addEventListener('click', () => handleCardClick({name: cardData.name, link: cardData.link}));//вместо передаваемого event создаём слушатель сразу с данными текущей карточки

  const imageDeleteBtn = currentElement.querySelector('.button_type_delete');
  imageDeleteBtn.addEventListener('click', handleDeleteCard);

  const imageLikeBtn = currentElement.querySelector('.button_type_like');
  imageLikeBtn.addEventListener('click', handleLikeCard);

  return currentElement;
}

//функция отрисовыввания начальных карточек
const render = () => {
  initialCards.forEach((initialCardsItem) => {
    const currentCard = createElementNode(initialCardsItem);
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
  const newCard = createElementNode({name: cardPopupInputPlace.value, link: cardPopupInputLink.value});
  elementsContainer.prepend(newCard);
  closePopup(e);
}


//вешаем слушатели на интерактивные элементы
profileEditBtn.addEventListener('click', handleProfileEditBtnClick);
cardAddBtn.addEventListener('click', handleCardAddBtnClick);

profilePopupForm.addEventListener('submit', handleSaveEdit);
cardPopupForm.addEventListener('submit', handleAddCard);

profilePopupCloseBtn.addEventListener('click', closePopup);
cardPopupCloseBtn.addEventListener('click', closePopup);
imagePopupCloseBtn.addEventListener('click', closePopup);


//вызываем функцию начальной отрисовки карточек
render();
