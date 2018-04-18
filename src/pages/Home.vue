<template>
  <div class="mainBox">
    <img class="title" src="../assets/bt.png" alt="">
    <div class="sig-container">
      <div class="juan-container">
        <img class="zhou left" src="../assets/juanzhou_bian.png">
        <img class="juan" src="../assets/juanzhou_zhong.png">
        <img class="zhou right" src="../assets/juanzhou_bian.png">
      </div>
      <canvas ref="canvas" width="655" height="235"></canvas>

      <button @click="clear">清除</button>
      <button @click="revoke">撤销</button>
      <button @click="cancelRevoke">取消撤销</button>
      <button @click="erase">擦除</button>
    </div>
    <div class="menu">
      <ul>
        <li class="menuPer">
          <img src="../assets/xj.png" alt="">
        </li>
        <li class="menuPer">
          <img src="../assets/bc.png" alt="">
          <ul>
            <li class="subMenu">
              <img src="../assets/cu.png" @click="setStrokeStyle('thick')">
            </li>
            <li class="subMenu" style="transform: rotateZ(60deg)">
              <img src="../assets/xi.png" @click="setStrokeStyle('thin')" style="transform: rotateZ(-60deg)">
            </li>
          </ul>
        </li>
        <li class="menuPer">
          <img src="../assets/bj.png" alt="">
        </li>
      </ul>
      <div class="collect">
        <img src="../assets/sc.png" alt="">
      </div>
      <div class="goBack">
        <img src="../assets/fh.png" alt="">
      </div>
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
      }
    }
  }
</script>

<style scoped lang="scss">
  .mainBox {
    text-align: center;
  }

  .sig-container {
    width: 785px;
    margin: auto;
    position: relative;
  }

  .juan-container {
    font-size: 0;
  }

  .juan {
    width: 720px;
  }

  .zhou {
    width: 42px;
    &.left {
      position: relative;
      margin-right: -10px;
    }
    &.right {
      margin-left: -10px;
    }
  }

  canvas {
    top: 85px;
    left: 65px;
    width: 655px;
    height: 235px;
    position: absolute;
    background: #fff;
  }

  .menu {
    position: relative;
    .menuPer {
      width: 263px;
      height: 93px;
      background: url("../assets/bjbg.png") no-repeat;
      float: left;
      & img {
        left: 50%;
        top: 50%;
        transform: translate(-67%, 94%);
      }
      .subMenu {
        width: 78px;
        height: 77px;
        background: url("../assets/qkbg.png") no-repeat;
        float: left;
      }
    }
    .collect {
      width: 330px;
      height: 195px;
      background: url("../assets/scbg.png") no-repeat;
      position: absolute;
      right: 420px;
      & img {
        left: 50%;
        top: 50%;
        transform: translate(57%, 159%);
      }
    }
    .goBack {
      width: 127px;
      height: 115px;
      background: url("../assets/qkbg.png") no-repeat;
      background-size: 98%;
      position: absolute;
      right: 20px;
      & img {
        left: 50%;
        top: 50%;
        transform: translate(-10%, 155%);
      }
    }
  }

</style>
