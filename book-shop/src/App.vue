<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {
    console.log('I was born here');
  },
  mounted() {
    console.log('I was render here');
  },
  beforeDestroy() {
    console.log('This is my last word');
  },
};
</script>

<style>
@import url('https://fonts.cdnfonts.com/css/volte');
html,
body {
  height: 100vh;
}
body,
h1 {
  margin: 0;
}
input[type=text] {
  border: 0;
  -webkit-border-radius: 0;
  -webkit-text-size-adjust: none;
  -webkit-appearance: none;
}
:focus {
  outline: none !important;
}
#app {
  font-family: 'Volte', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
}
</style>
