import { createElement } from "../../utils/index.js"
class Footer {
  constructor() {
    this.item = document.createElement('footer')
    this.item.classList.add('footer')

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