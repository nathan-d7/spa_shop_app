import cartStore from "../../store/cartStore.js"
import productStore from "../../store/productStore.js"
import { createElement } from "../../utils/index.js"
import cookieStore from "../../store/cookieStore.js"

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

    try {

      let cookieLength = document.cookie.length
      
      if(cookieLength && !cartStore.state.cartItem.length) {
        const cookie = cookieStore.getCookie('cartItems')
        this.cookieData = JSON.parse(cookie)

        this.totalPrice = createElement('span', {className: 'cartTotalPrice'}, 
           this.cookieData.reduce((acc, cartItem) => acc += cartItem.count * productStore.productById[cartItem.id].price, 0).toLocaleString('ru-RU', 
          {
            style: 'currency',
            currency: 'USD'
          })
        )
        this.itemsCounter = createElement('span', {className: 'itemsCount'}, this.cookieData.reduce((acc, cartItem) => acc += cartItem.count, 0))
      }

      if(!cookieLength && !cartStore.state.cartItem.length) {
         this.totalPrice = createElement('span', {className: 'cartTotalPrice'}, 
           cartStore.state.cartItem.reduce((acc, cartItem) => acc += cartItem.count * productStore.productById[cartItem.id].price, 0).toLocaleString('ru-RU', 
          {
            style: 'currency',
            currency: 'USD'
          })
        )
        
        this.itemsCounter = createElement('span', {className: 'itemsCount'}, cartStore.state.cartItem.reduce((acc, cartItem) => acc += cartItem.count, 0))
      }

      if((!cookieLength && cartStore.state.cartItem.length) || (cookieLength && cartStore.state.cartItem.length)) {
         this.totalPrice = createElement('span', {className: 'cartTotalPrice'}, 
           cartStore.state.cartItem.reduce((acc, cartItem) => acc += cartItem.count * productStore.productById[cartItem.id].price, 0).toLocaleString('ru-RU', 
          {
            style: 'currency',
            currency: 'USD'
          })
        )
        
        this.itemsCounter = createElement('span', {className: 'itemsCount'}, cartStore.state.cartItem.reduce((acc, cartItem) => acc += cartItem.count, 0))
      }
    } catch (error) {
        console.log(error.message)
    }

    const counter = createElement('div', {className: 'cartBox'}, 
      createElement('a', {href: '#cart'}, 
        createElement('div', {className: 'itemsCountBox'}, 
          createElement('img', {src: 'images/icons/cart_ico.png'}),
          this.itemsCounter
        ),
        this.totalPrice
      )
    )
    
    this.item.append(counter)
  }

  render() {
    return this.item
  }
}

export default CartCount