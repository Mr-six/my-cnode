<template>
  <div class="topic">
    <div v-show="!topic" class="">
      <i class="fa fa-spinner fa-spin fa-fw margin-bottom"></i>
      加载中……
    </div>
    <div class="topic-detail" v-if="topic">
      <!-- 主题头部 -->
      <div class="topic-head">
        <!-- 标题 -->
        <h3 :class="getTalInfo(topic.tab, topic.good, topic.top, true)"
            :title="getTalInfo(topic.tab, topic.good, topic.top, false)"
        >{{topic.title}}</h3>

        <!-- 作者详情 -->
        <div class="flex-center-h topices-content">
          <div class="author flex-between">
            <img :src="topic.author.avatar_url" alt="头像">
            <div>
              <p class="author-name">{{topic.author.loginname}}</p>
              <p class="grey font-little">{{topic.create_at | formatDate}}</p>
            </div>
          </div>
          <div class="">
            <span class="theme">{{topic.reply_count}}</span>
            <span>/{{topic.visit_count}}</span>
            <button>收藏</button>
          </div>
        </div>

        <!-- 主题内容 -->
        <div class="topic-content">
          {{topic.content}}
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import api from '../api/'
  import utils from '../utils/utils'
  export default {
    name: 'topic',
    data () {
      return {
        topic: {},
        getConf: {
          id: '',
          mdrender: true,
          accesstoken: ''
        }
      }
    },

    mounted () {
      let {topic, getConf, $route} = this
      getConf.id = $route.params.id
      api.getTopic(getConf)
        .then(({data}) => {
          if (data && data.success) {
            topic = data
          }
        })
    },

    computed: {
    },

    methods: {
      getTalInfo (tab, good, top, isClass) {
        return utils.getTabInfo(tab, good, top, isClass)
      }
    },

    components: {
    }
  }
</script>
