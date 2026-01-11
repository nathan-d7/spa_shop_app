import cartStore from "./cartStore.js"

class CookieStore {

    /**
     * @property {CartItem[]} cartData
    */
    constructor() {
    
        cartStore.subscribe(()=> {
            this.setCookie()
        })

    }

    setCookie() {
    
        const items = cartStore.state.cartItem

        if (!items.length) {
            document.cookie = "cartItems=false; max-age=-1; path=/"
            return
        }

        document.cookie = "cartItems=" + JSON.stringify(items) + "; path=/"
    }
    
    getCookie(name) {
        let matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
        return matches ? matches[1] : undefined;
    }


}

const cookieStore =  new CookieStore()
export default cookieStore



