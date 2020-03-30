<template>
  <layout-default>
    <div :class="`${$options.name}`">
      <h2>Payment</h2>
      <div :class="`${$options.name}__container`">
        <cash-payment />
      </div>
      <div :class="`${$options.name}__back`" @click="navigate()">
        <img src="../assets/icons/back.png" alt="back">
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
    }),
  },
  methods: {
    navigate() {
      router.push({ name: 'HomeView' })
    }
  }
}
</script>

<style lang="scss" scoped src="@/assets/styles/payment-view.scss">
</style>
