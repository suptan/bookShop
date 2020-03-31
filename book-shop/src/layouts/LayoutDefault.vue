<template>
  <div :class="`${$options.name}`">
    <nav :class="`${$options.name}__nav`">
        <router-link to="/">Little Brown Book Shop</router-link>
    </nav>
    <main :class="`${$options.name}__main`">
      <slot />
    </main>
  </div>
</template>

<script>
export default {
  name: 'LayoutDefault',
};
</script>

<style lang="scss" scoped src="@/assets/styles/layout-default.scss">
</style>
