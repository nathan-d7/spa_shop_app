class CardPage {
  constructor() {
    this.item = document.createElement('div')
    this.item.classList.add('container')
    this.item.innerHTML = `
      <h2>Card</h2>
    `
  }

  render () {
    return this.item
  }
}

export default CardPage