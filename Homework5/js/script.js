const app = new Vue({
  el: "#app",
  data: {
    goods: [],
    filteredGoods: [],
    searchLine: "",
    isVisibleCart: true,
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
  renderCart() {
    if (!this.isVisibleCart === false) {
      document.querySelector(".cart").style.display = 'flex';
      document.querySelector(".cart").style.justifyContent =
        "space-around";
    };
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
