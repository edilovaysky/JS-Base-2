Vue.component("goods-list", {
  props: ["goods"],
  template: `
     <div class="goods-list">
          <goods-item v-for="good in goods" 
          :key="good.id"
          @add-to-cart-item="addToCartList"
          :good="good"></goods-item>
     </div>
  `,
  methods: {
    addToCartList(good) {
      //console.log('list')
      this.$emit("add-to-cart-list", good);
    }
  }
});
Vue.component("goods-item", {
  props: ["good"],
  template: `
    <div class="goods-item">
            <div class="goods-info">
              <h3>{{ good.title }}</h3>
              <span>{{ good.price }}</span>
            </div>
            <button class="add-good" @click="addToCart">Добавить</button>
    </div>
  `,
  methods: {
    addToCart() {
     // console.log('item')
      this.$emit("add-to-cart-item", this.good);
    }
  }
});
Vue.component("search", {
  data() {
    return {
      searchLine: ""
    };
  },
  template: `
    <div class="search">
    <form @submit.prevent="$emit('search', searchLine)">
      <input type="text" class="search-goods" v-model="searchLine" />
      <button class="search-btn" type="submit">Искать</button>
    </form>
    </div>
  `
});
Vue.component("cart", {
  props: ["isVisibleCart", "goods"],
  template: `
    <div class="cart" >
          <h3>КОРЗИНА</h3>
          <cart-item v-for="good in goods"
            :good="good"    
            :key="good.id"></cart-item>
        </div>
  `
});
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
        xhr.onreadystatechange = function() {
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
        xhr.onreadystatechange = function() {
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
