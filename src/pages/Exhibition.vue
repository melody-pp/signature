<template>
  <div class="mainBox">
    <img class="title" src="../assets/bt.png" @click="$router.push('/')">
    <div class="sig-list-wrapper">
      <div class="sig-list-container" :style="{width: sigList.length*120+'vh'}">
        <Signature v-for="sigUrl of sigList" :sigUrl="sigUrl" class="signature"/>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import '../components/marquee'
  import Signature from '../components/Signature'

  export default {
    name: 'Exhibition',
    components: {Signature},
    data: () => ({
      $mq: null
    }),
    computed: {
      sigList () {
        return this.$store.state.sigList
      }
    },
    mounted () {
      this.$mq = $('.sig-list-wrapper').marquee({
        speed: 120,
        duplicated: true,
        startVisible: true,
        pauseOnHover: true,
      })
    },
    beforeDestroy () {
      this.$mq.marquee('destroy')
    }
  }
</script>

<style scoped lang="scss">
  .mainBox {
    text-align: center;
    .title {
      width: 30vw;
    }
    .sig-list-wrapper {
      overflow: auto;
    }
    .sig-list-container {
      margin-top: 15vh;
    }
    .signature {
      margin: 0 10vh;
      float: left;
    }
  }
</style>
