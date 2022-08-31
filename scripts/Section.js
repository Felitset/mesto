export class Section {
    constructor({items, renderer}, containerSelector) {
      this.items = items;
      this.renderer = renderer;
      this.containerSelector = containerSelector
    };

    createAllElements(){
        this.items.forEach(element => {this.addItem(this.renderer(element))
        });
    }

    addItem(item) {
      this.containerSelector.prepend(item)
    }
}