function makeGETRequest(url) {
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
    this.filteredGoods = [];
  }
  fetchGoods() {
    return makeGETRequest("https://api.myjson.com/bins/7oju2")
      .then(goods => {
        this.goods = goods;
        this.filteredGoods = goods;
        this.render();
        return true;
      })
      .catch(() => {
        return false;
      });
    // или используем метод fetch
    /*   fetch('http://json-file-url').then((res) => res.json()) 
    .then((goods) => {
      this.goods = JSON.parse(goods);
      this.render();
    }); */
  }
  filterGoods(value) {
    const regexp = new RegExp(value, "i");
    this.filteredGoods = this.goods.filter(good => regexp.test(good.title));
    this.render();
  }
  render() {
    let listHtml = "";
    this.filteredGoods.forEach(good => {
      const goodItem = new GoodItem(good.title, good.price);
      listHtml += goodItem.render();
    });
    document.querySelector(".goods-list").innerHTML = listHtml;
  }
  getGoodsSum() {
    /*    let goodsSum = 0;
    let list = new GoodsList;
    list.fetchGoods();
    console.log(list);
    for (let i = 0; i < list.goods.length; i++) {
      const goodPrice = list.goods[i].price;
      goodsSum += goodPrice;
    }
    return goodsSum; */
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

window.onload = async () => {
  const searchInput = document.querySelector(".search-goods");
  const searchBtn = document.querySelector(".search-btn");
  searchBtn.addEventListener("click", () => {
    const value = searchInput.value;
    list.filterGoods(value);
  });
  try {
    await list.fetchGoods();
    const totalPrice = list.getGoodsSum();
    console.log(totalPrice);
  } catch (error) {
    console.console.error(err);
  }
};
