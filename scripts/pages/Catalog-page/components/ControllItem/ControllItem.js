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
        className: 'countButton increaseButton'
      }, '+')

      const count = createElement('div', {
        className: 'count',
        contentEditable: true,
        onKeyPress: (e) => {
          const key = e.key
          const value = e.target.innerText

          if(isNaN(+key) && key !== 'Backspace') {
            e.target.contentEditable = false
          }

          e.target.contentEditable = true

          if (isNaN(value)) return
          if (+value < 1) return
          if (key !== 'Enter') return
        
          cartStore.setCount(this.data.id, value)
        },
        onBlur: (e) => {
          const value = e.target.innerHTML
          cartStore.setCount(this.data.id, value)
        }
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
      }, 'Remove')

      this.item.append(countContainer, remove)
    } else {
      const button = createElement(
        'button',
        {
          className: 'addToCartButton',
          onClick: () => cartStore.addItem(this.data.id)
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

export default ControllItem