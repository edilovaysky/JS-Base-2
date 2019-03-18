class GoodItem {
  constructor(title = "Название товара", price = "Цена по запросу") {
    this.title = title;
    this.price = price;
  }
  render() {
    return `<div class="goods-item">
              <div class="goods-info">
                <h3>${this.title}</h3>
                <p>${this.price}</p>
              </div>
              <button class="add-good">Добавить</button>
            </div>`;
  }
}

class GoodsList {
  constructor() {
    this.goods = [];
  }
  fetchGoods() {
    this.goods = [
      {
        title: "Shirt",
        price: 150
      },
      {
        title: "Socks",
        price: 50
      },
      {
        title: "Jacket",
        price: 350
      },
      {
        title: "Shoes",
        price: 250
      }
    ];
  }
  render() {
    let listHtml = "";
    this.goods.forEach(good => {
      const goodItem = new GoodItem(good.title, good.price);
      listHtml += goodItem.render();
    });
    document.querySelector(".goods-list").innerHTML = listHtml;
  }
  getGoodsSum() {
    let goodsSum = 0;
    let list = new GoodsList();
    list.fetchGoods();
    for (let i = 0; i < list.goods.length; i++) {
      const goodPrice = list.goods[i].price;
      goodsSum += goodPrice;
    }
    return goodsSum;
  }
}

class Cart {
  constructor() {}
  render() {}
}

class CartItem {
  constructor() {}
  render() {}
}

const list = new GoodsList();
list.fetchGoods();

const goodsSum = new GoodsList();
console.log(goodsSum.getGoodsSum()); // Выводим сумму стоимости всех доступных товаров

window.onload = () => {
  list.render();
};
