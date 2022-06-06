const BASE_URL = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";
const GOODS = `${BASE_URL}/catalogData.json`;
const GOODS_BASKET = `${BASE_URL}//getBasket.json`;

function service(url) {
  return fetch(url)
    .then((res) => res.json());
}

window.onload = () => {
  const app = new Vue({
    el: '#root',
    data: {
      items: [],
      searchValue: '',
      isVisibleCart: false,
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
