<template>
  <div id="gotop">
    <transition name="fade">
      <i class="fa fa-angle-double-up fa-1" aria-hidden="true" v-show="showGoTop" @click="goTop"></i>
    </transition>
  </div>
</template>
<script>
  export default {
    name: 'goTop',
    data () {
      return {
        showGoTop: false,
        distance: 300,  // 显示距离
        interval: 5,  // 滚动时间间隔
        speeds: 10  // 速度系数
      }
    },

    mounted () {
      window.addEventListener('scroll', this.checkShow, false)
    },

    computed: {
    },

    methods: {
      goTop () {
        let {speeds, interval} = this
        function getTop () {  // 获取页面滚动距离
          return document.documentElement.scrollTop || document.body.scrollTop  // 手机页面滚动距离
        }
        function doGoTop () {
          let timer
          if (getTop() <= 0) {
            clearTimeout(timer)
            return
          } else {
            let speed = Math.ceil(getTop() / speeds)
            timer = setTimeout(function () {
              document.documentElement.scrollTop ? (document.documentElement.scrollTop -= speed) : (document.body.scrollTop -= speed)
              doGoTop()
            }, interval)
          }
        }
        doGoTop()
      },

      checkShow () {  // 是否显示
        let pageScrollTop = document.documentElement.scrollTop || document.body.scrollTop  // 手机页面滚动距离
        if (pageScrollTop > this.distance) {
          this.showGoTop = true
        } else {
          this.showGoTop = false
        }
      }
    }
  }
</script>
