<template>
  <div :class="`${$options.name}`">
    <div :class="`${$options.name}__content`">
      <span :class="`${$options.name}__inputBox`">
        <input
          type="text"
          placeholder="search books..."
          v-model="searchTxtInput"
          @keyup.enter="onEnter"
        />
      </span>
      <span>
        <img
          src="../assets/icons/search.png"
          alt="search"
          :class="`${$options.name}__icon`"
        />
      </span>
    </div>
  </div>
</template>

<script>
import store from '@/store';

export default {
  name: 'SearchArea',
  data() {
    return {
      searchTxtInput: undefined,
    };
  },
  methods: {
    onEnter() {
      store.dispatch('products/filterBooks', this.searchTxtInput);
    },
  },
};
</script>

<style lang="scss" scoped src="@/assets/styles/search-area.scss">
</style>
