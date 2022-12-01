class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;

    this._container = document.querySelector(containerSelector);
  }

  renderItems(initialCardsFromServer, myIdentificator) {
    initialCardsFromServer.forEach((item) => this._renderer(item, myIdentificator));
  }

  addItemAfterLastOne(element) {
    this._container.append(element);
  }

  addItemBeforeFirstOne(element) {
    this._container.prepend(element);
  }
}

export { Section };
