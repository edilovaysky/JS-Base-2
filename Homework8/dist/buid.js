!(function(e) {
  var t = {};
  function o(n) {
    if (t[n]) return t[n].exports;
    var r = (t[n] = { i: n, l: !1, exports: {} });
    return e[n].call(r.exports, r, r.exports, o), (r.l = !0), r.exports;
  }
  (o.m = e),
    (o.c = t),
    (o.d = function(e, t, n) {
      o.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: n });
    }),
    (o.r = function(e) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (o.t = function(e, t) {
      if ((1 & t && (e = o(e)), 8 & t)) return e;
      if (4 & t && "object" == typeof e && e && e.__esModule) return e;
      var n = Object.create(null);
      if (
        (o.r(n),
        Object.defineProperty(n, "default", { enumerable: !0, value: e }),
        2 & t && "string" != typeof e)
      )
        for (var r in e)
          o.d(
            n,
            r,
            function(t) {
              return e[t];
            }.bind(null, r)
          );
      return n;
    }),
    (o.n = function(e) {
      var t =
        e && e.__esModule
          ? function() {
              return e.default;
            }
          : function() {
              return e;
            };
      return o.d(t, "a", t), t;
    }),
    (o.o = function(e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (o.p = ""),
    o((o.s = 3));
})([
  function(e, t, o) {
    "use strict";
    const n = Vue.component("goods-list", {
      props: ["goods"],
      template:
        '\n     <div class="goods-list">\n          <goods-item v-for="good in goods" \n          :key="good.id"\n          @add-to-cart-item="addToCartList"\n          :good="good"></goods-item>\n     </div>\n  ',
      methods: {
        addToCartList(e) {
          this.$emit("add-to-cart-list", e);
        }
      }
    });
    t.a = { goodList: n };
  },
  function(e, t, o) {
    "use strict";
    const n = Vue.component("goods-item", {
      props: ["good"],
      template:
        '\n    <div class="goods-item">\n            <div class="goods-info">\n              <h3>{{ good.title }}</h3>\n              <span>{{ good.price }}</span>\n            </div>\n            <button class="add-good" @click="addToCart">Добавить</button>\n    </div>\n  ',
      methods: {
        addToCart() {
          this.$emit("add-to-cart-item", this.good);
        }
      }
    });
    t.a = { goodItem: n };
  },
  function(e, t, o) {
    "use strict";
    const n = Vue.component("search", {
      data: () => ({ searchLine: "" }),
      template:
        '\n    <div class="search">\n    <form @submit.prevent="$emit(\'search\', searchLine)">\n      <input type="text" class="search-goods" v-model="searchLine" />\n      <button class="search-btn" type="submit">Искать</button>\n    </form>\n    </div>\n  '
    });
    t.a = { goodSearch: n };
  },
  function(e, t, o) {
    "use strict";
    o.r(t),
      function(e) {
        var t = o(0),
          n = o(1),
          r = o(2);
        o(5);
        t.a.goodList,
          n.a.goodItem,
          r.a.goodSearch,
          e.cartItems,
          new Vue({
            el: "#app",
            data: {
              goods: [],
              filteredGoods: [],
              cartItems: [],
              isVisibleCart: !1
            },
            methods: {
              makeGETRequest: e =>
                new Promise((t, o) => {
                  const n = window.XMLHttpRequest
                    ? new window.XMLHttpRequest()
                    : new window.ActiveXObject();
                  (n.onreadystatechange = function() {
                    4 === n.readyState &&
                      (200 === n.status
                        ? t(JSON.parse(n.responseText))
                        : o(new Error()));
                  }),
                    n.open("GET", e, !0),
                    n.send();
                }),
              makePOSTRequest: (e, t) =>
                new Promise((o, n) => {
                  const r = window.XMLHttpRequest
                    ? new window.XMLHttpRequest()
                    : new window.ActiveXObject();
                  (r.onreadystatechange = function() {
                    4 === r.readyState &&
                      (200 === r.status && o(JSON.parse(r.responseText)),
                      n(new Error()));
                  }),
                    r.open("POST", e, !0),
                    r.setRequestHeader(
                      "Content-type",
                      "application/json: charset=UTF-8"
                    ),
                    r.send(t);
                }),
              filterGoods(e) {
                const t = new RegExp(e, "i");
                this.filteredGoods = this.goods.filter(e => t.test(e.title));
              },
              addToCart(e) {
                this.makePOSTRequest("/addToCart", JSON.stringify(e));
              },
              toggleCartVisibility() {
                this.isVisibleCart = !this.isVisibleCart;
              }
            },
            async created() {
              try {
                (this.goods = await this.makeGETRequest("/catalogData")),
                  (this.filteredGoods = this.goods);
              } catch (e) {
                console.error(err);
              }
            }
          });
      }.call(this, o(4)(e));
  },
  function(e, t) {
    e.exports = function(e) {
      if (!e.webpackPolyfill) {
        var t = Object.create(e);
        t.children || (t.children = []),
          Object.defineProperty(t, "loaded", {
            enumerable: !0,
            get: function() {
              return t.l;
            }
          }),
          Object.defineProperty(t, "id", {
            enumerable: !0,
            get: function() {
              return t.i;
            }
          }),
          Object.defineProperty(t, "exports", { enumerable: !0 }),
          (t.webpackPolyfill = 1);
      }
      return t;
    };
  },
  function(e, t, o) {
    "use strict";
    Vue.component("cart", {
      props: ["isVisibleCart", "goods"],
      template:
        '\n    <div class="cart" >\n          <h3>КОРЗИНА</h3>\n          <cart-item v-for="good in goods"\n            :good="good"    \n            :key="good.id"></cart-item>\n        </div>\n  '
    });
  }
]);
