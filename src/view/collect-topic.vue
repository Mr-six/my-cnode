<template>
  <div id="collect">
    <topic-list :topices="topices"></topic-list>
  </div>
</template>

<script>
  import api from '../api/'
  // import utils from '../utils/utils'
  import topicList from '../components/topic-list'
  import comMixin from '../mixins/com-mixin'

  export default {
    mixins: [comMixin],
    name: 'collectTopic',
    data () {
      return {
        topices: [],
        tab: '收藏'
      }
    },

    mounted () {    // 加载完成后优先检测本地缓存数据
      this.startLoading()  // 显示加载
      let {getCollectTopic, topices, tab, $store} = this
      $store.dispatch('commConf', {menu: false, back: true, title: tab})  // 配置头部标题

      const session = sessionStorage
      if (session.getItem(tab)) {   // 判断本地sessionStorage是否存在数据
        let _topices = JSON.parse(session.getItem(tab))
        _topices.forEach(function (el) {   // 遍历并填充
          topices.push(el)
        })
        this.stopLoading()  // 暂停loading
      } else {  // 从远程获取数据
        getCollectTopic()
      }
    },

    methods: {
      getCollectTopic () {  // 调用API 获取数据
        const session = sessionStorage
        let {topices, tab, getUser} = this
        api.getCollectTopic(getUser.loginname)
          .then(({data}) => {   // 获取主题数据
            if (data && data.success) {
              data.data.forEach(function (el) {   // 遍历并填充
                topices.push(el)
              })
              this.stopLoading()  // 暂停loading
            }
            session.setItem(tab, JSON.stringify(topices))   // 写入sessionStorage
          })
          .catch((err) => {   // 错误处理
            this.errShow(err)
          })
      }
    },
    components: {
      topicList
    }

  }
</script>
