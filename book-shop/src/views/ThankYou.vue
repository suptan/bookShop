<template>
  <layout-default>
    <div :class="`${$options.name}`">
      <h2>Thank you</h2>
      <div :class="`${$options.name}__container`">
        <div :class="`${$options.name}__content`">
          <div :class="`${$options.name}__shop`">Little Brown Book</div>
          <div
            :class="[`${$options.name}__date`, `${$options.name}__row`]"
            data-qe="receipt-date"
          >
            <div>Date: {{ printDate.toLocaleDateString("en-US") }}</div>
            <div>{{ printDate.toLocaleTimeString() }}</div>
          </div>
          <div :class="`${$options.name}__itemList`">
            <div
              :class="[`${$options.name}__row`, `${$options.name}__item`]"
              v-for="book in paidItems"
              :key="book.id"
              :data-qe="`item-id-${book.id}`"
            >
              <div :class="`${$options.name}__item__left`">
                <div>{{ book.amount }}x</div>
                <div :class="`${$options.name}__item__title`">{{ book.title }}</div>
              </div>
              <div>{{ normalizeCurrency(book.total) }}</div>
            </div>
          </div>
          <div>
            <div
              :class="[`${$options.name}__discount`, `${$options.name}__row`]"
              data-qe="discount-amount"
            >
              <div>Discount</div>
              <div>{{ normalizeCurrency(cart.discount.amount) }}</div>
            </div>
            <div
              :class="[`${$options.name}__total`, `${$options.name}__row`]"
              data-qe="sub-total-amount"
            >
              <div>Sub Total</div>
              <div>{{ normalizeCurrency(cart.subTotal) }}</div>
            </div>
          </div>
          <div>
            <div :class="[`${$options.name}__row`]" data-qe="total-amount">
              <div>Total</div>
              <div data-qe="cash-amount">{{ normalizeCurrency(cart.total) }}</div>
            </div>
          </div>
          <div>
            <div :class="[`${$options.name}__row`]" data-qe="cash-amount">
              <div><b>CASH</b></div>
              <div>{{ normalizeCurrency(cart.cash) }}</div>
            </div>
            <div
              :class="[`${$options.name}__row`, `${$options.name}__change`]"
              data-qe="change-amount"
            >
              <div>Change</div>
              <div>{{ normalizeCurrency(cart.change) }}</div>
            </div>
          </div>
        </div>
      </div>
      <div :class="`${$options.name}__footer`">
        <div :class="`${$options.name}__footer__message`">
          <span>You will be redirected back in {{ countDown }} second(s)</span>
        </div>
        <div
            :class="[`${$options.name}__submit`, 'cursor-pointer']"
            @click="navigateToHome"
            data-qe="back-to-home"
        >Back To Home</div>
      </div>
    </div>
  </layout-default>
</template>

<script>
import { mapGetters } from 'vuex';
import router from '@/router';
import LayoutDefault from '@/layouts/LayoutDefault';
import normalizer from '@/utils/normalizer';

export default {
  name: 'ThankYouView',
  data() {
    return {
      printDate: new Date(),
      countDown: 5,
    };
  },
  components: {
    LayoutDefault,
  },
  computed: {
    ...mapGetters({
      cart: 'carts/cart',
      item: 'carts/item',
    }),
    paidItems() {
      return this.item.books.filter(book => book.amount > 0);
    },
  },
  created() {
    this.countDownTimer();
  },
  mounted() {
    // setTimeout(() => this.navigateToHome(), 5000);
  },
  methods: {
    countDownTimer() {
      if (this.countDown > 0) {
        setTimeout(() => {
          this.countDown -= 1;
          this.countDownTimer();
        }, 1000);
      }
    },
    navigateToHome() {
      this.$store.dispatch('carts/clearCart');
      router.push({ name: 'HomeView' });
    },
    normalizeCurrency(money) {
      return normalizer.THBCurrency(money);
    },
  },
};
</script>

<style lang="scss" scoped src="@/assets/styles/thank-you-view.scss">
</style>
