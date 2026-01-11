import Header from "./components/Header/index.js"
import Main from "./components/Main/index.js"
import Footer from "./components/Footer/index.js"
import cookieStore from "./store/cookieStore.js"

const root = document.getElementById('root')

const header = new Header().render()
const main = new Main().render()
const footer = new Footer().render()

root.append(header, main, footer)