export default Vue.component('custom-button', {
    template: `
    <button @click="$emit('click')" class="cart-button" type="button">
      <slot></slot>
    </button>
    `
})