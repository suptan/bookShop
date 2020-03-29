<template>
  <layout-default>
    <div :class="`${$options.name}`">
      <div :class="`${$options.name}__content`">
        <div :class="`${$options.name}__shelf`">
          <!-- <div :class="`${$options.name}__title`"><h1>Shelf</h1></div> -->
          <product-list />
        </div>
        <div :class="`${$options.name}__cart`"><cart /></div>
      </div>
    </div>
  </layout-default>
</template>

<script>
import { mapGetters } from 'vuex';
import LayoutDefault from '@/layouts/LayoutDefault'
import ProductList from '@/components/ProductList'
import Cart from '@/components/Cart'
import router from '../router'

export default {
  name: 'HomeView',
  components: {
    LayoutDefault,
    ProductList,
    Cart,
  },
  computed: {
    ...mapGetters({
      books: 'products/books',
    }),
  },
  mounted() {
    this.$store.dispatch('products/getBooks');
  },
  methods: {
      navigate() {
          router.push({ name: 'Page2View' });
      },
  }
}
</script>

<style lang="scss" scoped src="@/assets/styles/home-view.scss">
</style>
