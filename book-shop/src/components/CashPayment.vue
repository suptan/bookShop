<template>
  <div :class="`${$options.name}`"
    v-if="!isCartEmpty"
  >
    <div :class="`${$options.name}__header`">
      <div>
        <span>
          <img src="../assets/icons/cash.png" alt="cash" :class="`${$options.name}__icon`">
        </span>
        <span>Cash</span>
      </div>
      <div>{{ normalizeCurrency(cart.total) }}</div>
    </div>
    <div>
      <div :class="`${$options.name}__cash`">
        <div :class="`${$options.name}__cash__area`">
          <span>
            <input
              type="number"
              placeholder="0"
              :class="`${$options.name}__input`"
              data-qe="input-amount"
              v-model="txtInput"
              @keyup.enter="onPayNow"
            >
          </span>
        </div>
      </div>
      <div :class="`${$options.name}__macro`">
        <div
          :class="'cursor-pointer'"
          @click="onClickHundredUp(cart.total)"
          data-qe="pay-hundred-round-up"
        >{{ normalizeCurrency(roundUp(cart.total)) }}</div>
        <div
          :class="'cursor-pointer'"
          @click="onClickExact(cart.total)"
          data-qe="pay-exact"
        >Exact</div>
      </div>
      <div :class="`${$options.name}__footer`">
        <div
          :class="[`${$options.name}__submit`, 'cursor-pointer']"
          @click="onPayNow"
          data-qe="pay-now"
        >Pay Now</div>
      </div>
    </div>
  </div>
  <div :class="`${$options.name}`" v-else>Cart Empty</div>
</template>

<script>
import { mapGetters } from 'vuex';
import get from 'lodash.get';
import normalizer from '@/utils/normalizer';
import router from '@/router';
import store from '@/store';

const baseTemplate = '<div data-qe="sale-complete"><b>Sale Complete</b></div>';
const changeTemplate = '<br><div data-qe="change-amount">Change: $0</div>';

export default {
  name: 'CashPayment',
  data() {
    return {
      txtInput: undefined,
      isCartEmpty: true,
    };
  },
  computed: {
    ...mapGetters({
      cart: 'carts/cart',
    }),
  },
  created() {
    this.isCartEmpty = get(this, ['cart', 'item', 'books', 'length'], 0) < 1;
  },
  methods: {
    onClickHundredUp(money) {
      const { total } = this.cart;
      const recieved = this.roundUp(money);
      const change = recieved - total;
      const message = baseTemplate + changeTemplate.replace('$0', normalizer.THBCurrency(change));
      return this.paymentSuccess(message);
    },
    onClickExact() {
      return this.paymentSuccess(baseTemplate);
    },
    onPayNow() {
      const { total } = this.cart;
      const change = this.txtInput - total;

      if (this.txtInput == null || change == null || change < 0) {
        return this.$dialog.alert(
          '<div data-qe="not-enough-money">Please fill in the correct amount</div>',
          { html: true, okText: 'OK' }
        );
      }

      const displayChange = change > 0
        ? changeTemplate.replace('$0', normalizer.THBCurrency(change))
        : '';
      const message = baseTemplate + displayChange;
      return this.paymentSuccess(message);
    },
    roundUp(money) {
      if (!money) return -1;
      return Math.ceil(Math.ceil(money / 10) / 10) * 100;
    },
    normalizeCurrency(money) {
      return normalizer.THBCurrency(money);
    },
    paymentSuccess(message) {
      return this.$dialog.alert(message, { html: true, okText: 'OK' })
        .then(() => {
          store.dispatch('carts/clearCart');
          router.push({ name: 'HomeView' });
        });
    },
  },
};
</script>

<style lang="scss" scoped src="@/assets/styles/cash-payment.scss">
</style>
