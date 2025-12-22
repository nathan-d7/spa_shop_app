const routeMap = {
  catalog: 'Catalog-page',
  cart: 'Cart-page',
  home: 'Index-page',
  'catalog/': 'Product-page'
}

const marker = /\//g

/**
 * 
 * @param {HTMLElement} rootElement 
 */
export const routing = async (rootElement) => {
  rootElement.innerHTML = ''

  let hash = window.location.hash.slice(1)
  let id = null

  if (!hash) hash = "home"

  if (marker.test(hash)) {
    const markerIndex = hash.indexOf('/')

    id = hash.slice(markerIndex + 1)
    hash = hash.slice(0, markerIndex + 1)
  }

  const module = await import(`../pages/${routeMap[hash]}/index.js`)

  if (!module) return

  const item = new module.default(id).render()

  rootElement.append(item)
}