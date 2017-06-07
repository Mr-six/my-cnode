<template>
  <div class="user-info">
    <div v-if="user.loginname">
      <!-- 头像背景 -->
      <div class="avatar-bg">
        <img src="https://i.imgur.com/6m23eL4.jpg" alt="头像背景图">
        <div class="avatar flex-center-v">
          <img :src="user.avatar_url" alt="用户头像">
          <p>{{ user.loginname }}</p>
          <!-- 注册时间 -->
        </div>
      </div>
      <!-- user-content -->
      <div class="user-info-content">
        <!-- 用户注册时间 -->
        <div class="flex-center-h user-create">
          <p>注册时间：{{ user.create_at | formatDate }}</p>
          <p class="theme">积分：{{ user.score }}</p>
        </div>
        <!-- 用户发布及回复 -->
        <ul class="tab-btn flex-center-h">
          <li :class="{selected: tabIndex === 0}" @click="tabIndex = 0">文章</li>
          <li :class="{selected: tabIndex === 1}" @click="tabIndex = 1">回复</li>
        </ul>
        <ul class="user-topics">
          <!-- 用户发布的主题 -->
          <com-list
            v-show="tabIndex === 0"
            v-for="reply in user.recent_topics"
            :reply="reply"
          >
          </com-list>
          <!-- 用户回帖 -->
          <com-list
            v-show="tabIndex === 1"
            v-for="reply in user.recent_replies"
            :reply="reply"
          >
          </com-list>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '../api/'
  import comList from '../components/com-list'
  import comMixin from '../mixins/com-mixin'
  export default {
    mixins: [comMixin],
    data () {
      return {
        tabIndex: 0,
        user: {}
      }
    },

    created () {
    },

    mounted () {
      this.getUserData()
    },

    methods: {
      getUserData () {  // 获取用户基本数据
        this.startLoading()  // 显示加载
        let {getUser, $store, $route} = this
        let name = $route.params.name
        let comm_conf = {menu: false, back: true, title: '个人中心', plus: false, logout: false}
        if (getUser && getUser.loginname === name) {  // 判断是否为当前登录用户
          comm_conf = Object.assign(comm_conf, {logout: true})  // 显示退出
        }
        $store.dispatch('commConf', comm_conf)

        api.getUuser(name)
          .then(({data}) => {
            if (data && data.success) {
              this.user = data.data
              this.stopLoading()  // 暂停loading
            }
          })
          .catch((err) => {
            this.errShow(err)
          })
      }
    },

    watch: {  // 当前路由跳转
      $route: 'getUserData'
    },

    components: {
      comList
    }
  }
</script>
