export default {  // 公共方法
  computed: {
    hasToken () {
      return this.$store.getters.hasToken
    },
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
      this.$store.dispatch('commConf', {err: true, errMes: err})
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
