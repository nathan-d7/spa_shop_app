import cartStore from "../../../store/cartStore.js"
import { createElement } from "../../../utils/index.js"


class CartItemControls {

    constructor(id) {

        this.item = createElement('div', {
            className: 'controllButtons'
        })

        cartStore.subscribe(() => {
            this.createCartItemControls()
        });

        this.id = id
        this.createCartItemControls()
    }


    createCartItemControls() {
        this.item.innerHTML = ''

        if(cartStore.state.cartItem.some(item => item.id === this.id) && cartStore.cartItemById[this.id].count > 0) {

            const decreaseButton = createElement('button', {
                onClick: () => cartStore.decrease(this.id),
                className: 'countButton decreaseButton'
            }, '-')

            const count = createElement('div', {
                className: 'count'
            }, `${cartStore.cartItemById[this.id].count}`)

            const increaseButton = createElement('button', {
                onClick: () => cartStore.increase(this.id),
                className: 'countButton increaseButton'
            }, '+')

            const countButtonsBox = createElement('div',{ className: 'countContainer'},
                decreaseButton,
                count,
                increaseButton
            )

            const remove = createElement('button', {
                className: 'removeButton',
                onClick: () => cartStore.removeItem(this.id)
            }, 'Remove from the cart')

            this.item.append(countButtonsBox, remove)
        } 
        
        // else {
        //     console.log('Got you') // проблема в cookie
        // }
    }

    render() {
        return this.item
    }
}

export default CartItemControls