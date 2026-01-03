import { createElement } from "../../utils/index.js"
class Footer {
  constructor() {
    this.item = document.createElement('footer')
    this.item.classList.add('footer')
    // this.item.innerHTML = `
    //   <div class="container-md containerFooter">
    //     <div class="row align-items-center">
    //       <div class="col p-0 align-self-stretch"">
    //         <a class="col-3 d-block footerLogo" href="#">
    //           <img class="object-fit-contain" src="images/icons/shop_ico.png" />
    //         </a>
    //       </div>
    //       <div class="footerLinks col p-0">
    //         <ul class="row flex-column mb-0">
    //           <li class="col d-flex phone">
    //             <a class="d-inline-block" href="#">123-342-879</a>
    //           </li>
    //           <li class="col d-flex address">
    //             <a class="d-inline-block" href="#">Dominikańska 2, 98-200 Sieradz, Poland</a>
    //           </li>
    //           <li class="col d-flex email">
    //             <a class="d-inline-block" href="#">info@example.com</a>
    //           </li>
    //         </ul>
    //       </div>
    //     </div>
    //   </div>
    // `

    this.createFooter()
  }

  createFooter() {

    const footer = createElement('div', {className: 'container-md containerFooter'},
      createElement('div', {className: 'row align-items-center'}, 
        createElement('div', {className: 'col-8 p-0 align-self-stretch'},
          createElement('a', {className: 'col-3 d-block footerLogo', href: '#'}, 
            createElement('img', {className: 'object-fit-contain', src: 'images/icons/shop_ico.png'})
          )
        ),
        createElement('div', {className: 'footerLinks col p-0'}, 
          createElement('ul', {className: 'row flex-column mb-0'},
            createElement('li', {className: 'col d-flex phone'}, 
              createElement('a', {className: 'd-inline-block', href: '#'}, '123-342-879')
            ),
            createElement('li', {className: 'col d-flex address'}, 
              createElement('a', {className: 'd-inline-block', href: '#'}, 'Dominikańska 2, 98-200 Sieradz, Poland')
            ),
            createElement('li', {className: 'col d-flex email'}, 
              createElement('a', {className: 'd-inline-block', href: '#'}, 'info@example.com')
            )
          )
        )
      )
    )

    this.item.append(footer)

  }

  render () {
    return this.item
  }
}

export default Footer