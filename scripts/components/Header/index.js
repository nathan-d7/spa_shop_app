import CartCount from "../CartCount/index.js"
import cartStore from "../../store/cartStore.js"
import { createElement } from "../../utils/index.js"
import { FindProduct } from "./FindProduct/findProduct.js"

class Header {
  constructor() {
    this.item = document.createElement('header')
    this.item.classList.add('header')

    this.createHeader()
  }

  createHeader() {

    const cartCount = new CartCount(cartStore).render()

    const navbarToggler = document.createElement('button')
    navbarToggler.classList.add('navbar-toggler')
    navbarToggler.setAttribute('type', 'button')
    navbarToggler.setAttribute('data-bs-toggle', 'collapse')
    navbarToggler.setAttribute('data-bs-target', '#navbarNavAltMarkup')
    navbarToggler.setAttribute('aria-controls', 'navbarNavAltMarkup')
    navbarToggler.setAttribute('aria-expanded', 'false')
    navbarToggler.setAttribute('aria-label', 'Toggle navigation')

    const navbarTogglerIcon = document.createElement('span')
    navbarTogglerIcon.classList.add('navbar-toggler-icon')
    navbarToggler.append(navbarTogglerIcon)

    const header = createElement('nav', {className: 'navbar navbar-expand-lg bg-body-tertiary'},
      createElement('div', {className: 'container-fluid headerContent'}, 
        createElement('a', {className: 'navbar-brand headerLogoLink', href: '#'}, 
          createElement('img', {className: 'headerLogoImg', src: 'images/icons/shop_ico.png'})
        ),
        navbarToggler,
        createElement('div', {className: 'collapse navbar-collapse', id: 'navbarNavAltMarkup'}, 
          createElement('div', {className: 'navbar-nav navLinksBox'}, 
            createElement('a', {className: 'nav-link active', href: '#'}, 'Home'),
            createElement('a', {className: 'nav-link', href: '#catalog'}, 'Catalog'),
            createElement('a', {className: 'nav-link', href: '#cart'}, 'Cart')
          ),
          createElement('form', {className: 'filterProdBox'},
            cartCount,
            createElement('input', {className: 'filterProdInput', type: 'text', name: 'searchInfo', method: 'post', placeholder: 'Поиск'}),
            createElement('button', {className: 'clearSearchButton'}, '+')
          ),
        ),
      ),
    )

    this.item.append(header)
    new FindProduct()

  }

  render() {
    return this.item
  }
}

export default Header