const goods = [
  { title: 'Shirt', price: 150, images: 'images/20.jpg' },
  { title: 'Socks', price: 50, images: 'images/22.jpg' },
  { title: 'Jacket', price: 350, images: 'images/23.jpg' },
  { title: 'Shoes', price: 250, images: 'images/24.jpg' },
];

const BASE_URL = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";
const GOODS = `${BASE_URL}/catalogData.json`;
const GOODS_BASKET = `${BASE_URL}//getBasket.json`;

function service(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.send();
  xhr.onload = () => {
    callback(JSON.parse(xhr.response));
  }
}

class GoodsItem {
  constructor({ product_name, price, images }) {
    this.product_name = product_name;
    this.price = price;
    this.images = images;
  }
  render() {
    return `
    <div class="grid-item">
		<div class="grid-img">
			<img src="images/26.jpg" width="300" height="300" alt="chandler">
		</div>
		<hr>
		<div class="product_catalog">
			<div class="catalog-item">${this.product_name}</div>
			<ul class="catalog-item">
				<li class="catalog-item_price"><b>${this.price}</b> руб.</li>
				<li><a class="add-to-cart-link" href="cart/add?id=3"><img src="images/pannier.png"
				alt="pannier"></a></li>
			</ul>
		</div>
	</div>
  `;
  }
}
class GoodsList {
  items = [];
  fetchGoods(callback) {
    service(GOODS, (data) => {
      this.items = data;
      callback()
    });
  }
  render() {
    const goods = this.items.map(item => {
      const goodItem = new GoodsItem(item);
      return goodItem.render()
    }).join('');

    document.querySelector('.goods-list').innerHTML = goods;
  }
  getCount() {
    return Object.values(goods).reduce((acc, product) => acc + product.price, 0);
  }
}

class BasketGood {
  items = [];
  fetchData(callback = () => {}) {
      service(GOODS_BASKET, (data) => {
        this.items = data;
        callback()
      });
  }
}

const basketGood = new BasketGood();
basketGood.fetchData();

const goodsList = new GoodsList();
goodsList.fetchGoods(() =>{
  goodsList.render();
});

