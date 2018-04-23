<template>
  <div class="mainBox" @click="$router.push('/')">
    <img class="title" src="../assets/bt.png" @click="$router.push('/')">
    <div class="sig-list-wrapper">
      <div class="sig-list-container" :style="{width: sigList.length*120+'vh'}">
        <Signature v-for="(sigUrl,index) of sigList" :sigUrl="sigUrl" :key="index" class="signature"/>
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
      const len = this.sigList.length

      if (len < 2) {
        return
      }

      this.$mq = $('.sig-list-wrapper').marquee({
        speed: 120,
        duplicated: len > 2,
        startVisible: true,
        pauseOnHover: true,
      })
    },
    beforeDestroy () {
      this.$mq && this.$mq.marquee('destroy')
    }
  }
</script>

<style scoped lang="scss">
  .mainBox {
    text-align: center;
    top: 50%;
    transform: translateY(-50%);
    position: absolute;
    width: 100vw;
    height: 100vh;
    .title {
      width: 30vw;
      margin-top: 6vh;
      margin-bottom: -5vh;
    }
    .sig-list-wrapper {
      overflow: hidden;
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
