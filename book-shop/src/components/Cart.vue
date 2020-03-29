<template>
  <div :class="`${$options.name}`">
    <div :class="`${$options.name}__header`"><h1>Cart</h1></div>
    <div :class="`${$options.name}__content`">
      <div :class="`${$options.name}__row`">
        <div>Name</div>
        <div>QTY</div>
        <div>Price</div>
      </div>
      <div :class="`${$options.name}__row`" v-for="book in item.books" :key="book.id">
        <div>{{ book.title }}</div>
        <div>{{ book.amount }}</div>
        <div>{{ book.total }}</div>
      </div>
    </div>
    {{cart}}
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Cart',
  computed: {
    ...mapGetters({
      cart: 'carts/cart',
      item: 'carts/item'
    }),
  },
  methods: {
    getItems() {
      this.$store.dispatch()
    }
  },
}
</script>

<style lang="scss" scoped src="@/assets/styles/cart.scss">
</style>
