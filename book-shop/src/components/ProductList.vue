<template>
  <div :class="`${$options.name}`">
    <div :class="`${$options.name}__header`">
      <search-area />
    </div>
    <div :class="`${$options.name}__content`">
      <product-list-item v-for="book in books"
      :key="book.id"
      :book="book"
      />
      <div :class="`${$options.name}__spinner`" v-if="isFetchBooks">
        <div :class="'spinner'"></div>
      </div>
      <div v-if="(!books || books.length === 0) && !isFetchBooks">No Books</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ProductListItem from './ProductListItem';
import SearchArea from './SearchArea';

export default {
  name: 'ProductList',
  components: {
    ProductListItem,
    SearchArea,
  },
  computed: {
    ...mapGetters({
      books: 'products/displayBooks',
      isFetchBooks: 'products/isFetchBooks',
    }),
  },
}
</script>

<style lang="scss" scoped src="@/assets/styles/product-list.scss">
</style>
