<template>
  <div class="mainBox" :class="{center}">
    <img class="title" src="../assets/bt.png">
    <div ref="sig" class="sig-container">
      <img class="zhou left" src="../assets/zz.png" border="0">
      <div ref="juan" class="juan-wrapper">
        <img class="juan" src="../assets/jm.png" border="0">
        <canvas ref="canvas"></canvas>
      </div>
      <img class="zhou right" src="../assets/zz.png" border="0">
    </div>
    <div class="menu">
      <ul class="clearfix">
        <li class="menuPer">
          <img src="../assets/xj.png" @click="addSig()">
        </li>
        <li class="menuPer bc">
          <img src="../assets/bc.png">
          <ul>
            <li class="subMenu active">
              <img src="../assets/xi.png" @click="setStrokeStyle('thin')">
              <img src="../assets/xi2.png" @click="setStrokeStyle('thin')">
            </li>
            <li class="subMenu">
              <img src="../assets/cu.png" @click="setStrokeStyle('thick')">
              <img src="../assets/cu2.png" @click="setStrokeStyle('thick')">
            </li>
          </ul>
        </li>
        <li class="menuPer edit">
          <img src="../assets/bj.png">
          <ul>
            <li class="subMenu">
              <img src="../assets/qk.png" @click="clear">
              <img src="../assets/qk2.png" @click="clear">
            </li>
            <li class="subMenu">
              <img src="../assets/cch.png" @click="erase">
              <img src="../assets/cch2.png" @click="erase">
            </li>
            <li class="subMenu">
              <img src="../assets/cx.png" @click="revoke">
              <img src="../assets/cx2.png" @click="revoke">
            </li>
            <li class="subMenu">
              <img src="../assets/qxcx.png" @click="cancelRevoke">
              <img src="../assets/qxcx2.png" @click="cancelRevoke">
            </li>
          </ul>
        </li>
        <li class="collect" @click="saveSig">
        </li>
        <!--<li class="goBack">-->
        <!--<img src="../assets/fh.png" @click="goBack">-->
        <!--</li>-->
      </ul>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import { TimelineLite } from 'gsap'
  import SignaturePad from 'signature_pad'

  let signaturePad
  let revokeStep = 0
  let revokeStates = [{}]

  const ratio = Math.max(window.devicePixelRatio || 1, 1)
  const strokeWidths = {thin: [1, 6], thick: [3, 13]}

  export default {
    name: 'home',
    data: () => ({
      showEdit: false,
      showBichu: false,
      thumb: '',
      center: false,
      isBusy: false,
    }),
    created () {
      window.addEventListener('resize', this.resizeHandler.bind(this))
    },
    mounted () {
      this.bindEvent()
      this.resizeHandler()

      signaturePad = new SignaturePad(
        this.$refs.canvas,
        {minWidth: 1, maxWidth: 6, onBegin: this.onBegin, onEnd: this.addRevokeState}
      )

      // magic code edge浏览器下，第一次切换二级菜单的active会导致初始active菜单下的图片显示异常
      // 所以，加载时手动切换一次二级菜单active
      const bcs = $('.menuPer.bc li')
      bcs.eq(1).click()
      bcs.eq(0).click()

      if (this.$store.state.initAnimate) {
        const juan = this.$refs.juan
        new TimelineLite({
          onComplete: () => {
            this.$store.commit('setState', {initAnimate: false})
          }
        })
          .set(juan, {width: 0})
          .to(juan, 2, {width: '60vw'})
      }
    },
    methods: {
      bindEvent () {
        const subMenus = [...document.querySelectorAll('.subMenu')]
        subMenus.forEach(subMenu => {
          subMenu.addEventListener('click', () => {
            subMenus.forEach(item => item.classList.remove('active'))
            subMenu.classList.add('active')
          })
        })
      },
      onBegin () {
        if (signaturePad.minWidth === 1) {
          $('.menuPer.bc li').eq(0).click()
        }

        if (signaturePad.minWidth === 3) {
          $('.menuPer.bc li').eq(1).click()
        }
      },
      resizeHandler () {
        const canvas = this.$refs.canvas
        canvas.width = canvas.offsetWidth * ratio
        canvas.height = canvas.offsetHeight * ratio
        canvas.getContext('2d').scale(ratio, ratio)
        signaturePad && signaturePad.clear()

        this.center = (window.innerWidth / window.innerHeight) < 1.667
      },
      setStrokeStyle (style) {
        const [minWidth, maxWidth] = strokeWidths[style]

        signaturePad.minWidth = minWidth
        signaturePad.maxWidth = maxWidth
        signaturePad.penColor = '#000'
      },
      clear () {
        signaturePad.clear()
        this.addRevokeState()
      },
      addRevokeState () {
        revokeStates = revokeStates.slice(revokeStep)
        revokeStates.unshift(signaturePad.toDataURL())
        revokeStep = 0
      },
      revoke () {
        signaturePad.clear()
        revokeStep = Math.min(revokeStates.length - 2, revokeStep)
        signaturePad.fromDataURL(revokeStates[++revokeStep], {ratio})
      },
      cancelRevoke () {
        signaturePad.clear()
        revokeStep = Math.max(1, revokeStep)
        signaturePad.fromDataURL(revokeStates[--revokeStep], {ratio})
      },
      erase () {
        signaturePad.minWidth = 10
        signaturePad.maxWidth = 10
        signaturePad.penColor = '#fafaf9'
      },
      goBack () {
        // console.log('返回')
      },
      addSig () {
        if (this.isBusy) {
          return
        }

        this.isBusy = true
        signaturePad.clear()
        revokeStep = 0
        revokeStates = [{}]

        $('.menuPer.bc li').eq(0).click()
        const {juan, sig} = this.$refs
        new TimelineLite({
          onComplete: () => {
            this.isBusy = false
          }
        })
          .set(juan, {width: 0})
          .set(sig, {scale: 0.2, autoAlpha: 0, y: '70%', x: '-27%', rotation: 0})
          .to(sig, 2, {autoAlpha: 1, scale: 1, y: '0%', x: '0%', rotation: 360})
          .to(juan, 2, {width: '60vw'})
      },
      saveSig () {
        if (!signaturePad._data.length || this.isBusy) {
          return
        }
        this.isBusy = true

        const {juan, sig} = this.$refs

        const data = new FormData()
        data.append('thumb', signaturePad.toDataURL())
        this.$axios.post('/qmadmin/index.php/index/index/index', data).then(
          data => {
            if (data.data.success) {
              new TimelineLite({
                onComplete: () => {
                  this.isBusy = false
                  this.$store.commit('setState', {pageIndex: 1})
                }
              })
                .set(sig, {rotation: 0})
                .to(juan, 2, {width: 0})
                .to(sig, 2, {scale: 0.2, autoAlpha: 0, y: '70%', x: '34%', rotation: 360})
            }
          }
        )

      }
    }
  }
</script>

<style scoped lang="scss">
  .mainBox {
    text-align: center;
    position: absolute;
    overflow: hidden;
    top: 50%;
    transform: translateY(-50%);
    &.center {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }
    .title {
      width: 15vw;
      margin-top: 2vw;
    }
  }

  .sig-container {
    font-size: 0;
    position: absolute;
    left: 0;
    right: 0;
    top: 2.5vw;
  }

  .juan-wrapper {
    overflow: hidden;
    position: relative;
    display: inline-block;
  }

  .juan {
    width: 66vw;
    border: 0 none;
  }

  .zhou {
    width: 6.4vw;
    z-index: 5;
    top: 3vw;

    &.left {
      position: relative;
      margin-right: -4vw;
    }
    &.right {
      margin-left: -5vw;
      transform: rotateZ(180deg);
      position: absolute;
    }
  }

  .bc {
    ul {
      left: 4.5vw;
    }
  }

  canvas {
    top: 7.1vw;
    left: 2.75vw;
    width: 54.5833333vw;
    height: 19.5845vw;
    position: absolute;
    /*background: #fff;*/
  }

  .menu {
    margin-top: 35vw;
    padding: 0 10vw;
    > ul > li {
      width: 18.8vw;
      line-height: 8vw;
      float: left;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center center;
      cursor: pointer;

      > img {
        width: 25%;
        position: relative;
        z-index: 2;
      }
    }
    .menuPer {
      position: relative;
      background-image: url("../assets/bjbg.png");
      &.active {
        background-image: url("../assets/bjbg2.png");
      }
      > img {
        transform: translate(-2%, 30%);
      }
      > ul {
        position: absolute;
        top: -5.5vw;
      }
      .subMenu {
        width: 4vw;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center center;
        background-image: url("../assets/qkbg.png");
        float: left;
        margin: 0 0.3vw;
        &.active {
          background-image: url("../assets/qkbg2.png");
        }
        img {
          width: 53%;
          cursor: pointer;
          transform: translate(0%, 36%)
        }
        img:first-child {
          display: inline-block;
        }
        img:last-child {
          display: none;
        }
        &.active {
          img:first-child {
            display: none;
          }
          img:last-child {
            display: inline-block;
          }
        }
      }
      &.edit {
        .subMenu img {
          width: 65%;
        }
      }
    }
    .collect {
      height: 8.5vw;
      line-height: 8.5vw;
      background-repeat: no-repeat;
      background-position: 80% center;
      background-image: url("../assets/scbg.png");
      width: 15vw;
      margin-left: 5vw;
      background-size: 56%;

      img {
        width: 22%;
        cursor: pointer;
        transform: translate(50%, 40%);
      }
    }
    .goBack {
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center center;
      background-image: url("../assets/qkbg.png");
      width: 5vw;
      position: absolute;
      right: 3vw;
      img {
        width: 45%;
        cursor: pointer;
        transform: translate(0%, 40%);
      }
    }
  }
</style>
