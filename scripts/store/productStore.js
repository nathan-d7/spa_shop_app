/**
 * @typedef {object} state
 * @property {import("../pages/Catalog-page").ShopData[]} productItems
 */

class ProductStore {
  constructor() {
    /** @type {state} */
    this.state = {
      productItems: [],
      visibleItems: []
    }

    this.state = new Proxy(this.state, {
      set: (target, prop, value) => {
        const oldValue = target[prop]
        target[prop] = value

        this.notify(prop, oldValue, value)
        return true
      }
    })

    this.subcribes = []
  }

  subscribe(callback) {
    this.subcribes.push(callback)
  }

  notify(prop, oldValue, newValue) {
    this.subcribes.forEach(cd => cd(prop, oldValue, newValue))
  }

  async findAll() {
    try {
      const responce = await fetch('https://fakestoreapi.com/products')

      if (!responce.ok) {
        throw new Error('Не получилось получить данные')
      }

      const data = await responce.json()
      this.setAll(data)
      this.setAll(data)
    } catch (error) {
      console.log(error.message)
    }
  }

  filterByTitle(value) {

    this.state.visibleItems = !value
      ? this.state.productItems
      : this.state.productItems.filter(item => item.title.toLowerCase().includes(value))
  }

  setAll(items) {
    this.state.productItems = items
    this.state.visibleItems = items
  }

  get productById() {
    return this.state.productItems.reduce((acc, item) => {
      acc[item.id] = item
      return acc
    }, {})
  }

}

const productStore = new ProductStore()
export default productStore

