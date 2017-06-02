<template>
  <div id="index">
    <!-- 主题列表项 -->
    <div v-show="topices.length" id="topices">
      <ul>
        <li v-for="topic in topices" :key="topic.id" class="topic-head">
          <router-link :to="{name: 'topic', params: {id: topic.id}}">
            <h3 :class="getTalInfo(topic.tab, topic.good, topic.top, true)"
                :title="getTalInfo(topic.tab, topic.good, topic.top, false)"
            >{{topic.title}}</h3>

            <div class="flex-center-h topices-content">
              <div class="author flex">
                <img :src="topic.author.avatar_url" alt="头像">
                <div>
                  <p class="author-name">{{topic.author.loginname}}</p>
                  <p class="grey font-little">{{topic.create_at | formatDate}}</p>
                </div>
              </div>
              <div class="">
                <span class="theme">{{topic.reply_count}}</span>
                <span>/{{topic.visit_count}}</span>
                <p>{{topic.last_reply_at | formatDate}}</p>
              </div>
            </div>
          </router-link>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
  // api
  import api from '../api/'
  import utils from '../utils/utils'
  import comMixin from '../mixins/com-mixin'
  export default {
    mixins: [comMixin],
    name: 'index',
    data () {
      return {
        scrollGet: true,
        topices: [],
        getConf: {    // 发送请求是的选项
          page: 1,
          tab: 'all',
          limit: 20,
          mdrender: true
        }
      }
    },

    mounted () {    // 加载完成后优先检测本地缓存数据
      this.startLoading()  // 显示加载
      let {getAlltopices, topices, getConf, $route} = this
      if ($route.query && $route.query.tab) {   //  是否为特定主题
        getConf.tab = $route.query.tab
      }
      const session = sessionStorage
      let tab = getConf.tab
      if (session.getItem(tab)) {   // 判断本地sessionStorage是否存在数据
        let _topices = JSON.parse(session.getItem(tab))
        _topices.forEach(function (el) {   // 遍历并填充
          topices.push(el)
        })
        this.stopLoading()  // 暂停loading
      } else {  // 从远程获取数据
        getAlltopices()
      }

      this.$store.dispatch('commConf', {menu: true, back: false, title: utils.getTabInfo(tab, false, false, false), plus: true, logout: false})  // 配置头部标题

      // 滚动加载
      window.addEventListener('scroll', this.getScrollData, false)
    },

    computed: {

    },

    methods: {
      getAlltopices () {  // 调用API 获取数据
        if (this.$route.name !== 'Index') return
        const session = sessionStorage
        let {topices, getConf} = this
        let tab = getConf.tab
        api.getTopics(getConf)
          .then(({data}) => {   // 获取主题数据
            if (data && data.success) {
              data.data.forEach(function (el) {   // 遍历并填充
                topices.push(el)
              })
              this.stopLoading()  // 暂停loading
              this.scrollGet = true
            }
            session.setItem(tab, JSON.stringify(topices))   // 写入sessionStorage
          })
          .catch((err) => {   // 错误处理
            this.errShow(err)
          })
      },

      getTalInfo (tab, good, top, isClass) {  // 获取主题所属类型
        return utils.getTabInfo(tab, good, top, isClass)
      },

      getScrollData () {  // 滚动加载数据
        if (this.scrollGet) {
          let totalHeight = document.body.scrollHeight   // 页面总高度
          let devHeight = document.documentElement.clientHeight  // 手机屏幕高度
          let pageScrollTop = document.documentElement.scrollTop  // 手机页面滚动距离
          if (totalHeight - devHeight - pageScrollTop <= 200) {  // 触发距离
            this.getConf.page++
            this.getAlltopices()
            this.scrollGet = false
          }
        }
      },

      beforeRouteEnter (to, from, next) {   // 路由进入前 是否清除数据
        const session = sessionStorage
        if (from.name !== 'topic') {
          // 页面切换移除之前记录的数据集
          if (session.tab) {
            session.removeItem('all')
            session.removeItem('good')
            session.removeItem('ask')
            session.removeItem('job')
            session.removeItem('share')
          }
        }
        next()
      }
    },

    watch: {
      // 切换页面
      '$route' (to, from) {
        // 如果是当前页面切换分类的情况
        let com_conf = {}
        if (to.query && to.query.tab) {
          let query = to.query.tab  // 是否为查询
          this.getConf.tab = to.query.tab
          this.topices = []
          com_conf = {title: utils.getTabInfo(query, false, false, false)}  // 获取标题
        } else {
          com_conf = Object.assign(com_conf, {menu: true, back: false})
        }
        this.getConf.page = 1
        this.getAlltopices()
        this.$store.dispatch('commConf', com_conf)  // 配置头部显示
      }
    },

    components: {

    }
  }
</script>

