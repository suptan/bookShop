<template>
  <div :class="`${$options.name}`" @click="onClick(book)">
    <div :class="`${$options.name}__thumb`">
      <img :src="`${book.cover}`" :alt="`${book.title}`" />
    </div>
    <div :class="`${$options.name}__info`">
      <span
        :class="`${$options.name}__title`"
        :data-item-id="`${book.id}`"
        data-qe="book-title"
      >{{ book.title }}</span>
      <span :class="`${$options.name}__price`">
        <span data-qe="book-price">{{ normalizeCurrency(book.price) }}</span>
      </span>
    </div>
  </div>
</template>

<script>
import normalizer from '@/utils/normalizer';

export default {
  name: 'ProductListItem',
  props: {
    book: {
      type: Object,
    },
  },
  methods: {
    onClick(book) {
      this.$store.dispatch('carts/addBookToCart', book);
    },
    normalizeCurrency(money) {
      return normalizer.THBCurrency(money);
    },
  },
};
</script>

<style lang="scss" scoped src="@/assets/styles/product-list-item.scss">
</style>
