import { routing } from "../../routing/index.js"
import cartStore from "../../store/cartStore.js"
import CartCount from "../CartCount/index.js"

const routeMap = {
  catalog: 'Catalog-page',
  card: 'Card-page',
  home: 'Index-page'
}

class Main {
  constructor() {
    this.item = document.createElement('main')
    this.item.classList.add('main')
  
    this.router()
  }

  router() {

    window.addEventListener('hashchange', () => routing(this.item))
    window.addEventListener('load', () => routing(this.item))
  
  }

  render() {
    return this.item
  }
}

export default Main