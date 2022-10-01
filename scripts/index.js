const popup = document.querySelector('.popup');

const editButton = document.querySelector('.button_type_edit');
const closeButton = document.querySelector('.popup__close');
const saveButton = document.querySelector('.button_type_save');

const profileName = document.querySelector('.profile__name');
const profileOccupation = document.querySelector('.profile__occupation');

const PopupInputName = document.querySelector('.popup__input_type_profile-name');
const PopupInputOccupation = document.querySelector('.popup__input_type_profile-occupation');

//переменные для отображаем список начальных карточек
const elementsContainer = document.querySelector(".elements__list");
const template = document.querySelector(".template");

// открытие и закрытие формы без сохранения
const openPopup = function () {
  popup.classList.add('popup_opened');
  PopupInputName.value = profileName.textContent;
  PopupInputOccupation.value = profileOccupation.textContent;
}

const closePopup = function () {
  popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);


// закрытие формы с сохранением
const saveEdit = function (event) {
  event.preventDefault();
  popup.classList.remove('popup_opened');
  profileName.textContent = PopupInputName.value;
  profileOccupation.textContent = PopupInputOccupation.value;
}

popup.addEventListener('submit', saveEdit);


//функция отрисовыввания начальных карточек
const render = () => {
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

//функция формирования DOM элемента из template
const createElementNode = (name, link) => {
  const currentElement = template.content.cloneNode(true);
  const currentName = currentElement.querySelector(".element__caption");
  const currentPicture = currentElement.querySelector(".element__image");

  currentName.textContent = name;
  currentPicture.src = link;
  currentPicture.alt = name;

  const deleteBtn = currentElement.querySelector(".button_type_delete");
  deleteBtn.addEventListener('click', handleDeleteCard);

  return currentElement;
}



render();
