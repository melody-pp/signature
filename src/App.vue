<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  body{
    background: url("./assets/bg.jpg") no-repeat;
    background-size:100%;
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
  }
  ul,li{
    list-style: none;
    margin: 0;
    padding: 0;
  }
</style>
