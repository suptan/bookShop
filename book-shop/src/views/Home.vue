<template>
  <layout-default>
    <div :class="`${$options.name}`">
      <div :class="`${$options.name}__title`"><h1>Shelf</h1></div>
      <product-list :books="books"/>
      <button date-qe="submit" v-on:click="navigate()" :class="`${$options.name}__button`">Go</button>
      <div v-for="book in books" :key="book.id">
          <h1 data-qe="book-title">{{ book.title }}</h1>
      </div>
    </div>
  </layout-default>
</template>

<script>
import { mapGetters } from 'vuex';
import LayoutDefault from '@/layouts/LayoutDefault'
import ProductList from '@/components/ProductList'
import router from '../router'

export default {
  name: 'HomeView',
  components: {
    LayoutDefault,
    ProductList,
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
      }
  }
}
</script>

<style lang="scss" scoped src="@/assets/styles/home-view.scss">
</style>
