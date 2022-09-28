export class Section {
  constructor(renderer, containerSelector) {
    this.renderer = renderer;
    this.containerSelector = containerSelector
  };

  renderAllElements(elements) {
    this._renderedElements = []

    elements.forEach(element => {
      this._renderedElements.push(this.renderer(element))
    });

  }

  addElementsOnPage() {
    this._renderedElements.forEach(element => {
      this.containerSelector.prepend(element)
    })
  }

  addNewElementOnPage(element){
    this.containerSelector.prepend(element)
  }
}