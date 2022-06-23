export default Vue.component('search', {
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
      <div class="form">
        <input class="search_one" type="text" name="q" placeholder="Поиск" :value="value" @input="input">                           
        <input type="submit" class="search_img" name="submit" value="">
      </div>
    `
})