import {service, serviceWithBody} from "../../services";
import {GOODS_BASKET} from "../../constants";

export default Vue.component('basket', {
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