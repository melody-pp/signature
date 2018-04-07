<template>
  <div>
    <canvas ref="canvas" height="500" width="500"></canvas>
    <button @click="save">保存</button>
  </div>
</template>

<script>
  import SignaturePad from 'signature_pad'

  export default {
    name: 'HelloWorld',
    data () {
      return {
        signaturePad: null
      }
    },
    mounted () {
      this.signaturePad = new SignaturePad(this.$refs.canvas)
    },
    methods: {
      save () {

      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  canvas {
    height: 500px;
    width: 500px;
    border: 1px solid #000;
  }
</style>
