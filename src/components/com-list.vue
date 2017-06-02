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
          <p>
            <i class="fa fa-commenting-o" aria-hidden="true"></i>
          </p>
        </div>
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
  import utils from '../utils/utils'
  export default {
    mixins: [comMixin],
    name: 'com-list',
    data () {
      return {
        token: '',
        user: {},
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
        let {upable, interval, hasToken, getUser} = this
        if (!upable) return
        if (!hasToken) return this.$router.push({name: 'login'})  // 登录检测
        upable = false
        api.upsReplies(hasToken, id)
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
      }
    }
  }
</script>
