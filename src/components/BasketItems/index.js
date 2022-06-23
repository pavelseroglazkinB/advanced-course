export default Vue.component('basket-item', {
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