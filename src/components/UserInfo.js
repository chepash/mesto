export class UserInfo {
  constructor({ profileNameSelector, profileAboutSelector, profileAvatarSelector }) {
    this._profileNameEl = document.querySelector(profileNameSelector);
    this._profileAboutEl = document.querySelector(profileAboutSelector);
    this.profileAvatarEl = document.querySelector(profileAvatarSelector);
  }

  getUserInfo() {
    const userData = {};
    //"profileName" и "profileAbout" прописаны в name инпутов попапа popup_type_profile
    //чтобы связать с методом setInputValues класса PopupWithForm
    userData.profileName = this._profileNameEl.textContent;
    userData.profileAbout = this._profileAboutEl.textContent;
    return userData;
  }

  setUserAvatar(url) {
    this.profileAvatarEl.src = url;
  }

  setUserInfo(name, about) {
    this._profileNameEl.textContent = name;
    this._profileAboutEl.textContent = about;
  }
}
