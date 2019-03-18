function makeGETRequest(url, promise) {
  const xhr = window.XMLHttpRequest
    ? new window.XMLHttpRequest()
    : new window.ActiveXObject();
  promise = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (xhr.readyState === 4) {
          resolve(xhr.responseText);
        } else {
          reject("Error");
        }
      }, 200);
    });
  };
  xhr.open("GET", url, true);
  xhr.send();
}

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
    makeGETRequest("/goods.json", goods => {
      this.goods = JSON.parse(goods);
    });
  }
  render() {
    let listHtml = "";
    this.goods.forEach(good => {
      const goodItem = new GoodItem(good.title, good.price);
      listHtml += goodItem.render();
      this.render();
    });
    document.querySelector(".goods-list").innerHTML = listHtml;
  }
  getGoodsSum() {
    return this.goods.reduce((totalPrice, good) => {
      if (!good.price) return totalPrice; // если нет price вернет аккумулятор totalPrice
      return (totalPrice += good.price);
    }, 0);
  }
}

class Cart {
  constructor() {
    this.goods = [];
  }
  add(good) {
    this.goods.push(good);
    this.render();
  }
  remove() {
    const goodIndex = this.goods.findIndex(item => item.title === good.title);
    this.goods.splice(goodIndex, 1);
    this.render();
  }
  render() {
    let listHtml = "";
    this.goods.forEach(good => {
      const cartItem = new GoodItem(good.title, good.price);
      listHtml += cartItem.render();
    });
    document.querySelector(".cart-list").innerHTML = listHtml;
  }
}

class CartItem extends GoodItem {
  constructor() {
    super();
  }
  render() {
    return `<div class="cart-item">
              <div class="cart-item-info">
                <h3>${this.title}</h3>
                <p>${this.price}</p>
              </div>
            </div>`;
  }
}

const list = new GoodsList();
list.fetchGoods();

const goodsSum = new GoodsList();
console.log(goodsSum.getGoodsSum()); // Выводим сумму стоимости всех доступных товаров

window.onload = () => {
  list.fetchGoods();
};
