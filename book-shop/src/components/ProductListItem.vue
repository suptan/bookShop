<template>
  <div :class="`${$options.name}`">
    <div :class="`${$options.name}__thumb`"><img :src="`${book.cover}`" :alt="`${book.title}`" /></div>
    <div :class="`${$options.name}__info`">
      <span :class="`${$options.name}__title`">{{ book.title }}</span>
      <span :class="`${$options.name}__price`">
        <span :class="`${$options.name}__priceSymbol`">฿</span>
        <span>{{ book.price }}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductListItem',
  props: {
    book: {
      type: Object
    }
  }
}
</script>

<style lang="scss" scoped src="@/assets/styles/product-list-item.scss">
</style>
