// import of modules

import list from "./list.js"
const goodList = list.goodList

import item from "./item.js"
const goodItem = item.goodItem

import search from "./search.js";
const goodSearch = search.goodSearch;

import cart from "./cart.js";
const cartItems = module.cartItems;
 
const app = new Vue({
    el: "#app",
    data: {
        goods: [],
        filteredGoods: [],
        cartItems: [],
        isVisibleCart: false
    },
    methods: {
        makeGETRequest(url) {
            return new Promise((resolve, reject) => {
                const xhr = window.XMLHttpRequest
                    ? new window.XMLHttpRequest()
                    : new window.ActiveXObject();
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            resolve(JSON.parse(xhr.responseText))
                        } else {
                            reject(new Error())
                        }
                    }
                };
                xhr.open("GET", url, true);
                xhr.send();
            });
        },
        makePOSTRequest(url, data) {
            return new Promise((resolve, reject) => {
                const xhr = window.XMLHttpRequest
                    ? new window.XMLHttpRequest()
                    : new window.ActiveXObject();
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            resolve(JSON.parse(xhr.responseText));
                        }
                        reject(new Error());
                    }
                }
                xhr.open("POST", url, true);
                xhr.setRequestHeader("Content-type", "application/json: charset=UTF-8");
                xhr.send(data)
            });
        },
        filterGoods(value) {
            const regexp = new RegExp(value, "i");
            this.filteredGoods = this.goods.filter(good => regexp.test(good.title));
        },
        addToCart(good) {
            //console.log('app')
            this.makePOSTRequest('/addToCart', JSON.stringify(good))
        },
        toggleCartVisibility() {
            this.isVisibleCart = !this.isVisibleCart;
        }
    },
    async created() {
        try {
            this.goods = await this.makeGETRequest("/catalogData");
            this.filteredGoods = this.goods;
        } catch (error) {
            console.error(err);
        }
    }
});