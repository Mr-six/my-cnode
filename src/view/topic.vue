<template>
  <div class="topic">
    <div class="topic-detail" v-if="topic.id">
      <!-- 主题头部 -->
      <div class="topic-head">
        <!-- 标题 -->
        <h3 :class="getTalInfo(topic.tab, topic.good, topic.top, true)"
            :title="getTalInfo(topic.tab, topic.good, topic.top, false)"
        >{{topic.title}}</h3>

        <!-- 作者详情 -->
        <div class="flex-center-h topices-content">
          <div class="author flex">
            <img :src="topic.author.avatar_url" alt="头像">
            <div>
              <p class="author-name">{{topic.author.loginname}}</p>
              <p class="grey font-little">{{topic.create_at | formatDate}}</p>
            </div>
          </div>
          <div class="">
            <p class="text-center"><span class="theme">{{topic.reply_count}}</span> /{{topic.visit_count}}</p>
            <button :class="[{on: topic.is_collect}, 'collect']" @click="collectTopic"><i class="fa fa-star-o"></i>{{topic.is_collect ? ' 取消收藏' : '收藏'}}</button>
          </div>
        </div>
      </div>
      <!-- 主题内容 -->
      <div class="topic-content markdown-body" v-html="topic.content">
      </div>
      <!-- 主题回复 -->
      <ul class="topic-replies">
        <li class="bor-both">
          <span class="theme">{{topic.replies.length}}</span> 回复
        </li>
        <com-list v-for="reply in topic.replies" :key="reply.id" :reply="reply" class="topic-reply" @close="closeComment" @updata="getTopic"></com-list>
        <!-- 回复框 -->
        <com-replies v-if="getUser.token" @updata="getTopic" class="reply-topic"></com-replies>
        <!-- 登录提示 -->
        <div v-if="!getUser.token" class="login-tip flex-center-all">
          <p>
            <router-link :to="{name: 'login'}" class="link">登录</router-link>
            后参与讨论
          </p>
        </div>
      </ul>
    </div>

  </div>
</template>

<script>
  import api from '../api/'
  import utils from '../utils/utils'
  import comList from '../components/com-list'
  import comReplies from '../components/com-replies'
  import comMixin from '../mixins/com-mixin'
  export default {
    mixins: [comMixin],
    name: 'topic',
    data () {
      return {
        topic: {},
        getConf: {
          id: '',
          mdrender: true,
          accesstoken: ''
        },
        collectable: true,
        interval: 500  // 点赞时间间隔
      }
    },

    mounted () {
      this.getConf.accesstoken = this.getUser.token || ''  // 添加token
      this.$store.dispatch('commConf', {menu: false, back: true, title: '主题'})   // 设置头部
      this.startLoading()  // 显示加载
      this.getTopic()  // 加载主题
    },

    computed: {
    },

    methods: {
      getTopic () {
        // 获取主题
        let {getConf, $route} = this
        getConf.id = $route.params.id
        api.getTopic(getConf)
          .then(({data}) => {
            if (data && data.success) {
              this.topic = data.data
              this.stopLoading()  // 暂停loading
            }
          })
          .catch((err) => {   // 错误处理
            this.errShow(err)
          })
      },

      getTalInfo (tab, good, top, isClass) {
        return utils.getTabInfo(tab, good, top, isClass)
      },

      collectTopic () {  // 主题收藏逻辑
        let {getUser, collectable, topic} = this
        let topic_id = topic.id
        if (!collectable) return
        let postData = {
          accesstoken: getUser.token,
          topic_id: topic_id
        }
        if (!getUser.token) return this.$router.push({name: 'login'})  // 登录检测
        collectable = false  // 控制收藏频率
        if (this.topic.is_collect) {  // 取消收藏
          api.deCollectTopic(postData)
            .then(({data}) => {
              if (data && data.success) {
                this.topic.is_collect = false
                utils.layerMsg('取消收藏成功')
              }
            })
            .catch((err) => {
              utils.layerMsg('取消收藏失败' + err)
            })
        } else {  // 收藏主题
          api.collectTopic(postData)
            .then(({data}) => {
              if (data && data.success) {
                this.topic.is_collect = true
                utils.layerMsg('收藏成功')
              }
            })
            .catch((err) => {
              utils.layerMsg('收藏失败' + err)
            })
        }
        setTimeout(function () {
          collectable = true
        }, this.interval)
      },

      closeComment () {  // 关闭评论中的回复框
        let {$set, topic} = this
        topic.replies.forEach((reply) => ($set(reply, 'show_reply', false)))
      }
    },

    components: {
      comList,
      comReplies
    }
  }
</script>
