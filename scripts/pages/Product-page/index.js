import productStore from "../../store/productStore.js"

class ProductPage {
  constructor(id) {
    this.item = document.createElement('div')
    this.item.classList.add('container')
    this.item.innerHTML = `
      <h2>Product ${id}</h2>
    `

    this.id = id

    productStore.subscribe(() => {
      this.renderData()
    })

    this.getData()
    this.renderData()
  }

  getData() {
    if (!productStore.state.productItems.length) {
      productStore.findAll()
    }
  }

  renderData() {
    if (!productStore.state.productItems.length) {
      return
    }

    this.item.innerHTML = `
      <h2>Product ${this.id}</h2>
      ${JSON.stringify(productStore.productById[this.id])}
    `
  }

  render() {
    return this.item
  }
}

export default ProductPage