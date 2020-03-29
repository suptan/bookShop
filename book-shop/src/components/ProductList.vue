<template>
  <div :class="`${$options.name}`">
    <div :class="`${$options.name}__header`">
      <SearchArea />
    </div>
    <div :class="`${$options.name}__content`">
      <product-list-item v-for="book in books"
      :key="book.id"
      :book="book"
      />
      <div v-if="!books || books.length === 0">No Books</div>
    </div>
  </div>
</template>

<script>
import ProductListItem from './ProductListItem';
import SearchArea from './SearchArea';

export default {
  name: 'ProductList',
  components: {
    ProductListItem,
    SearchArea,
  },
  props: {
    books: {
      type: Array,
    }
  },
}
</script>

<style lang="scss" scoped src="@/assets/styles/product-list.scss">
</style>
