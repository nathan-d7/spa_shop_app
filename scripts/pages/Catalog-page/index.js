import cartStore from "../../store/cartStore.js"
import productStore from "../../store/productStore.js"
import ShopItem from "./components/ShopItem/ShopItem.js"

/**
 * @typedef {object} ShopData
 * @property {number} id
 * @property {string} title
 * @property {number} price
 * @property {string} description
 * @property {string} category
 * @property {string} image
 * @property {{
 * rate: number,
 * count: number
 * }} rating
 * 
 */


class CatalogPage {
  constructor() {
    this.item = document.createElement('div')
    this.item.classList.add('containerCatalog')
    this.item.innerHTML = `
      <h2>Catalog</h2>
    `

    this.content = document.createElement('div')
    this.content.classList.add('shopContent')
    this.item.append(this.content)

    productStore.subscribe(() => {
      this.contentRender()
    })

    this.getData()
    this.contentRender()
  }

  getData () {
    if (!productStore.state.productItems.length) {
      productStore.findAll()
    }
  }


  /**
   * 
   * @param {ShopData[]} data 
   */
  contentRender() {
    if(!productStore.state.productItems.length) return

    this.content.innerHTML = ''

    if(productStore.state.visibleItems.length) {
      productStore.state.visibleItems.forEach(item => {
  
        const shopItem = new ShopItem({
          data: item,
          adToCart: (item) => cartStore.addItem(item.id),
          decrase: () => null,
          incrase: () => null,
          removeCart: () => null,
        })

        this.content.append(shopItem.render())
      })
    } else {

        productStore.state.productItems.forEach(item => {
          const shopItem = new ShopItem({
            data: item,
            adToCart: (item) => cartStore.addItem(item.id),
            decrase: () => null,
            incrase: () => null,
            removeCart: () => null,
          })

          this.content.append(shopItem.render())
        })
    }

  }

  render() {
    return this.item
  }
}

export default CatalogPage