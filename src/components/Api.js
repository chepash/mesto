export class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.authToken = options.headers.authorization;
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: {
        authorization: this.authToken,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(res.status);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
    // .finally((result) => {
    //   console.log(result);
    // });
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
        authorization: this.authToken,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(res.status);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
    // .finally((result) => {
    //   console.log(result);
    // });
  }
}
