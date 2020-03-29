<template>
  <div :class="`${$options.name}`">
    <div :class="`${$options.name}__header`">
      <div>
        <span><img src="../assets/icons/cash.png" alt="cash" :class="`${$options.name}__icon`"></span>
        <span>Cash</span>
      </div>
      <div>{{ normalizeCurrency(cart.total) }}</div>
    </div>
    <div>
      <div :class="`${$options.name}__cash`">
        <div :class="`${$options.name}__cash__area`">
          <span><input type="number" placeholder="0" :class="`${$options.name}__input`"></span>
        </div>
      </div>
      <div :class="`${$options.name}__macro`">
        <div>{{ roundUp(cart.total) }}</div>
        <div>Exact</div>
      </div>
      <div :class="`${$options.name}__footer`">
        <div :class="`${$options.name}__submit`">Pay Now</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import normalizer from '@/utils/normalizer';

export default {
  name: 'CashPayment',
  computed: {
    ...mapGetters({
      cart: 'carts/cart',
    }),
  },
  methods: {
    roundUp(money) {
      return Math.ceil(Math.ceil(money/10)/10) * 100;
    },
    normalizeCurrency(money) {
      return normalizer.THBCurrency(money);
    },
  },
}
</script>

<style lang="scss" scoped src="@/assets/styles/cash-payment.scss">
</style>
