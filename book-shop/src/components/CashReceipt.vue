<template>
  <div :class="`${$options.name}`">
    <ul>
      <li v-for="item in items" :key="item.id">
        <!-- <a href="#" @click="handleSelect(index)"> -->
          {{ item.title }}
          <span v-if="item.amount">({{ item.amount }})</span>
        <!-- </a> -->
      </li>
    </ul>
  </div>
</template>

<script>
// import DialogMixin from 'vuejs-dialog/vuejs-dialog-mixin.min.js'; // Include mixin

export default {
  // mixins: [DialogMixin],
  props: ['items'],
};
</script>
