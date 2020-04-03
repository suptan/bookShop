<template>
  <div :class="`${$options.name}`">
    <div :class="`${$options.name}__container`">
      <div :class="`${$options.name}__header`">
        <h1>Cart</h1>
      </div>
      <div :class="`${$options.name}__content`">
        <div :class="[`${$options.name}__row`, `${$options.name}__thead`]">
            <div
              @click="onClickRemoveAll()"
              :class="'cursor-pointer'"
              data-qe="clear-all"
            >
              <img src="../assets/icons/delete.png" alt="delete">
            </div>
            <div>Name</div>
            <div>QTY</div>
            <div>Price</div>
        </div>
        <div :class="[`${$options.name}__list`]">
          <div :class="[`${$options.name}__row`]" v-for="book in item.books" :key="book.id">
              <div
                @click="onClickRemove(book.id)"
                :class="'cursor-pointer'"
                :data-qe="`remove-${book.id}`"
              >
                <img src="../assets/icons/delete.png" alt="delete">
              </div>
              <div
                :class="`${$options.name}__label`"
                :data-item-id="book.id"
                data-qe="cart-book-title"
              >{{ book.title }}</div>
              <div>
                <div :class="`${$options.name}__quantity`">
                  <span
                    @click="onClickDecrease(book.id)"
                    :data-qe="`minus-amount-${book.id}`"
                    :class="book.amount > 1 && 'cursor-pointer'"
                  >
                    <img src="../assets/icons/minus.png" alt="minus">
                  </span>
                  <span :class="`${$options.name}__quantity__label`">{{ book.amount }}</span>
                  <span
                    @click="onClickIncrease(book.id)"
                    :data-qe="`plus-amount-${book.id}`"
                    :class="'cursor-pointer'"
                  >
                    <img src="../assets/icons/plus.png" alt="plus">
                  </span>
                </div>
              </div>
              <div :class="`${$options.name}__price`">
                <span>{{ normalizeCurrency(book.total) }}</span>
              </div>
          </div>
          <div
            :class="`${$options.name}__empty`"
            v-if="isCartEmpty">CART IS EMPTY</div>
        </div>
        <div :class="[`${$options.name}__breakdown`]">
            <div :class="`${$options.name}__row`">
              <div></div>
              <div :class="`${$options.name}__label`">Discount</div>
              <div></div>
              <div :class="`${$options.name}__price`" data-qe="cart-discount">
                <span>{{ normalizeCurrency(cart.discount.amount) }}</span>
              </div>
            </div>
            <div :class="`${$options.name}__row`">
              <div></div>
              <div :class="`${$options.name}__label`">Sub Total</div>
              <div></div>
              <div :class="`${$options.name}__price`" data-qe="cart-sub-total">
                <span>{{ normalizeCurrency(cart.subTotal) }}</span>
              </div>
            </div>
        </div>
      </div>
      <div
        :class="isCartEmpty ? `${$options.name}__footer-disabled` : `${$options.name}__footer`"
        @click="navigate(cart.total)"
        data-qe="to-payment"
      >Pay ({{ normalizeCurrency(cart.total) }})</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import normalizer from '@/utils/normalizer';
import router from '@/router';

export default {
  name: 'Cart',
  computed: {
    ...mapGetters({
      cart: 'carts/cart',
      item: 'carts/item',
    }),
    isCartEmpty() {
      const { item: { books } } = this;
      return !books || books.length === 0;
    },
  },
  methods: {
    onClickDecrease(id) {
      this.$store.dispatch('carts/decreaseBookInCart', id);
    },
    onClickIncrease(id) {
      this.$store.dispatch('carts/increaseBookInCart', id);
    },
    onClickRemove(id) {
      return this.$dialog.confirm('Do you want to remove this product?')
        .then(() => this.$store.dispatch('carts/removeBookFromCart', id));
    },
    onClickRemoveAll() {
      return this.$dialog.confirm('Do you want to empty the cart?')
        .then(() => this.$store.dispatch('carts/clearCart'));
    },
    normalizeCurrency(money) {
      return normalizer.THBCurrency(money);
    },
    navigate(total) {
      if (total > 0) {
        router.push({ name: 'PaymentView' });
      }
    },
  },
};
</script>

<style lang="scss" scoped src="@/assets/styles/cart.scss">
</style>
