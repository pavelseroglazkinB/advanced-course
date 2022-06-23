import {serviceWithBody} from "../../services";
import {GOODS_BASKET} from "../../constants";

export default Vue.component('good', {
    props: [
        'item'
    ],
    template: `
      <div class="grid-item">
        <div class="grid-img">
          <div class="gridImg"><!--<img src="images/26.jpg" width="300" height="300" alt="chandler">--></div>
        </div>
        <hr>
        <div class="product_catalog">
          <div class="catalog-item">{{ item.product_name }}</div>
          <ul class="catalog-item">
            <li class="catalog-item_price"><b>{{ item.price }}</b> руб.</li>
            <li @click="addGood" class="pannier"><!--<img src="images/pannier.png" alt="pannier">--></li>
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