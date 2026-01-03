import cartStore from "../../store/cartStore.js"
import productStore from "../../store/productStore.js"
import { createElement } from "../../utils/index.js"
import CookieStore from "../../store/cookieStore.js";
import CartItemControls from "./components/CartItemsControls.js";

class CartPage {
  constructor() {
    this.item = document.createElement('div')
    this.item.classList.add('container')

    this.checkCookie = false

    this.cartContainer = createElement('div', { className: 'cartContainer' })

    this.item.append(this.cartContainer)

    cartStore.subscribe(() => {
      this.createCart()
    })

    productStore.subscribe(() => {
      this.createCart()
    })

    this.createCart()
  }

  getData() {
    if (!productStore.state.productItems.length) {
      productStore.findAll()
    }
  }

  createCart() {
    this.cartContainer.innerHTML = ''

    const cookies = new CookieStore()

    if (!cartStore.state.cartItem.length && !cookies.getCookie('cartItems')) {
      this.cartContainer.innerHTML = '<h2>The cart is empty!</h2>'
      return
    }

    if (!this.checkCookie) {
      const cookie = cookies.getCookie('cartItems')

    if (cookie && !cartStore.state.cartItem.length) {
        const cookieData = JSON.parse(cookie)

        cookieData.forEach((item) => {
        cartStore.state.cartItem.push(item)
      })

    } 
      this.checkCookie = true
    }


    if (!productStore.state.productItems.length) {
      this.getData()
      return
    }   

    console.log(cartStore.state.cartItem)

    cartStore.state.cartItem.forEach(cart => {
      const data = productStore.productById[cart.id]

      const cartItem = createElement(
        'div',
        {
          className: 'cartItem'
        },
        createElement('div', { className: 'cartImg' }, createElement('img', { src: data.image, alt: data.title })),
        createElement('div', { className: 'cartItemContent' },
          createElement('h3', { className: 'cartTitle' },
            createElement('a', { href: `#catalog/${data.id}` }, data.title)
          ),
          createElement('p', { className: 'cartCategory' }, data.category),
          createElement('p', { className: 'cartPrice' }, (data.price * cart.count).toLocaleString('ru-RU', {
            style: 'currency',
            currency: 'USD'
          })),
          new CartItemControls(data.id).render()
        )
        // createElement('button', { className: 'removecart', onClick: () => cartStore.removeItem(data.id) }, 'Убрать из карзины')
      )

      this.cartContainer.append(cartItem)
    })
  }

  render() {
    return this.item
  }
}

export default CartPage