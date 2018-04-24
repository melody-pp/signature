<template>
  <div class="mainBox" :class="{center}">
    <img class="title" src="../assets/bt.png">
    <div ref="sig" class="sig-container">
      <img class="zhou left" src="../assets/juanzhou_bian.png">
      <div ref="juan" class="juan-wrapper">
        <img class="juan" src="../assets/juanzhou_zhong.png">
        <canvas ref="canvas" :width="cvWidth" :height="cvHeight"></canvas>
      </div>
      <img class="zhou right" src="../assets/juanzhou_bian.png">
    </div>
    <div class="menu">
      <ul class="clearfix">
        <li class="menuPer">
          <img src="../assets/xj.png" @click="addSig()">
        </li>
        <li class="menuPer">
          <img src="../assets/bc.png" @click="showBichu=!showBichu">
          <ul v-show="showBichu">
            <li class="subMenu">
              <img src="../assets/cu.png" @click="setStrokeStyle('thick')">
            </li>
            <li class="subMenu">
              <img src="../assets/xi.png" @click="setStrokeStyle('thin')">
            </li>
          </ul>
        </li>
        <li class="menuPer edit">
          <img src="../assets/bj.png" @click="showEdit=!showEdit">
          <ul v-show="showEdit">
            <li class="subMenu">
              <img src="../assets/qk.png" @click="clear">
            </li>
            <li class="subMenu">
              <img src="../assets/cch.png" @click="erase">
            </li>
            <li class="subMenu">
              <img src="../assets/cx.png" @click="revoke">
            </li>
            <li class="subMenu">
              <img src="../assets/qxcx.png" @click="cancelRevoke">
            </li>
          </ul>
        </li>
        <li class="collect">
          <img src="../assets/sc.png" @click="saveSig">
        </li>
        <li class="goBack">
          <img src="../assets/fh.png" @click="goBack">
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { TimelineLite } from 'gsap'
  import SignaturePad from 'signature_pad'

  let signaturePad
  let revokeStep = 0
  let revokeStates = []

  const ratio = 1
  const strokeWidths = {thin: [1, 6], thick: [8, 20]}

  export default {
    name: 'home',
    data: () => ({
      cvWidth: 655,
      showEdit: false,
      showBichu: false,
      center: false
    }),
    computed: {
      cvHeight () {
        return this.cvWidth * 0.3588
      }
    },
    created () {
      this.cvWidth = window.innerWidth * 0.545833333
      this.center = (window.innerWidth / window.innerHeight) < 1.667

      window.addEventListener('resize', () => {
        this.center = (window.innerWidth / window.innerHeight) < 1.667
      })
    },
    mounted () {
      signaturePad = new SignaturePad(
        this.$refs.canvas,
        {minWidth: 1, maxWidth: 6, onEnd: this.addRevokeState}
      )
    },
    methods: {
      setStrokeStyle (style) {
        const [minWidth, maxWidth] = strokeWidths[style]

        signaturePad.minWidth = minWidth
        signaturePad.maxWidth = maxWidth
        signaturePad.penColor = '#000'
      },
      clear () {
        signaturePad.clear()
      },
      addRevokeState () {
        revokeStates = revokeStates.slice(revokeStep)
        revokeStates.unshift(signaturePad.toDataURL())
        revokeStep = 0
      },
      revoke () {
        this.clear()

        revokeStep = Math.min(revokeStates.length - 2, revokeStep)
        signaturePad.fromDataURL(revokeStates[++revokeStep], {ratio})
      },
      cancelRevoke () {
        this.clear()

        revokeStep = Math.max(1, revokeStep)
        signaturePad.fromDataURL(revokeStates[--revokeStep], {ratio})
      },
      erase () {
        signaturePad.minWidth = 10
        signaturePad.maxWidth = 10
        signaturePad.penColor = '#fff'
      },
      goBack () {
        console.log('返回')
      },
      addSig () {
        this.clear()
        revokeStep = 0
        revokeStates = []

        const {juan, sig} = this.$refs
        const timeline = new TimelineLite()

        timeline
          .set(juan, {width: 0})
          .set(sig, {scale: 0.5, autoAlpha: 0.5, y: 400, x: -700, rotation: 360})
          .to(sig, 1, {autoAlpha: 1, scale: 1, y: 0, x: 0, rotation: 0})
          .to(juan, 2, {width: '60vw'})
      },
      saveSig () {
        const timeline = new TimelineLite({
          onComplete: () => {
            this.$store.commit('addSig', signaturePad.toDataURL())
            this.$router.push('/exhibition')
          }
        })
        const {juan, sig} = this.$refs

        timeline
          .to(juan, 2, {width: 0})
          .to(sig, .8, {y: 100, rotation: 180})
          .to(sig, 1.5, {scale: 0.5, autoAlpha: 0.5, y: 300})

      }
    }
  }
</script>

<style scoped lang="scss">
  .mainBox {
    text-align: center;
    .title {
      width: 30vw;
    }
  }

  .center {
    top: 50%;
    position: absolute;
    transform: translateY(-50%);
  }

  .sig-container {
    font-size: 0;
  }

  .juan-wrapper {
    overflow: hidden;
    position: relative;
    display: inline-block;
  }

  .juan {
    width: 60vw;
  }

  .zhou {
    width: 3.5vw;
    &.left {
      position: relative;
      margin-right: -.5vw;
    }
    &.right {
      margin-left: -.5vw;
    }
  }

  canvas {
    top: 7.1vw;
    left: 2.75vw;
    width: 54.5833333vw;
    height: 19.5845vw;
    position: absolute;
    background: #fff;
  }

  .menu {
    margin-top: 8vh;
    > ul > li {
      width: 20vw;
      line-height: 12vw;
      float: left;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center center;
      > img {
        width: 30%;
        cursor: pointer;
        position: relative;
        z-index: 2;
      }
    }
    .menuPer {
      position: relative;
      background-image: url("../assets/bjbg.png");
      > img {
        transform: translate(-68%, 50%);
      }
      > ul {
        position: absolute;
        top: -5vw;
      }
      .subMenu {
        width: 5vw;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center center;
        background-image: url("../assets/qkbg.png");
        float: left;
        img {
          width: 35%;
          cursor: pointer;
          transform: translate(0%, 35%)
        }
      }
      &.edit {
        .subMenu img {
          width: 65%;
        }
      }
    }
    .collect {
      height: 12vw;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center center;
      background-image: url("../assets/scbg.png");
      img {
        width: 30%;
        cursor: pointer;
        transform: translate(50%, 40%);
      }
    }
    .goBack {
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center center;
      background-image: url("../assets/qkbg.png");
      img {
        width: 30%;
        cursor: pointer;
        transform: translate(0%, 40%);
      }
    }
  }
</style>
