<template>
  <layout-default>
    <div :class="`${$options.name}`">
      <div :class="`${$options.name}__content`">
        <div :class="`${$options.name}__shelf`">
          <!-- <div :class="`${$options.name}__title`"><h1>Shelf</h1></div> -->
          <product-list />
        </div>
        <div :class="`${$options.name}__cart`"><cart /></div>
        <div :class="`${$options.name}__cart__mobile`" v-if="isShow">
          <span :class="`${$options.name}__header__close`" @click="isShow = false">X</span>
          <cart />
        </div>
      </div>
      <div :class="`${$options.name}__basket`" @click="isShow = true">
        <div>
          <span>Cart</span>
          <span><b>{{ countItems() }}</b> item(s)</span>
        </div>
        <div><b>{{ normalizeCurrency(cart.total) }}</b></div>
      </div>
    </div>
  </layout-default>
</template>

<script>
import { mapGetters } from 'vuex';
import LayoutDefault from '@/layouts/LayoutDefault';
import ProductList from '@/components/ProductList';
import Cart from '@/components/Cart';
import normalizer from '@/utils/normalizer';

export default {
  name: 'HomeView',
  components: {
    LayoutDefault,
    ProductList,
    Cart,
  },
  data() {
    return {
      isShow: false,
    };
  },
  computed: {
    ...mapGetters({
      books: 'products/books',
      cart: 'carts/cart',
    }),
  },
  mounted() {
    this.$store.dispatch('products/getBooks');
  },
  methods: {
    countItems() {
      return this.cart.item.books.reduce((sum, book) => sum + book.amount, 0);
    },
    normalizeCurrency(money) {
      return normalizer.THBCurrency(money);
    },
  },
};
</script>

<style lang="scss" scoped src="@/assets/styles/home-view.scss">
</style>
