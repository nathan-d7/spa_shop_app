import { createElement } from "../../../../utils/index.js"

/**
 * @typedef {object} ShopItemsProps
 * @property {import("../../index.js").ShopData} data
 * @property {(item: import("../../index.js").ShopData) => void} adToCart
 * @property {(id: number) => void} removeCart
 * @property {(id: number) => void} incrase
 * @property {(id: number) => void} decrase
 */


class ShopItem {

  /**
   * 
   * @param {ShopItemsProps} props 
   */
  constructor({
    adToCart,
    data,
    decrase,
    incrase,
    removeCart
  }) {
    this.item = document.createElement('div')
    this.item.classList.add('shopItem')
    this.adToCart = adToCart
    this.data = data
    this.decrase = decrase
    this.incrase = incrase
    this.removeCart = removeCart

    this.createItem()
  }

  createItem() {
    // this.item.innerHTML = `
    //     <h3 class="itemTitle">${item.title}</h3>
    //     <p class="itemCategory">${item.category}</p>
    //     <div class="itemImage">
    //       <img src="${item.image}" alt="${item.title}"/>
    //     </div>
    //     <div class="itemContent">
    //       <p class="itemDescription">${item.description}</p>
    //       <p class="itemPrice">${item.price}</p>
    //     </div>
    //   `

    const title = createElement(
      'h3',
      {
        className: 'itemTitle'
      },
      this.data.title
    )


    const category = createElement(
      'p',
      {
        className: 'itemCategory'
      },
      this.data.category
    )

    const imageContainer = createElement(
      'div',
      {
        className: 'itemImage'
      },
      createElement(
        'img',
        {
          src: this.data.image,
          alt: this.data.title
        }
      )
    )

    const content = createElement(
      'div',
      {
        className: 'itemContent'
      },
      createElement(
        'p',
        { className: 'itemDescription' },
        this.data.description
      ),
      createElement(
        'p',
        { className: 'itemPrice' },
        this.data.price
      )
    )

    const button = createElement(
      'button',
      {
        onClick: () => this.adToCart(this.data)
      },
      'Добавить в корзину'
    )

    this.item.append(
      title,
      category,
      imageContainer,
      content,
      button
    )
  }

  render() {
    return this.item
  }
}

export default ShopItem