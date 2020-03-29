<template>
  <div :class="`${$options.name}`">
    <div :class="`${$options.name}__content`">
      <span :class="`${$options.name}__inputBox`">
        <input
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
export default {
  name: 'SearchArea',
  methods: {
    onEnter: () => {
      console.log('bar');
    }
  }
}
</script>

<style lang="scss" scoped src="@/assets/styles/search-area.scss">
</style>
