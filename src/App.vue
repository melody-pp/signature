<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App',
    mounted () {
      if (window.innerWidth < window.innerHeight) {
        alert('请使用横屏浏览！')
        location.reload()
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Microsoft YaHei', 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  * {
    margin: 0;
    padding: 0;
  }

  body {
    background: url("./assets/bg.jpg") no-repeat;
    background-size: cover;
    margin: 0;
    padding: 0;
    min-width: 100vw;
    min-height: 100vh
  }

  ul, li {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: " ";
  }

  .clearfix:after {
    clear: both;
  }
</style>
