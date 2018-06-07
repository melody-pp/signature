<template>
  <div class="mainBox center" @click="$store.commit('setState', {pageIndex: 0, initAnimate:true})">
    <img class="title" src="../assets/exhibitionTitle.png">
    <div v-show="isLoading" class="loading">
      <img src="../assets/loadingSig.gif" class="loadingImg">
      <img src="../assets/loadingTxt.png" class="loadingTxt">
    </div>

    <div class="sig-list-wrapper" v-show="!isLoading">
      <div class="sig-list-container" :style="{width: sigList.length*140+'vh'}">
        <Signature v-for="sig of sigList" :sigUrl="sig.dataurl" :key="sig.id" class="signature"/>
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
      $mq: null,
      sigList: [],
      isLoading: true
    }),
    mounted () {

      this.$axios.post('/qmadmin/index.php/index/index/getalldata').then(data => {
        this.isLoading = false
        this.sigList = data.data
        const len = this.sigList.length

        if (len < 2) {
          return
        }

        this.$nextTick(() => {
          this.$mq = $('.sig-list-wrapper').marquee({
            speed: 120,
            duplicated: len > 2,
            startVisible: true,
          })
          // magic code
          // 当sigList长度超过50时， marquee会生成两个列表，删除后一个
          const extra = $('.js-marquee').eq(1)
          extra && extra.remove()
        })
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
      width: 22vw;
      margin-top: 8vh;
      margin-bottom: -2.5vh;
    }
    .sig-list-wrapper {
      overflow: hidden;
    }
    .sig-list-container {
      margin-top: 15vh;
      margin-left: 30vw;
    }
    .signature {
      margin: 0 10vh;
      float: left;
    }
  }
</style>
