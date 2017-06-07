export default {  // 公共方法
  computed: {
    getUser () {
      return this.$store.getters.getUser
    }
  },
  methods: {
    startLoading () {
      this.$store.dispatch('commConf', {loading: true})
    },
    stopLoading () {
      this.$store.dispatch('commConf', {loading: false})
    },
    errShow (err) {
      let {$store} = this
      $store.dispatch('commConf', {err: true, errMes: err})
      setTimeout(function () {
        $store.dispatch('commConf', {err: false, errMes: ''})
      }, 2000)
    },
    // 打开侧滑
    showAside () {
      this.$store.dispatch('showAside')
    },
    // 关闭侧滑
    hideAside () {
      this.$store.dispatch('hideAside')
    }
  }
}
