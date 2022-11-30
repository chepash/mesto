class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;

    this._container = document.querySelector(containerSelector);
  }

  renderItems(initialCardsFromServer, myIdentificator) {
    initialCardsFromServer.forEach((item) => this._renderer(item, myIdentificator));
  }

  addItem(element) {
    this._container.prepend(element);
  }
}

export { Section };
