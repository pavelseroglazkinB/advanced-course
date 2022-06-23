import {service} from "./services";
import {GOODS} from "./constants";

export const app = new Vue({
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