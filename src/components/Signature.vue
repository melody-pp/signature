<template>
  <div class="sig-container clearfix">
    <div class="juan-container">
      <img class="zhou left" src="../assets/juanzhou_bian.png">
      <img class="juan" src="../assets/juanzhou_zhong.png">
      <img class="zhou right" src="../assets/juanzhou_bian.png">
    </div>
    <img :src="sigUrl" class="signature">
  </div>
</template>

<script>
  export default {
    name: 'Signature',
    props: ['sigUrl'],
  }
</script>

<style scoped lang="scss">
  .sig-container {
    position: relative;
    > img {
      top: 10.4vh;
      left: 9vh;
      height: 29vh;
      position: absolute;
    }
  }

  .juan-container {
    .juan {
      height: 50vh;
    }

    .zhou {
      height: 50vh;
      &.left {
        position: relative;
        margin-right: -1vh;
      }
      &.right {
        margin-left: -1vh;
      }
    }
  }
</style>
