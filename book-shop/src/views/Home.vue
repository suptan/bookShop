<template>
  <div>
    <h1>Home</h1>
    <button date-qe="submit" v-on:click="navigate()">Go</button>
    <div v-for="book in books" :key="book.id">
        <h1 data-qe="book-title">{{ book.title }}</h1>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import router from '../router'

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
  methods: {
      navigate() {
          router.push({ name: 'Page2View' });
      }
  }
}
</script>
