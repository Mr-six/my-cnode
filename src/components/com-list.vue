<template>
  <li>
    <div v-if="reply">
      <div class="author flex">
        <router-link :to="{name: 'user-info', params: {name: reply.author.loginname}}">
          <img :src="reply.author.avatar_url" alt="头像">
        </router-link>
        <div>
          <p class="author-name">{{reply.author.loginname}}</p>
          <p class="grey font-little" v-if="reply.create_at">{{reply.create_at | formatDate}}</p>
          <p class="grey font-little" v-if="reply.last_reply_at">最近回复：{{reply.last_reply_at | formatDate}}</p>
        </div>
      </div>
      <!-- 是否显示详细评论 -->
      <div v-if="reply.content">
        <!-- 回复内容 -->
        <div class="reply-content" v-html="reply.content">
        </div>
        <!-- 评论点赞及评论 -->
        <div class="reply-ups grey flex-center-h">
          <!-- 点赞 -->
          <p :class="{up: reply.is_uped}" @click="upsReplies">
            <i aria-hidden="true" class="fa fa-thumbs-up"></i>
            {{ reply.ups.length }}
          </p>
          <!-- 回复 -->
          <p @click="showReply">
            <i class="fa fa-commenting-o" aria-hidden="true"></i>
          </p>
        </div>
        <!-- 回复框 -->
        <com-replies v-if="reply.show_reply" :reply_id="reply.id" :loginname="reply.author.loginname" @updata="updata"></com-replies>
      </div>
      <!-- 是否显示帖子标题 -->
      <h3 v-if="reply.title">
        {{ reply.title }}
      </h3>
    </div>
    <div v-if="!reply">
      <p class="grey">暂无内容</p>
    </div>
  </li>
</template>
<script>
  import api from '../api'
  import comMixin from '../mixins/com-mixin'
  import comReplies from '../components/com-replies'
  import utils from '../utils/utils'
  export default {
    mixins: [comMixin],
    name: 'com-list',
    data () {
      return {
        show_reply: false,
        upable: true,
        interval: 500  // 点赞时间间隔
      }
    },
    props: {
      reply: {
        type: Object
      }
    },
    mounted () {
    },

    methods: {
      upsReplies () {  // 评论点赞
        let {ups, id} = this.reply
        let {upable, interval, getUser} = this
        if (!upable) return
        if (!getUser.token) return this.$router.push({name: 'login'})  // 登录检测
        upable = false
        api.upsReplies(getUser.token, id)
          .then(({data}) => {
            if (data && data.success) {
              switch (data.action) {
                case 'down':  // 取消点赞
                  this.reply.is_uped = false
                  ups.pop()
                  utils.layerMsg('取消点赞')
                  break
                case 'up':  // 点赞
                  this.reply.is_uped = true
                  ups.push(getUser.id)
                  utils.layerMsg('点赞成功')
                  break
                default:
                  utils.layerMsg('返回参数有误')
              }
            }
          })
          .catch((err) => {
            utils.layerMsg('点赞失败' + err)
          })
        setTimeout(function () {  // 点赞频率
          upable = true
        }, interval)
      },
      showReply () {
        let {getUser} = this
        if (!getUser.token) return this.$router.push({name: 'login'})  // 登录检测
        let show_reply = this.reply.show_reply
        this.$emit('close')  // 触发关闭其他回复框
        this.reply.show_reply = !show_reply
      },
      updata () {  // 更新数据
        this.$emit('updata')
      }
    },
    components: {
      comReplies
    }
  }
</script>
