import { routing } from "../../routing/index.js"

const routeMap = {
  catalog: 'Catalog-page',
  card: 'Card-page',
  home: 'Index-page'
}

class Main {
  constructor() {
    this.item = document.createElement('main')
    this.item.classList.add('main')
    // this.routingHandler = this.routingHandler.bind(this)
    this.router()
  }

  // async routingHandler() {
  //   console.log(this);
    

  //   this.item.innerHTML = ''

  //   let hash = window.location.hash.slice(1)

  //   if (!hash) hash = "home"

  //   const module = await import(`../../pages/${routeMap[hash]}/index.js`)

  //   if (!module) return

  //   const item = new module.default().render()

  //   this.item.append(item)
  // }

  router() {
    // window.addEventListener('hashchange', this.routingHandler)
    // window.addEventListener('load', this.routingHandler)

    window.addEventListener('hashchange', () => routing(this.item))
    window.addEventListener('load', () => routing(this.item))
  }

  render() {
    return this.item
  }
}

export default Main