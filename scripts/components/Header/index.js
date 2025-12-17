class Header {
  constructor() {
    this.item = document.createElement('header')
    this.item.classList.add('header')
    this.item.innerHTML = `
    <div>
      <div class="logo">
        <a href="#">
          <img src="https://placehold.co/50"/>
        </a>
      </div>
      <nav>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#catalog">Catalog</a></li>
          <li><a href="#card">Card</a></li>
        </ul>
      </nav>
    </div>
    `
  }

  render() {
    return this.item
  }
}

export default Header