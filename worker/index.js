onmessage = async function (e) {
  // console.log(e.data)

  const { body } = e.data

  const response = await this.fetch(`https://jsonplaceholder.typicode.com/posts/${body.id}`)

  if (!response.ok) {
    this.reportError(response.status)
  }

  if (response.ok) {
    const data = await response.json()
    this.postMessage(data)
  }
}