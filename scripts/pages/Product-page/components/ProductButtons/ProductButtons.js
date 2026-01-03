import cartStore from "../../../../store/cartStore.js"
import { createElement } from "../../../../utils/index.js"

class ProductButtons {
  /**
   * 
   * @param {number} id 
   */
  constructor(id) {
    this.item = createElement('div', {
      className: 'controllButtons'
    })

    cartStore.subscribe(() => {
      this.createControll()
    })

    this.id = id
    this.createControll()
  }

  createControll() {
    this.item.innerHTML = ''

    if (cartStore.state.cartItem.some(item => item.id === this.id)) {
      // console.log(cartStore.cartItemById);

      const incraseButton = createElement('button', {
        onClick: () => cartStore.increase(this.id),
        className: 'countButton increaseButton'
      }, '+')

      const count = createElement('div', {
        className: 'count'
      }, `${cartStore.cartItemById[this.id].count}`)

      const decreaseButton = createElement('button', {
        onClick: () => cartStore.decrease(this.id),
        className: 'countButton decreaseButton'
      }, '-')

      const countContainer = createElement(
        'div',
        {
          className: 'countContainer'
        },
        decreaseButton,
        count,
        incraseButton
      )

      const remove = createElement('button', {
        className: 'removeButton',
        onClick: () => cartStore.removeItem(this.id)
      }, 'Remove')

      this.item.append(countContainer, remove)
    } else {
      const button = createElement(
        'button',
        {
          className: 'addToCartButton',
          onClick: () => cartStore.addItem(this.id)
        },
        'Add to cart'
      )

      this.item.append(button)
    }
  }

  render() {
    return this.item
  }
}

export default ProductButtons