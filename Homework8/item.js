const goodItem = Vue.component("goods-item", {
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

export default {
    goodItem
}