const routeMap = {
  catalog: 'Catalog-page',
  cart: 'Cart-page',
  home: 'Index-page'
}

/**
 * 
 * @param {HTMLElement} rootElement 
 */
export const routing = async (rootElement) => {
  rootElement.innerHTML = ''

  let hash = window.location.hash.slice(1)

  if (!hash) hash = "home"

  const module = await import(`../pages/${routeMap[hash]}/index.js`)
  
  if (!module) return

  const item = new module.default().render()

  rootElement.append(item)
}