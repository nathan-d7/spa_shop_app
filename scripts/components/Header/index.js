import CartCount from "../CartCount/index.js"
import cartStore from "../../store/cartStore.js"
import { createElement } from "../../utils/index.js"

class Header {
  constructor() {
    this.item = document.createElement('header')
    this.item.classList.add('header')
    // this.item.innerHTML = `
    // <div>
    //   <div class="logo">
    //     <a href="#">
    //       <img src="https://placehold.co/50"/>
    //     </a>
    //   </div>
    //   <nav>
    //     <ul>
    //       <li><a href="#">Home</a></li>
    //       <li><a href="#catalog">Catalog</a></li>
    //       <li><a href="#cart">Cart</a></li>
    //     </ul>
    //   </nav>
    //   <div class="cartCounter">
    //     <a href="#cart">
    //       (0 | 0$)
    //     </a>
    //   </div>
    // </div>
    // `

    this.createHeader()
  }

  createHeader() {
    const cartCount = new CartCount(cartStore).render()

    const header = createElement(
      'div', null,
      createElement(
        'div', { className: 'logo' },
        createElement('a', { href: '#' },
          createElement('img', { src: 'https://placehold.co/50' })
        )
      ),
      createElement('nav', null,
        createElement('ul', null,
          createElement('li', null, 
            createElement('a', {href: '#'}, 'Home')
          ),
          createElement('li', null, 
            createElement('a', {href: '#catalog'}, 'Catalog')
          ),
          createElement('li', null, 
            createElement('a', {href: '#cart'}, 'Cart')
          )
        )
      ),
      cartCount
    )

    this.item.append(header)
  }

  render() {
    return this.item
  }
}

export default Header