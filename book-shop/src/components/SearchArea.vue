<template>
  <div :class="`${$options.name}`">
    <div :class="`${$options.name}__content`">
      <span :class="`${$options.name}__inputBox`">
        <input
          v-model="txtInput"
          type="text"
          placeholder="search books..."
          v-on:keyup.enter="onEnter"
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
      txtInput: '',
    };
  },
  methods: {
    onEnter: (e) => {
      store.dispatch('products/filterBooks', e.target.value);
    },
  },
};
</script>

<style lang="scss" scoped src="@/assets/styles/search-area.scss">
</style>
