const BASE_URL = "http://localhost:8000/";
const GOODS = `${BASE_URL}goods.json`;
const GOODS_BASKET = `${BASE_URL}basket`;

function service(url) {
  return fetch(url)
    .then((res) => res.json());
}

window.onload = () => {
  Vue.component('search', {
    props: {
      value: {
        type: [String, Number],
        default: ''
      }
    },
    methods: {
      input(e) {
        let value = e.target.value;
        this.$emit('input', value);
      }
    },

    template: `
      <input class="search_one" type="text" name="q" placeholder="Поиск" :value="value" @input="input">                           
      <input type="submit" class="search_img" name="submit">
    `
  })
  Vue.component('basket', {
    props: [
      'item'
    ],
    data() {
      return {
        basketGoodsItems: []
      }
    },
    template: `
      <div class="basket hidden">
        <div @click="$emit('close')"><i class="fa fa-times delete"></i></div>
        <div class="basketRow basketHeader">
           <div>Название товара<p>{{ item.product_name }}</p></div>
           <div>Количество<p>{{ item.count }}</p></div>
           <div>Цена за шт.<p>{{ item.price }}</p></div>
           <div>Добавить товар<p><i class="fa fa-plus"></i></p></div>
           <div>Удалить товар<p><i class="fa fa-times"></i></p></div>
        </div>
        <div class="basketTotal">
           Товаров в корзине на сумму:
           $<span class="basketTotalValue">0</span>
        </div>
      </div>
    `,
    mounted() {
      servise(GOODS_BASKET).then((data) => {
        this.basketGoodsItems = data;
        return data;
      })
    }
  })
  Vue.component('custom-button', {
    template: `
    <button @click="$emit('click')" class="cart-button" type="button">
      <slot></slot>
    </button>
    `
  })
  Vue.component('good', {
    props: [
      'item'
    ],
    template: `
      <div class="grid-item">
        <div class="grid-img">
          <img src="images/26.jpg" width="300" height="300" alt="chandler">
        </div>
        <hr>
        <div class="product_catalog">
          <div class="catalog-item">{{ item.product_name }}</div>
          <ul class="catalog-item">
            <li class="catalog-item_price"><b>{{ item.price }}</b> руб.</li>
            <li><a class="add-to-cart-link" href="cart/add?id=3"><img src="images/pannier.png"
                      alt="pannier"></a></li>
          </ul>
        </div>
      </div>
    `
  })

  const app = new Vue({
    el: '#root',
    data: {
      basketGoodsItems: [],
      items: [],
      searchValue: '',
      isVisibleCart: false,
      value: ''
    },
    methods: {
      addEvent: function () {
        this.isVisibleCart = true;
      },
      del: function () {
        this.isVisibleCart = false;
      }
    },
    mounted() {
      service(GOODS).then((data) => {
        this.items = data;
        return data;
      })
    },
    computed: {
      getCount() {
        return this.items.reduce((acc, { price }) => acc + price, 0);
      },
      filteredItems() {
        return this.items.filter(({ product_name }) => {
          return (new RegExp(this.searchValue, 'gui')).test(product_name);
        })
      }
    }
  })
}
