<template>
  <div :class="`${$options.name}`">
    <div :class="`${$options.name}__container`">
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
            <div>{{ normalizeCurrency(book.total) }}</div>
        </div>
        <div v-if="!item.books || item.books.length === 0">Cart Empty</div>
        <div :class="[`${$options.name}__row`, `${$options.name}__breakdown`]">
            <div :class="`${$options.name}__row`">
            <div>Discount</div>
            <div></div>
            <div>{{ normalizeCurrency(cart.discount) }}</div>
            </div>
            <div :class="`${$options.name}__row`">
            <div>Sub Total</div>
            <div></div>
            <div>{{ normalizeCurrency(cart.total) }}</div>
            </div>
        </div>
      </div>
      <div :class="`${$options.name}__footer`">Pay ({{ normalizeCurrency(cart.total) }})</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import normalizer from '@/utils/normalizer';

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
    },
    normalizeCurrency(money) {
      return normalizer.THBCurrency(money);
    }
  },
}
</script>

<style lang="scss" scoped src="@/assets/styles/cart.scss">
</style>
