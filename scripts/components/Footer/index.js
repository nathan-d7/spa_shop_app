class Footer {
  constructor() {
    this.item = document.createElement('footer')
    this.item.classList.add('footer')
    this.item.innerHTML = `
      <h2>footer</h2>
    `
  }

  render () {
    return this.item
  }
}

export default Footer