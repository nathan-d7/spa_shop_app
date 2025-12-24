import cartStore from "../../store/cartStore.js"
import productStore from "../../store/productStore.js"
import { createElement } from "../../utils/index.js"

class CartPage {
  constructor() {
    this.item = document.createElement('div')
    this.item.classList.add('container')

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

    if (!cartStore.state.cartItem.length) {
      this.cartContainer.innerHTML = '<h2>Корзина пуста!</h2>'
      return
    }

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
          }))
        ),
        createElement('button', { className: 'removecart', onClick: () => cartStore.removeItem(data.id) }, 'Убрать из карзины')
      )

      this.cartContainer.append(cartItem)
    })
  }

  render() {
    return this.item
  }
}

export default CartPage