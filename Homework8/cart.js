const cartItems = Vue.component("cart", {
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

export default {
    cartItems
}