
import productStore from "../../../store/productStore.js"

export class FindProduct {
  constructor() {
    this.init()
  }

  async init() {
    await this.getData()
    this.initSearch()
  }

  async getData() {
    if (!productStore.state.productItems.length) {
      await productStore.findAll()
    }
  }

  initSearch() {
    const searchInput = document.querySelector('.filterProdInput')
    const clearButton = document.querySelector('.clearSearchButton')
    const searchBox = document.querySelector('.filterProdBox')

    if (!searchInput || !searchBox || !clearButton) return

    clearButton.classList.toggle('hidden', !searchInput.value)

    searchInput.addEventListener('input', () => {
      const formData = new FormData(searchBox)
      const value = formData.get('searchInfo').trim().toLowerCase()

      productStore.filterByTitle(value)
      clearButton.classList.toggle('hidden', !value)

    })

    clearButton.addEventListener('click', (event) => {
      event.preventDefault()
      searchBox.reset()
      productStore.filterByTitle('')
      clearButton.classList.add('hidden')
    })

  }

}


