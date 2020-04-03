<template>
  <div :class="`${$options.name}`"
    v-if="!isCartEmpty"
  >
    <div :class="`${$options.name}__container`">
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
        <div :class="`${$options.name}__change`">
          <div>Change:</div>
          <div
            data-qe="cash-change"
            :class="`${$options.name}__change__amount`"
          >{{ calculateChange() }}</div>
        </div>
        <div :class="`${$options.name}__quickCash`">Quick cash payment</div>
        <div :class="`${$options.name}__macro`">
          <div
            :class="'cursor-pointer'"
            @click="onClickHundredUp(cart.total)"
            data-qe="pay-hundred-round-up"
          >{{ normalizeCurrency(roundUp(cart.total)) }}</div>
          <div
            :class="[`${$options.name}__exact`, 'cursor-pointer']"
            @click="onClickExact(cart.total)"
            data-qe="pay-exact"
          >
            <div>Exact</div>
          </div>
        </div>
      </div>
    </div>
    <div :class="`${$options.name}__footer`">
      <div
        :class="[`${$options.name}__submit`, 'cursor-pointer']"
        @click="onPayNow"
        data-qe="pay-now"
      >Pay Now</div>
    </div>
  </div>
  <div :class="`${$options.name}`" v-else>Cart Empty</div>
</template>

<script>
import { mapGetters } from 'vuex';
import get from 'lodash.get';
import router from '@/router';
import store from '@/store';
import normalizer from '@/utils/normalizer';

const baseTemplate = '<div data-qe="sale-complete"><b>Sale Complete</b></div>';

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
      this.txtInput = this.roundUp(money);
    },
    onClickExact() {
      this.txtInput = this.cart.total;
    },
    onPayNow() {
      const { total } = this.cart;
      const change = this.txtInput - total;

      if (this.txtInput == null || change == null || change < 0) {
        return this.$dialog.alert(
          '<div data-qe="not-enough-money">Amount not enough</div>',
          { html: true, okText: 'OK' },
        );
      }

      return this.paymentSuccess(this.txtInput, change);
    },
    roundUp(money) {
      if (!money) return -1;
      const pow = money % 100 === 0 ? 1000 : 100;
      return Math.ceil(money / pow) * pow;
    },
    normalizeCurrency(money) {
      return normalizer.THBCurrency(money);
    },
    calculateChange() {
      const change = Math.max(this.txtInput - this.cart.total || 0, 0);
      return this.normalizeCurrency(change);
    },
    paymentSuccess(cash, change = 0) {
      return this.$dialog.alert(baseTemplate, { html: true, okText: 'OK' })
        .then(() => {
          store.dispatch('carts/updateChange', change);
          store.dispatch('carts/updateCash', cash);
          router.push({ name: 'ThankYouView' });
        });
    },
  },
};
</script>

<style lang="scss" scoped src="@/assets/styles/cash-payment.scss">
</style>
