const goodList = Vue.component("goods-list", {
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

export default {
    goodList
}