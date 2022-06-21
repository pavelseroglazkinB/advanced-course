const BASE_URL = "http://localhost:8000/";
const GOODS_CART = `${BASE_URL}goods`;
const GOODS = `${BASE_URL}goods.json`;
const GOODS_BASKET = `${BASE_URL}basket`;

function service(url) {
  return fetch(url)
    .then((res) => res.json());
}
function serviceWithBody(url = '', method = "POST", body = {}) {
  return fetch(
    url,
    {
      method,
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(body)
    }
  ).then((res) => res.json());
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
    data() {
      return {
        basketGoodsItems: []
      }
    },
    template: `
      <div class="basket hidden">
        <div @click="$emit('close')"><i class="fa fa-times delete"></i></div>
        <div class="basketRow basketHeader">
          <div>Название товара</div>
          <div>Количество</div>
          <div>Цена за шт.</div>
          <div>Добавить</div>
    		  <div>Удалить</div>
        </div>
    	  <div>
          <basket-item
           v-for="item in basketGoodsItems"
            class="basketFooter"
             :item="item"
              @add='addGood'
              @removal='removalGood'
          >
          </basket-item>
        </div>
      </div>
    `,
    mounted() {
      service(GOODS_BASKET).then((data) => {
        this.basketGoodsItems = data;
      })
    },
    methods: {
      addGood(id) {
        serviceWithBody(GOODS_BASKET, "POST", {
          id
        }).then((data) => {
          this.basketGoodsItems = data;
        })
      },
      removalGood(id) {
        serviceWithBody(GOODS_BASKET, "DELETE", {
          id
        }).then((data) => {
          this.basketGoodsItems = data;
        })
      }
    }
  })
  Vue.component('basket-item', {
    props: [
      'item'
    ],
    template: `
    <div>
      <div>{{ item.product_name }}</div>
      <div>{{ item.count }}</div>
      <div>{{ item.price }}</div>
      <button @click="$emit('add', item.id)"><i class="fa fa-plus"></i></button>
      <button @click="$emit('removal', item.id)"><i class="fa fa-times"></i></button>
    </div>
    `
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
            <li @click="addGood"><img src="images/pannier.png" alt="pannier"></li>
          </ul>
        </div>
      </div>
    `,
    methods: {
      addGood() {
        serviceWithBody(GOODS_BASKET, "POST", {
          id: this.item.id
        })
      }
    }
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
