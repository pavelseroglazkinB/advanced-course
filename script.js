const goods = [
  { title: 'Shirt', price: 150, images: 'images/20.jpg' },
  { title: 'Socks', price: 50, images: 'images/22.jpg' },
  { title: 'Jacket', price: 350, images: 'images/23.jpg' },
  { title: 'Shoes', price: 250, images: 'images/24.jpg' },
];

class GoodsItem {
  constructor({ title, price, images }) {
    this.title = title;
    this.price = price;
    this.images = images;
  }
  render() {
    return `
    <div class="grid-item">
		<div class="grid-img">
			<img src="${this.images}" width="300" height="300" alt="chandler">
		</div>
		<hr>
		<div class="product_catalog">
			<div class="catalog-item">${this.title}</div>
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
  fetchGoods() {
    this.items = goods;
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

const goodsList = new GoodsList();
goodsList.fetchGoods();
goodsList.render();
console.log(goodsList.getCount());