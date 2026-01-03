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
        // const name = "cartItems"
        // const value = JSON.stringify(this.cartData.filter(item => item))
        // document.cookie = name + "=" + value 

        const items = cartStore.state.cartItem

        if (!items.length) {
            document.cookie = "cartItems=; max-age=0; path=/"
            return
        }

        document.cookie =
        "cartItems=" +
        JSON.stringify(items) +
        "; path=/"
    }
    
    getCookie(name) {
        let matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
        return matches ? matches[1] : undefined;
    }


}

export default CookieStore