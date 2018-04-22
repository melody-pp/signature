<template>
  <div class="mainBox">
    <img class="title" src="../assets/bt.png">
    <div class="sig-container">
      <div class="juan-container">
        <img class="zhou left" src="../assets/juanzhou_bian.png">
        <img class="juan" src="../assets/juanzhou_zhong.png">
        <img class="zhou right" src="../assets/juanzhou_bian.png">
      </div>
      <canvas ref="canvas" :width="cvWidth" :height="cvHeight"></canvas>
    </div>
    <div class="menu">
      <ul class="clearfix">
        <li class="menuPer">
          <img src="../assets/xj.png" @click="addSig()">
        </li>
        <li class="menuPer">
          <img src="../assets/bc.png">
          <ul>
            <li class="subMenu">
              <img src="../assets/cu.png" @click="setStrokeStyle('thick')">
            </li>
            <li class="subMenu">
              <img src="../assets/xi.png" @click="setStrokeStyle('thin')">
            </li>
          </ul>
        </li>
        <li class="menuPer">
          <img src="../assets/bj.png">
          <ul>
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
    }),
    computed: {
      cvHeight () {
        return this.cvWidth * 0.3588
      }
    },
    created () {
      this.cvWidth = window.innerWidth * 0.545833333
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
      },
      saveSig () {
        this.$store.commit('addSig', signaturePad.toDataURL())
        this.$router.push('/exhibition')
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

  .sig-container {
    margin-top: -5vh;
    position: relative;
  }

  .juan-container {
    font-size: 0;
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
    left: 22.75vw;
    width: 54.5833333vw;
    height: 19.5845vw;
    position: absolute;
    background: #fff;
  }

  .menu {
    position: relative;
    margin-top: -1vh;
    > ul > li {
      width: 20vw;
      line-height: 12vw;
      float: left;
      background-size: contain;
      background: center no-repeat;
      img {
        cursor: pointer;
      }
    }
    .menuPer {
      position: relative;
      background-image: url("../assets/bjbg.png");
      & img {
        left: 50%;
        top: 50%;
        transform: translate(-68%, 50%);
      }
      > ul {
        position: absolute;
        top: -5vw;
      }
      .subMenu {
        width: 5vw;
        background-size: contain;
        background: url("../assets/qkbg.png") center no-repeat;
        float: left;
        & img {
          transform: translate(0%, 40%)
        }
      }
    }
    .collect {
      height: 12vw;
      background: url("../assets/scbg.png") center no-repeat;
      & img {
        left: 50%;
        top: 50%;
        transform: translate(57%, 50%);
      }
    }
    .goBack {
      background-image: url("../assets/qkbg.png");
      & img {
        left: 50%;
        top: 50%;
        transform: translate(0%, 50%);
      }
    }
  }

</style>
