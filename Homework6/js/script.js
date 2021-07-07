Vue.component("goods-list", {
  props: ["goods"],
  template: `
     <div class="goods-list">
          <goods-item v-for="good in goods" 
          :key="good.id"
          :good="good"></goods-item>
     </div>
  `
});
Vue.component("goods-item", {
  props: ["good"],
  template: `
    <div class="goods-item">
            <div class="goods-info">
              <h3>{{ good.title }}</h3>
              <span>{{ good.price }}</span>
            </div>
            <button class="add-good">Добавить</button>
    </div>
  `
});
Vue.component("search", {
  props: ["searchLine"],
  template: `
    <div class="search">
          <input type="text" class="search-goods" v-model="searchLine" />
          <button class="search-btn" @click.prevent="filterGoods()">Искать</button>
    </div>
  `
});
Vue.component("cart", {
  props: ["isVisibleCart"],
  template: `
    <div class="cart" v-if="isVisibleCart">
          <h3>КОРЗИНА</h3>
        </div>
  `
});
const app = new Vue({
  el: "#app",
  data: {
    goods: [],
    filteredGoods: [],
    searchLine: "",
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
              resolve(JSON.parse(xhr.responseText));
            } else {
              reject(new Error());
            }
          }
        };
        xhr.open("GET", url, true);
        xhr.send();
      });
    },
    filterGoods() {
      let value = this.searchLine;
      const regexp = new RegExp(value, "i");
      this.filteredGoods = this.goods.filter(good => regexp.test(good.title));
    }
  },
  toggleCartVisibility() {
    this.isVisibleCart = !this.isVisibleCart;
  },
  async created() {
    try {
      this.goods = await this.makeGETRequest(
        "https://api.myjson.com/bins/7oju2"
      );
      this.filteredGoods = this.goods;
    } catch (error) {
      console.error(err);
    }
  }
});
