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
    this.item.classList.add('container')
    this.item.innerHTML = `
      <h2>Catalog</h2>
    `

    this.content = document.createElement('div')
    this.content.classList.add('shopContent')
    this.item.append(this.content)
  }

  async getApiData() {
    try {
      const responce = await fetch('https://fakestoreapi.com/products')

      if (!responce.ok) {
        throw new Error('Не получилось получить данные')
      }

      const data = await responce.json()

      this.contentRender(data)
    } catch (error) {
      console.log(error.message)
    }
  }

  /**
   * 
   * @param {ShopData[]} data 
   */
  contentRender(data) {
    this.content.innerHTML = ''

    data.forEach(item => {
      const shopItem = document.createElement('div')
      shopItem.classList.add('shopItem')

      shopItem.innerHTML = `
        <h3 class="itemTitle">${item.title}</h3>
        <p class="itemCategory">${item.category}</p>
        <div class="itemImage">
          <img src="${item.image}" alt="${item.title}"/>
        </div>
        <div class="itemContent">
          <p class="itemDescription">${item.description}</p>
          <p class="itemPrice">${item.price}</p>
        </div>
      `

      this.content.append(shopItem)
    })
  }

  render() {
    this.getApiData()
    return this.item
  }
}

export default CatalogPage