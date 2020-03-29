<template>
  <layout-default>
    <div :class="`${$options.name}`">
      <h2>Payment</h2>
      <div :class="`${$options.name}__container`">
        <cash-payment />
      </div>
    </div>
  </layout-default>
</template>

<script>
import { mapGetters } from 'vuex';
import LayoutDefault from '@/layouts/LayoutDefault'
import Cart from '@/components/Cart'
import CashPayment from '@/components/CashPayment'
import router from '../router'

export default {
  name: 'PaymentView',
  components: {
    LayoutDefault,
    CashPayment
  },
  computed: {
    ...mapGetters({
      cart: 'carts/cart',
      // item: 'carts/item'
    }),
  },
}
</script>

<style lang="scss" scoped src="@/assets/styles/payment-view.scss">
</style>
