/**
 * @typedef {object} CartItem
 * @property {number} id
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

  addItem(id) {
    this.state.cartItem = [...this.state.cartItem, {
      id,
      count: 1
    }]
  }

  increase(id) {
    this.state.cartItem = this.state.cartItem.map(item => {
      if (item.id === id) {
        item.count += 1
        return item
      } else {
        return item
      }
    })
  }

  decrease(id) {

    this.state.cartItem = this.state.cartItem.map(item => {
      if (item.id === id) {
        item.count -= 1
        if (item.count > 0) {
          return item
        } else {
          return null
        }
      } else {
        return item
      }
    }).filter(item => item)
  }

  setCount(id, value) {
    this.state.cartItem = this.state.cartItem.map(item => {
      if (item.id === id) {
        item.count = Number(value)
        return item
      } else {
        return item
      }
    })
  }

  /**
   * @returns {CartItem}
   */
  get cartItemById() {
    return this.state.cartItem.reduce((acc, item) => {
      acc[item.id] = item
      return acc
    }, {})
  }

  removeItem(id) {
    this.state.cartItem = this.state.cartItem.filter(item => item.id !== id)
  }
}

const cartStore = new CartStore()
export default cartStore

