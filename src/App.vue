<template>
  <div id="app">
    <!-- 封面页 -->
    <cover v-show="coverShow"></cover>
    <!-- 侧滑 -->
    <aside-left ref="asideLeft">
      <!-- 公共头部 -->
      <my-header :header='header'></my-header>
      <!-- loading -->
      <com-loading></com-loading>
      <!-- err -->
      <com-err></com-err>
      <!-- gotop -->
      <go-top></go-top>
      <!-- 路由 -->
      <transition :name="transitionName">
        <router-view></router-view>
      </transition>
    </aside-left>
  </div>
</template>

<script>
  import cover from './view/cover'   // 封面
  import myHeader from './components/header'  // 公共头部组件
  import asideLeft from './view/aside-left'  // 页面侧滑组件
  import goTop from './components/com-gotop'  // 返回顶部
  import utils from './utils/utils'  // 工具
  import comMixin from './mixins/com-mixin'
  export default {
    mixins: [comMixin],
    name: 'main',
    data () {
      return {
        transitionName: 'slide-left',
        coverShow: true
      }
    },

    computed: {
      header () {
        return this.$store.state.comm
      }
    },

    created: function () {
      if (this.$route.name === undefined) {
        this.$router.push('index')
      }
    },

    mounted () {
      this.appShow()
    },

    methods: {
      appShow () {
        const { PAGE_START_TIME } = window
        const END_TIME = new Date().getTime() // 结束时间
        const diffTime = END_TIME - PAGE_START_TIME
        const timer = setTimeout(() => {
          clearTimeout(timer)
          this.coverShow = false
        }, diffTime > 2000 ? 0 : 2000 - diffTime)
      }
    },

    components: {
      myHeader,
      asideLeft,
      goTop,
      cover
    },

    watch: {
      '$route' (to, from) {  // 路由切换
        let com_conf = {}  // 首页配置项
        // 路由切换效果判断
        const toDepth = to.path.split('/').length
        const fromDepth = from.path.split('/').length
        if (to.name === 'Index') {
          this.transitionName = 'slide-right'
        } else {
          this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
        }

        switch (to.name) {
          case 'Index':  // 是否为首页 对项目进行分类
            let query = to.query.tab  // 是否为查询
            if (query) {
              com_conf = {title: utils.getTabInfo(query, false, false, false)}
            } else {
              com_conf = {title: '全部'}
            }
            com_conf = Object.assign(com_conf, {menu: true, back: false})
            break
        }
        this.$store.dispatch('commConf', com_conf)
        // 关闭侧滑
        this.hideAside()
      }
    }
  }

</script>
