class Section {
  constructor(options) {
    this._renderer = options.renderer;

    this._container = document.querySelector(options.containerSelector);
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
