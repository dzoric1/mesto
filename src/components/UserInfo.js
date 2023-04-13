class UserInfo {
  constructor({ profileNameSelector, profileJobSelector }) {
    this._name = document.querySelector(profileNameSelector);
    this._job = document.querySelector(profileJobSelector);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      job: this._job.textContent
    }
  }

  setUserInfo({ name, about }) {
    this._name.textContent = name;
    this._job.textContent = about;
  }
}

export default UserInfo;