const goods = [
  { title: 'Shirt', price: 150, images: 'images/20.jpg' },
  { title: 'Socks', price: 50, images: 'images/22.jpg' },
  { title: 'Jacket', price: 350, images: 'images/23.jpg' },
  { title: 'Shoes', price: 250, images: 'images/24.jpg' },
];

const renderGoodsItem = ({ title = '', price = 0, images = null }) =>
    `
<div class="grid-item">
  <div class="grid-img">
    <img src="${images}" width="300" height="300" alt="chandler">
  </div>
  <hr>
    <div class="product_catalog">
      <div class="catalog-item">${title}</div>
      <ul class="catalog-item">
        <li class="catalog-item_price"><b>${price}</b> руб.</li>
        <li><a class="add-to-cart-link" href="cart/add?id=3"><img src="images/pannier.png"
          alt="pannier"></a></li>
      </ul>
    </div>
</div>
`;

const renderGoodsList = (list = []) => {
  let goodsList = list.map(item => renderGoodsItem(item)).join('');
  document.querySelector('.goods-list').innerHTML = goodsList;
}

renderGoodsList(goods);