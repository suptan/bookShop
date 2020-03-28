<template>
  <div>
    <h1>Home</h1>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'HomeView',
  computed: {
    ...mapGetters({
      books: 'products/books',
    }),
  },
  mounted() {
    this.$store.dispatch('products/getBooks');
  },
}
</script>
