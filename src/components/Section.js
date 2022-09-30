export class Section {
  constructor(renderer, containerSelector) {
    this.renderer = renderer;
    this.containerSelector = containerSelector
  };

  renderAllElements(elements) {
    this._renderedElements = []

    elements.forEach(element => {
      this.renderer(element, this.containerSelector)
    });
  }

  addNewElementOnPage(element) {
    this.renderer(element, this.containerSelector)
  }
}