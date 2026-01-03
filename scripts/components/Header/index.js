import CartCount from "../CartCount/index.js"
import cartStore from "../../store/cartStore.js"
import { createElement } from "../../utils/index.js"

class Header {
  constructor() {
    this.item = document.createElement('header')
    this.item.classList.add('header')
//     this.item.innerHTML = `
//     <nav class="navbar navbar-expand-lg bg-body-tertiary">
//       <div class="container-fluid headerContent">
//         <a class="navbar-brand headerLogoLink" href="#">
//           <img class="headerLogoImg" src="images/icons/shop_ico.png" />
//         </a>
//         <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
//           <span class="navbar-toggler-icon"></span>
//         </button>
//         <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
//           <div class="navbar-nav navLinksBox">
//             <a class="nav-link active" aria-current="page" href="#">Home</a>
//             <a class="nav-link" href="#catalog">Catalog</a>
//             <a class="nav-link" href="#cart">Cart</a>

//           </div>
//         </div>
//   </div>
// </nav>`

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

  //     <nav class="navbar navbar-expand-lg bg-body-tertiary">
  //       <div class="container-fluid headerContent">
  //         <a class="navbar-brand headerLogoLink" href="#">
  //           <img class="headerLogoImg" src="images/icons/shop_ico.png" />
  //         </a>
  //         <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
  //           <span class="navbar-toggler-icon"></span>
  //         </button>
  //         <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
  //           <div class="navbar-nav navLinksBox">
  //             <a class="nav-link active" aria-current="page" href="#">Home</a>
  //             <a class="nav-link" href="#catalog">Catalog</a>
  //             <a class="nav-link" href="#cart">Cart</a>

  //           </div>
  //         </div>
  //   </div>
  // </nav>`


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
            createElement('a', {className: 'nav-link', href: '#cart'}, 'Cart'),
          )
        ),
      ),
      cartCount
    )

    this.item.append(header)

  }

  // createHeader() {
  //   const cartCount = new CartCount(cartStore).render()

  //   const header = createElement(
  //     'div', {className: 'headerContentBox'},
  //     createElement(
  //       'div', { className: 'logo' },
  //       createElement('a', { href: '#' },
  //         createElement('img', { src: 'images/icons/shop_ico.png' })
  //       )
  //     ),
  //     createElement('nav', null,
  //       createElement('ul', null,
  //         createElement('li', null, 
  //           createElement('a', {href: '#'}, 'Home')
  //         ),
  //         createElement('li', null, 
  //           createElement('a', {href: '#catalog'}, 'Catalog')
  //         ),
  //         createElement('li', null, 
  //           createElement('a', {href: '#cart'}, 'Cart')
  //         )
  //       )
  //     ),
  //     cartCount
  //   )


  //   this.item.append(header)
  // }

  render() {
    return this.item
  }
}

export default Header