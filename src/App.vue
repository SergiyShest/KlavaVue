<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" height="20" />
    <klava-inp Example="Welcome to Your Vue.js App" Inputed="Welcome to"  />
  </div>
</template>

<script>
import klava from "./components/klava.vue";
import klavaInp from "./components/klavaInp.vue";
export default {
  name: "app",
  components: {
    klavaInp
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
