/**
 * @typedef {object} CartItem
 * @property {import("../pages/Catalog-page").ShopData} item
 * @property {number} count
 */

/**
 * @typedef {object} state
 * @property {CartItem[]} cartItem
 */

class CartStore {

  constructor() {
    /** @type {state} */
    this.state = {
      cartItem: []
    }
    this.state = new Proxy(this.state, {
      set: (target, prop, value) => {
        const oldValue = target[prop]
        target[prop] = value

        this.notyfy(prop, oldValue, value)
        return true
      }
    })

    this.subcribes = []
  }

  subscribe(callback) {
    this.subcribes.push(callback)
  }

  notyfy(prop, oldValue, newValue) {
    this.subcribes.forEach(cd => cd(prop, oldValue, newValue))
  }

  addItem(item) {
    this.state.cartItem = [...this.state.cartItem, {
      item,
      count: 1
    }]
  }

  removeItem(id) {
    this.state.cartItem = this.state.cartItem.map(item => item.item.id !== id)
  }
}

const cartStore = new CartStore()
export default cartStore