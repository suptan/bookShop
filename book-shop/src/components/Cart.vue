<template>
  <div :class="`${$options.name}`">
    <div :class="`${$options.name}__header`"><h1>Cart</h1></div>
    <div :class="`${$options.name}__content`">
      <div :class="`${$options.name}__row`">
        <div>Name</div>
        <div>QTY</div>
        <div>Price</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Cart',
  computed: {
    ...mapGetters({
      books: 'products/books',
    }),
  },
  mounted() {
    this.$store.dispatch('products/getBooks');
  },
}
</script>

<style lang="scss" scoped src="@/assets/styles/cart.scss">
</style>
