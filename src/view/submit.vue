<template>
  <div class="" id="submit">
    <form @submit.prevent="submit">
      <div class="title">
        <input type="text" placeholder="标题...（10字以上）" v-model="form.title">
      </div>
      <div class="select">
        <select v-model="form.tab">
          <option value="">请选择板块</option>
          <option value="share">分享</option>
          <option value="ask">问答</option>
          <option value="job">招聘</option>
          <option value="dev">测试</option>
        </select>
      </div>
      <div>
        <textarea placeholder="内容...（支持markdown格式）" v-model="form.content"></textarea>
      </div>
      <div class="padding">
        <button class="btn">提交</button>
      </div>
    </form>
  </div>
</template>

<script>
  import api from '../api/'
  import utils from '../utils/utils'
  import comMixin from '../mixins/com-mixin'
  export default {
    mixins: [comMixin],
    name: 'submit',
    data () {
      return {
        form: {
          accesstoken: '', // token
          title: '', // 标题
          tab: '', // 发表的板块
          content: '' // 发表的内容
        }
      }
    },

    mounted () {
      this.$store.dispatch('commConf', {menu: false, back: true, title: '发布话题'})
      this.form.accesstoken = this.getUser.token
    },

    methods: {
      submit () {
        let {form, getUser, $router} = this
        if (!getUser.token) return $router.push({name: 'login'})  // 登录检测
        if (!form.title || !form.tab || !form.content) {
          return utils.layerMsg('主题不能存在空字段')
        } else if (form.title.length < 10) {
          return utils.layerMsg('标题不能少于10个字')
        } else {
          api.creatTopic(form)
            .then(({data}) => {
              if (data && data.success) {
                $router.push({name: 'topic', params: {id: data.topic_id}})
              }
            })
            .catch((err) => {
              utils.layerMsg('发布失败：' + err)
            })
        }
      }
    }
  }
</script>
