<template>
  <div class="mainBox">
    <img class="title" src="../assets/bt.png" @click="$router.push('/')">
    <div class="sig-list-container">
      <Signature v-for="sigUrl of sigList" :sigUrl="sigUrl" class="signature"/>
    </div>
  </div>
</template>

<script>
  import {sigList} from "../data";

  import Signature from '../components/Signature'

  export default {
    name: "Exhibition",
    components: {Signature},
    data: () => ({
      sigList
    })
  }
</script>

<style scoped lang="scss">
  .mainBox {
    text-align: center;
    .title {
      width: 30vw;
    }
    .sig-list-container {
      margin-top: 15vh;
    }
    .signature {
      margin: 0 10vh;
    }

  }
</style>
