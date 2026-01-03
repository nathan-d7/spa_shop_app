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

    const counter = createElement('div', {className: 'cartBox'}, 
      createElement('a', {href: '#cart'}, 
        createElement('div', {className: 'itemsCountBox'}, 
          createElement('img', {src: 'images/icons/cart_ico.png'}),
          createElement('span', {className: 'itemsCount'},
            cartStore.state.cartItem.reduce((acc, cartItem) => acc += cartItem.count, 0)
        )
        ),
        createElement('span', {className: 'cartTotalPrice'},
          cartStore.state.cartItem.reduce((acc, cartItem) => acc += cartItem.count * productStore.productById[cartItem.id].price, 0).toLocaleString('ru-RU', {
            style: 'currency',
            currency: 'USD'
          })
        )
      )
    )

    // const counter = createElement('a', { href: '#cart' },
    //   '(',
    //   `${cartStore.state.cartItem.reduce((acc, cartItem) => acc += cartItem.count, 0)}`,
    //   ' | ',
    //   `${
    //   // new Intl.NumberFormat('ru-RU', { style: "currency", currency: "USD" })
    //   //   .format(
    //   //     cartStore.state.cartItem.reduce((acc, cartItem) => acc += cartItem.count * productStore.productById[cartItem.id].price, 0)
    //   //   )
    //   cartStore.state.cartItem.reduce((acc, cartItem) => acc += cartItem.count * productStore.productById[cartItem.id].price, 0).toLocaleString('ru-RU', {
    //     style: 'currency',
    //     currency: 'USD'
    //   })
    //   }`,')'
    // )
    this.item.append(counter)
  }

  render() {
    return this.item
  }
}

export default CartCount