<!-- 带侧滑组件的块组件 -->
<template>
  <div class="addition-aside">
    <!-- 侧滑菜单容器 -->
    <aside class="aside-left" ref="aside" @touchmove.stop>
      <!-- 头像 -->
      <div class="avatar flex-item">
        <router-link :to="{name: 'login'}" v-if="!hasToken">
          <img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1099558373,3080843421&fm=116&gp=0.jpg" alt="头像">
          <p>请登录</p>
        </router-link>
        <router-link :to="{name: 'user-info', params: {name: getUser.loginname}}" v-if="hasToken">
          <img :src="getUser.avatar_url" alt="头像">
          <p>{{getUser.loginname}}</p>
        </router-link>

        <div class="collect-msg">
          <router-link :to="{name: 'collectTopic', params: {name: getUser.loginname}}">
            <i class="fa fa-star-o"></i>收藏
          </router-link>
          <router-link :to="{name: 'collectTopic', params: {name: getUser.loginname}}">
            <i class="fa fa-bell-o" aria-hidden="true"></i>消息
          </router-link>
        </div>

      </div>

      <!-- 选项菜单 -->
      <ul class="aside-menu">
        <li>
          <router-link :to="{name: 'Index', query: {tab: 'all'}}">
            <i class="fa fa-home" aria-hidden="true"></i>
            全部
          </router-link>
        </li>

        <li>
          <router-link :to="{name: 'Index', query: {tab: 'good'}}">
            <i class="fa fa-thumbs-up" aria-hidden="true"></i>
            精华
          </router-link>
        </li>

        <li>

        </i>
          <router-link :to="{name: 'Index', query: {tab: 'share'}}">
            <i class="fa fa-share-alt" aria-hidden="true"></i>
            分享
          </router-link>
        </li>

        <li>
          <router-link :to="{name: 'Index', query: {tab: 'ask'}}">
            <i class="fa fa-comments" aria-hidden="true"></i>
            问答
          </router-link>
        </li>

        <li>
          <router-link :to="{name: 'Index', query: {tab: 'job'}}">
            <i class="fa fa-users" aria-hidden="true"></i>
            招聘
          </router-link>
        </li>

        <li>
          <router-link :to="{name: 'Index', query: {tab: 'dev'}}">
            <i class="fa fa-wrench" aria-hidden="true"></i>
            测试
          </router-link>
        </li>
        <div class="divider"></div>
        <!-- 关于 -->
        <li>
          <router-link :to="{name: 'about'}">
            <i class="fa fa-info-circle" aria-hidden="true"></i>
            关于
          </router-link>
        </li>
      </ul>

      <div class="auth">
        <!-- mrsix -->
      </div>
    </aside>

    <!-- 区块插槽 -->
    <slot></slot>

    <!-- 遮罩层 -->
    <div class="mask" v-show="mask" @touchstart.prevent @touchend="hideAside" :class="{active: isShow}"></div>
  </div>

</template>

<script>
  // 灵感来自于mui的侧滑，实现参考mint ui 的轮播图
  import { once } from '../utils/dom'
  import comMixin from '../mixins/com-mixin'
  export default {
    mixins: [comMixin],
    name: 'aside-left',
    data () {
      return {
        animating: false,
        dragging: false,
        dragState: {},
        elWidth: null,
        aside: null,
        isShow: false,  // 是否展示
        mask: false // 遮罩层
      }
    },
    props: {
      prevent: {
        type: Boolean,
        default: false
      },
      speed: {
        type: Number,
        default: 300
      }
    },

    created () {
      // this.$on('toggleAside', function () {
      //   this.showAside()
      // })
    },

    computed: {   // 返回vuex 中的参数
      show_aside () {
        return this.$store.getters.showAside
      },
      hide_aside () {
        return this.$store.getters.hideAside
      }
    },

    watch: {
      'show_aside' (to, from) {   // 监听vuex 中的参数变化 展开或者开启左侧菜单
        this.showAside()
      },
      'hide_aside' (to, from) {
        this.hideAside()
      }
    },

    methods: {
      translate (offset, towards, speed) {  // 主要动画函数
        var el = this.aside
        if (!speed) { // 当速度为空时，只执行移动 即 点击了按钮展示
          el.style.webkitTransition = '-webkit-transform ' + speed + 'ms cubic-bezier(0.165, 0.84, 0.44, 1)'
          el.style.webkitTransform = `translate3d(${offset}px, 0, 0)`
        } else {
          this.animating = true
          var dir = towards === 'right' ? this.elWidth : 0  // 位移终点距离
          this.mask = dir !== 0 // 是否显示遮罩层

          el.style.webkitTransition = '-webkit-transform ' + speed + 'ms cubic-bezier(0.165, 0.84, 0.44, 1)'
          setTimeout(() => {
            el.style.webkitTransform = `translate3d(${dir}px, 0, 0)`
          }, 50)

          var called = false
          var transitionEndCallback = () => {   // 位移结束
            if (called) return
            this.animating = false
            called = true
            el.style.webkitTransition = ''
            this.isShow = towards === 'right'
          }
          once(el, 'webkitTransitionEnd', transitionEndCallback)  // 位移结束触发条件
          setTimeout(transitionEndCallback, speed + 100) // webkitTransitionEnd maybe not fire on lower version android.
        }
      },

      doOntouchStart (event) {  // 记录点击起始数据
        if (this.animating) return

        var dragState = this.dragState
        var touch = event.touches[0]

        dragState.startTime = new Date()
        dragState.startLeft = touch.clientX
        dragState.startTop = touch.clientY
      },

      doOntouchMove (event) {   // 记录滑动数据
        var dragState = this.dragState
        var touch = event.touches[0]

        var currentLeft = touch.clientX   // 当前横坐标
        var currentTop = touch.clientY    // 当前纵坐标

        var offsetLeft = currentLeft - dragState.startLeft  // 滑动X位移量
        var offsetTop = currentTop - dragState.startTop     // 滑动Y位移量

        var distenceX = Math.abs(offsetLeft)  // 计算 横向位移
        var distenceY = Math.abs(offsetTop)   // 计算 纵向位移
        var maxOffset = this.elWidth  // equal as aside-left

        if (touch.clientX < 100 || distenceX < 5 || distenceX >= 5 && distenceX <= 1.73 * distenceY) {    // 判断满足条件 1.大于边缘100像素 2.水平位移量(5px)和滑动角度(30°)满足条件
          return
        }

        dragState.currentLeft = currentLeft   // 保存X坐标
        dragState.currentTop = currentTop     // 保存Y坐标

        var offset = Math.min(Math.max(-maxOffset + 1, offsetLeft), maxOffset)
        if ((offset > 0 && this.isShow) || (offset < 0 && !this.isShow)) return
        // 执行拖动
        var translateDis = offset > 0 ? offset : maxOffset + offset
        this.translate(translateDis)
      },

      doOntouchEnd () {
        var dragState = this.dragState
        var dragDuration = new Date() - dragState.startTime   // 点击时间间隔
        var maxOffset = this.elWidth   // 最大位移宽度
        var towards = null  // 方向
        var offsetLeft = dragState.currentLeft - dragState.startLeft
        var distenceX = Math.abs(offsetLeft)
        var speed = this.speed

        if (dragDuration < 300 && dragState.currentLeft === undefined) { // tap
          this.dragState = {}
          return
        }
        if (dragDuration < 300 || distenceX > maxOffset / 2) {  // 快速侧滑
          towards = offsetLeft < 0 ? 'left' : 'right'
        }
        if (dragDuration > 300 && distenceX < maxOffset / 2) {  // 平常手速侧滑
          towards = offsetLeft > 0 ? 'left' : 'right'
        }
        // 执行动画
        this.translate(offsetLeft, towards, speed)
        this.dragState = {}
      },

      showAside () {  // 开启侧边栏
        if (!this.isShow) this.translate(null, 'right', this.speed)
      },
      hideAside () {  // 收起侧边栏
        if (this.isShow) this.translate(null, 'left', this.speed)
      },
      asideToggle () {  // 切换侧边栏
        if (this.isShow) {
          this.translate(null, 'left', this.speed)
        } else {
          this.translate(null, 'right', this.speed)
        }
      }
    },

    mounted () {
      var el = this.$el
      this.aside = this.$refs.aside
      this.elWidth = this.$el.offsetWidth * 0.5  // equal as aside-left
      // 监听touchstart
      el.addEventListener('touchstart', (event) => {
        if (this.prevent) {
          event.preventDefault()
        }
        if (this.animating) return
        this.dragging = true
        this.doOntouchStart(event)
      })
      // 监听touchmove
      el.addEventListener('touchmove', (event) => {
        if (!this.dragging) return
        this.doOntouchMove(event)
      })
      // 监听touchend
      el.addEventListener('touchend', (event) => {
        if (!this.dragging) return
        this.doOntouchEnd()
        this.dragging = false
      })
    }
  }
</script>

<style>

</style>
