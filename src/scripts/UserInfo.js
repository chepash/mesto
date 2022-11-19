export class UserInfo {
  constructor({ profileNameSelector, profileOccupationSelector }) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileOccupation = document.querySelector(profileOccupationSelector);
  }

  getUserInfo() {
    const userData = {};
    userData.profileName = this._profileName.textContent;
    userData.profileOccupation = this._profileOccupation.textContent;
    return userData;
  }

  setUserInfo(name, occupation) {
    this._profileName.textContent = name;
    this._profileOccupation.textContent = occupation;
  }
}
