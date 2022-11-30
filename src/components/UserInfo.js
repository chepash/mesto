export class UserInfo {
  constructor({ profileNameSelector, profileAboutSelector }) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileAbout = document.querySelector(profileAboutSelector);
  }

  getUserInfo() {
    const userData = {};
    //"profileName" и "profileAbout" прописаны в name инпутов попапа popup_type_profile
    //чтобы связать с методом setInputValues класса PopupWithForm
    userData.profileName = this._profileName.textContent;
    userData.profileAbout = this._profileAbout.textContent;
    return userData;
  }

  setUserInfo(name, about) {
    this._profileName.textContent = name;
    this._profileAbout.textContent = about;
  }
}
