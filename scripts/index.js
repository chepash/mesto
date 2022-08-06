const popup = document.querySelector('.popup');
const editButton = document.querySelector('.button_type_edit');
const closeButton = document.querySelector('.popup__close');
const saveButton = document.querySelector('.button_type_save');

const profileName = document.querySelector('.profile__name');
const profileOccupation = document.querySelector('.profile__occupation');

const PopupInputName = document.querySelector('.popup__input_type_profile-name');
const PopupInputOccupation = document.querySelector('.popup__input_type_profile-occupation');


const openPopup = function () {
  popup.classList.add('popup_opened');
  PopupInputName.value = profileName.textContent;
  PopupInputOccupation.value = profileOccupation.textContent;
}

const closePopup = function () {
  popup.classList.remove('popup_opened');
}

const saveEdit = function () {
  popup.classList.remove('popup_opened');
  profileName.textContent = PopupInputName.value;
  profileOccupation.textContent = PopupInputOccupation.value;
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
saveButton.addEventListener('click', saveEdit);

