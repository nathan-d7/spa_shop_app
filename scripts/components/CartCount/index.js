import { createElement } from "../../utils/index.js"

class CartCount {
  constructor(store) {
    store.subscribe((_a, _b, newValue) => {
      this.createCount(store.state.cartItem.length, newValue)
    })

    this.item = createElement(
      'div',
      {
        className: 'cartCount'
      }
    )

    this.createCount(0, null)
  }

  /**
   * 
   * @param {number} count 
   * @param {import("../../store/cartStore.js").CartItem[]} value 
   */
  createCount(count, value) {
    this.item.innerHTML = ''
    const counter = createElement('a', { href: '#cart' },
      '(',
      `${count}`,
      ' | ',
      `${value ? value.reduce((acc, cartItem) => acc += cartItem.count * cartItem.item.price, 0) : 0}`,
      '$)'
    )
    this.item.append(counter)
  }

  render() {
    return this.item
  }
}

export default CartCount