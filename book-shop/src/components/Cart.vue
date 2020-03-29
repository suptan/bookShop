<template>
  <div :class="`${$options.name}`">
    <div :class="`${$options.name}__container`">
      <div :class="`${$options.name}__header`"><h1>Cart</h1></div>
      <div :class="`${$options.name}__content`">
        <div :class="[`${$options.name}__row`, `${$options.name}__thead`]">
            <div @click="onClickRemoveAll()"><img src="../assets/icons/delete.png" alt="delete"></div>
            <div>Name</div>
            <div>QTY</div>
            <div>Price</div>
        </div>
        <div :class="`${$options.name}__row`" v-for="book in item.books" :key="book.id">
            <div @click="onClickRemove(book.id)">
              <img src="../assets/icons/delete.png" alt="delete">
            </div>
            <div :class="`${$options.name}__label`">{{ book.title }}</div>
            <div>
              <div :class="`${$options.name}__quantity`">
                <span @click="onClickDecrease(book.id)">
                  <img src="../assets/icons/minus.png" alt="minus">
                </span>
                <span :class="`${$options.name}__quantity__label`">{{ book.amount }}</span>
                <span @click="onClickIncrese(book.id)">
                  <img src="../assets/icons/plus.png" alt="plus">
                </span>
              </div>
            </div>
            <div :class="`${$options.name}__price`">
            <span>{{ normalizeCurrency(book.total) }}</span>
            </div>
        </div>
        <div :class="`${$options.name}__empty`" v-if="!item.books || item.books.length === 0">CART IS EMPTY</div>
        <div :class="[`${$options.name}__breakdown`]">
            <div :class="`${$options.name}__row`">
              <div></div>
              <div :class="`${$options.name}__label`">Discount</div>
              <div></div>
              <div :class="`${$options.name}__price`">
                <span>{{ normalizeCurrency(cart.discount.amount) }}</span>
              </div>
            </div>
            <div :class="`${$options.name}__row`">
              <div></div>
              <div :class="`${$options.name}__label`">Sub Total</div>
              <div></div>
              <div :class="`${$options.name}__price`">
                <span>{{ normalizeCurrency(cart.subTotal) }}</span>
              </div>
            </div>
        </div>
      </div>
      <div
        :class="`${$options.name}__footer`"
        @click="navigate()"
      >Pay ({{ normalizeCurrency(cart.total) }})</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import normalizer from '@/utils/normalizer';
import router from '@/router'

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
    onClickDecrease(id) {
      this.$store.dispatch('carts/decreaseBookInCart', id);
    },
    onClickIncrese(id) {
      this.$store.dispatch('carts/increaseBookInCart', id);
    },
    onClickRemove(id) {
      this.$dialog.confirm('Do you want to remove this product?')
        .then(() => this.$store.dispatch('carts/removeBookFromCart', id))
    },
    onClickRemoveAll() {
      this.$dialog.confirm('Do you want to empty the cart?')
        .then(() => this.$store.dispatch('carts/clearCart'))
    },
    normalizeCurrency(money) {
      return normalizer.THBCurrency(money);
    },
    navigate() {
      router.push({ name: 'Page2View' });
    }
  },
}
</script>

<style lang="scss" scoped src="@/assets/styles/cart.scss">
</style>
