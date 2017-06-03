<template>
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
</template>

<script>
  import utils from '../utils/utils'
  export default {
    name: 'topicList',
    props: {
      topices: {
        type: Array,
        required: true
      }
    },
    methods: {
      getTalInfo (tab, good, top, isClass) {  // 获取主题所属类型
        return utils.getTabInfo(tab, good, top, isClass)
      }
    }
  }
</script>
