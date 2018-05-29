<template>
  <div id="app">
    <Home v-if="pageIndex===0"/>
    <Exhibition v-if="pageIndex===1"/>
  </div>
</template>

<script>
  import Home from './pages/Home'
  import Exhibition from './pages/Exhibition'

  export default {
    name: 'App',
    components: {Home, Exhibition},
    computed: {
      pageIndex () {
        return this.$store.state.pageIndex
      }
    },
    mounted () {
      window.ondragstart = function () { return false }
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

  img {
    user-select: none;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: " ";
  }

  .clearfix:after {
    clear: both;
  }

  .loading {
    top: 50%;
    left: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
    text-align: center;
    color: #716e6e;
  }

  .loadingImg {
    width: 3vw;
  }
</style>
