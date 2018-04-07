<template>
  <div class="mainBox">
    <div class="sig-container">
      <div class="juan-container">
        <img class="zhou left" src="../assets/juanzhou_bian.png">
        <img class="juan" src="../assets/juanzhou_zhong.png">
        <img class="zhou right" src="../assets/juanzhou_bian.png">
      </div>
      <canvas ref="canvas" width="655" height="235"></canvas>

      <button @click="setStrokeStyle('thin')">细</button>
      <button @click="setStrokeStyle('thick')">粗</button>
      <button @click="clear">清除</button>
      <button @click="revoke">撤销</button>
      <button @click="cancelRevoke">取消撤销</button>
      <button @click="erase">擦除</button>
    </div>
  </div>
</template>

<script>
  import SignaturePad from 'signature_pad'

  let signaturePad
  let revokeStep = 0
  let revokeStates = []

  const ratio = 1
  const strokeWidths = {thin: [1, 6], thick: [2, 10]}

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

</style>
