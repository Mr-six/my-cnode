<template>
  <div>
    <li v-if="msgs.length" v-for='msg in msgs'>
      <div v-if="msg">
        <!-- 用户头像 -->
        <div class="author flex">
          <router-link :to="{name: 'user-info', params: {name: msg.author.loginname}}">
            <img :src="msg.author.avatar_url" alt="头像">
          </router-link>
          <div>
            <p class="author-name">{{msg.author.loginname}}</p>
            <p class="grey font-little" v-if="msg.reply.create_at">回复时间：{{msg.reply.create_at | formatDate}}</p>
          </div>
        </div>
        <!-- 回复详情 -->
        <div v-if="msg.topic">
          <div v-if="msg.type === 'at'">
            在话题
            <router-link :to="{name: 'topic', params: {id: msg.topic.id}}">{{ msg.topic.title }}</router-link> 中 @了你
          </div>
          <div v-if="msg.type == 'reply'">
            回复你了的主题
            <router-link :to="{name: 'topic', params: {id: msg.topic.id}}">{{ msg.topic.title }}</router-link>
          </div>
          <!-- 回复内容 -->
          <div class="markdown-body" v-html="msg.reply.content"></div>
        </div>
      </div>
    </li>

    <div v-if="!msgs.length">
      <p class="grey text-center">暂无内容</p>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      msgs: {
        type: Array
      }
    }
  }
</script>
