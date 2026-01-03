/**
 * @typedef {object} props
 * @property {string} className имена классов передаются через пробелы
 * @property {string} name
 * @property {string} id
 * @property {string} src
 * @property {string} alt
 * @property {string} href
 * @property {string} title
 * @property {boolean} contentEditable
 * @property {(e: MouseEvent) => void} onClick
 * @property {(e: KeyboardEvent) => void} onKeyPress
 * @property {(e: KeyboardEvent) => void} onBlur
 */

/**
 * Создание элементов с их контекстом
 * @param {string} type
 * @param {props | null} props
 * @param {(HTMLElement | string)[]} children
 * @returns {HTMLElement}
 */
export const createElement = (type, props, ...children) => {
  const item = document.createElement(type)

  if (children.length) {
    children.forEach(child => {
      if (typeof child === 'string') {
        item.innerText = item.innerText + child
      } else {
        item.append(child)
      }
    })
  }

  if (!props) return item

  const {
    className,
    id,
    name,
    onClick,
    alt,
    href,
    src,
    title,
    contentEditable,
    onKeyPress,
    onBlur
  } = props

  if (className?.length) {
    const classNames = className.split(' ')
    classNames.forEach(name => item.classList.add(name))
  }

  if (name) {
    item.setAttribute('name', name)
  }

  if (id) {
    item.setAttribute('id', id)
  }

  if (alt) {
    item.setAttribute('alt', alt)
  }

  if (href) {
    item.setAttribute('href', href)
  }

  if (src) {
    item.setAttribute('src', src)
  }

  if (title) {
    item.setAttribute('title', title)
  }


  item.setAttribute('contentEditable', contentEditable)

  if (onClick) {
    item.addEventListener('click', onClick)
  }

  if (onKeyPress) {
    item.addEventListener('keypress', onKeyPress)
  }

  if (onBlur) {
    item.addEventListener('blur', onBlur)
  }

  return item
}