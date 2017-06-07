<template>
  <div class="user-info" id="message">
    <div v-if="msgs">

      <!-- user-content -->
      <div class="user-info-content">
        <!-- 用户发布及回复 -->
        <ul class="tab-btn flex-center-h">
          <li :class="{selected: tabIndex === 0}" @click="tabIndex = 0">已读</li>
          <li :class="{selected: tabIndex === 1}" @click="tabIndex = 1">未读</li>
        </ul>
        <ul class="user-topics">
          <!-- 已读消息 -->
          <msg-list v-if="msgs.has_read_messages" v-show="tabIndex === 0" :msgs="msgs.has_read_messages"></msg-list>
          <!-- 未读消息 -->
          <msg-list v-if="msgs.hasnot_read_messages" v-show="tabIndex === 1" :msgs="msgs.hasnot_read_messages"></msg-list>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '../api/'
  import msgList from '../components/msg-list'
  import comMixin from '../mixins/com-mixin'
  export default {
    mixins: [comMixin],
    data () {
      return {
        tabIndex: 0,
        msgs: {}
      }
    },

    created () {
      this.getAllMessage()
    },

    mounted () {
      let {$store, $route} = this
      // if (!getUser) return $router.push({name: 'login'})  // 登录检测
      let name = $route.params.name
      let comm_conf = {menu: false, back: true, title: name + ' 的消息', plus: false, logout: false}
      $store.dispatch('commConf', comm_conf)
    },

    methods: {
      getAllMessage () {  // 获取用户基本数据
        this.startLoading()  // 显示加载
        let {getUser} = this
        let token = getUser.token
        api.getAllMessage(token)
          .then(({data}) => {
            if (data && data.success) {
              this.msgs = data.data
              this.stopLoading()  // 暂停loading
            }
          })
          .catch((err) => {
            this.errShow(err)
          })
      }
    },

    components: {
      msgList
    }
  }
</script>
