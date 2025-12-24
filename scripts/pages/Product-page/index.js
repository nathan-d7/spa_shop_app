import productStore from "../../store/productStore.js"
import { createElement } from "../../utils/index.js"
import ProductButtons from "./components/ProductButtons/ProductButtons.js"

class ProductPage {
  constructor(id) {
    this.item = document.createElement('div')
    this.item.classList.add('container')

    this.id = id

    productStore.subscribe(() => {
      this.renderData()
    })

    this.getData()
    this.renderData()
  }

  getData() {
    if (!productStore.state.productItems.length) {
      productStore.findAll()
    }
  }

  renderData() {
    if (!productStore.state.productItems.length) {
      return
    }

    /** @type {import("../Catalog-page/index.js").ShopData} */
    const product = productStore.productById[this.id]
    if (!product) return

    const breadcrumbs = createElement('nav', { className: 'breadcrumbs' },
      createElement('ul', { className: 'breadcrumbsList' },
        createElement('li', { className: 'bcItem' },
          createElement('a', { href: '#catalog', className: 'bcLink' }, 'Каталог')
        ),
        createElement('li', { className: 'bcSeparator' }, '|'),
        createElement('li', { className: 'bcItem' },
          createElement('p', { className: 'bcText' }, product.title)
        )
      )
    )

    const content = createElement('div', { className: 'productContainer' },
      breadcrumbs,
      createElement('h2', { className: 'productTitle' }, product.title),
      createElement('div', { className: 'productMainContent' },
        createElement('div', { className: 'productImage' },
          createElement('img', { src: product.image })
        ),
        createElement('div', { className: 'productDescription' },
          createElement('p', { className: 'productCategory' }, product.category),
          createElement('p', { className: 'description' }, product.description),
          createElement('div', { className: 'rating' },
            createElement('span', { className: 'ratingCount' }, product.rating.count),
            createElement('span', { className: 'ratingValue' }, product.rating.rate)
          ),
          createElement('p', { className: 'price' }, new Intl.NumberFormat('ru-RU', { style: "currency", currency: "USD" }).format(product.price)),
          new ProductButtons(product.id).render()
        )
      )
    )

    this.item.append(content)
  }

  render() {
    return this.item
  }
}

export default ProductPage