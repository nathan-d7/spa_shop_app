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

  // async getApiData() {
  //   try {
  //     const responce = await fetch('https://fakestoreapi.com/products')

  //     if (!responce.ok) {
  //       throw new Error('Не получилось получить данные')
  //     }

  //     const data = await responce.json()

  //     this.contentRender(data)
  //   } catch (error) {
  //     console.log(error.message)
  //   }
  // }

  /**
   * 
   * @param {ShopData[]} data 
   */
  contentRender() {
    if (!productStore.state.productItems.length) return
    this.content.innerHTML = ''

    productStore.state.productItems.forEach(item => {
      // const shopItem = document.createElement('div')
      // shopItem.classList.add('shopItem')

      // shopItem.innerHTML = `
      //   <h3 class="itemTitle">${item.title}</h3>
      //   <p class="itemCategory">${item.category}</p>
      //   <div class="itemImage">
      //     <img src="${item.image}" alt="${item.title}"/>
      //   </div>
      //   <div class="itemContent">
      //     <p class="itemDescription">${item.description}</p>
      //     <p class="itemPrice">${item.price}</p>
      //   </div>
      // `

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

  render() {
    // this.getApiData()
    return this.item
  }
}

export default CatalogPage