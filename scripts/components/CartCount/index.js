import cartStore from "../../store/cartStore.js"
import productStore from "../../store/productStore.js"
import { createElement } from "../../utils/index.js"

class CartCount {
  constructor() {
    cartStore.subscribe(() => {
      this.createCount()
    })

    productStore.subscribe(() => {
      this.createCount()
    })

    this.item = createElement(
      'div',
      {
        className: 'cartCount'
      }
    )



    this.createCount()
  }

  getData() {
    if (!productStore.state.productItems.length) {
      productStore.findAll()
    }
  }

  /**
   * 
   * @param {number} count 
   * @param {import("../../store/cartStore.js").CartItem[]} value 
   */
  createCount() {
    this.item.innerHTML = ''
    const counter = createElement('a', { href: '#cart' },
      '(',
      `${cartStore.state.cartItem.length}`,
      ' | ',
      `${cartStore.state.cartItem.reduce((acc, cartItem) => acc += cartItem.count * productStore.productById[cartItem.id].price, 0).toFixed(2)}`,
      '$)'
    )
    this.item.append(counter)
  }

  render() {
    return this.item
  }
}

export default CartCount