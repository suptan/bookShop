<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  // created() {
  //   console.log('I was born here'); //eslint-disable-line
  // },
  // mounted() {
  //   console.log('I was render here'); //eslint-disable-line
  // },
  // beforeDestroy() {
  //   console.log('This is my last word'); //eslint-disable-line
  // },
};
</script>

<style lang="scss">
@import url('https://fonts.cdnfonts.com/css/volte');
@import '@/assets/variable.scss';
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
.cursor-pointer {
  cursor: pointer;
}
.spinner {
  border: 16px solid #f3f3f3;
  border-top: 16px solid $main-color;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
