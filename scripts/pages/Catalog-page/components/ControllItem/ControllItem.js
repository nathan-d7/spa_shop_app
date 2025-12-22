import cartStore from "../../../../store/cartStore.js"
import { createElement } from "../../../../utils/index.js"

class ControllItem {
  /**
   * 
   * @param {import("../..").ShopData} data 
   */
  constructor(data) {
    this.item = createElement('div', {
      className: 'controllButtons'
    })

    cartStore.subscribe(() => {
      this.createControll()
    })

    this.data = data
    this.createControll()
  }

  createControll() {
    this.item.innerHTML = ''

    if (cartStore.state.cartItem.some(item => item.id === this.data.id)) {
      // console.log(cartStore.cartItemById);

      const incraseButton = createElement('button', {
        onClick: () => cartStore.increase(this.data.id),
        className: 'countButton incraseButton'
      }, '+')

      const count = createElement('div', {
        className: 'count'
      }, `${cartStore.cartItemById[this.data.id].count}`)

      const decreaseButton = createElement('button', {
        onClick: () => cartStore.decrease(this.data.id),
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
        onClick: () => cartStore.removeItem(this.data.id)
      }, 'Удалить')

      this.item.append(countContainer, remove)
    } else {
      const button = createElement(
        'button',
        {
          onClick: () => cartStore.addItem(this.data.id)
        },
        'Добавить в корзину'
      )

      this.item.append(button)
    }
  }

  render() {
    return this.item
  }
}

export default ControllItem