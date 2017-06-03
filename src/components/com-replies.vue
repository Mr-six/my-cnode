<template>
  <div class="replies">
    <form @submit.prevent="submit">
      <div class="border">
        <textarea :placeholder="loginname ? '回复：' + loginname : '发表你的看法...(支持markdown格式)'" v-model="form.content"></textarea>
      </div>
      <div class="text-right">
        <button class="btn">{{btn}}</button>
      </div>
    </form>
  </div>
</template>

<script>
  import api from '../api/'
  import comMixin from '../mixins/com-mixin'
  import utils from '../utils/utils'
  export default {
    mixins: [comMixin],
    name: 'com-replies',
    data () {
      return {
        btn: '回复',
        form: {
          accesstoken: '',  // token
          content: '',  // 回复内容
          topic_id: '',  // 回复所在主题id
          reply_id: ''  // 回复用户id
        }
      }
    },
    props: {
      reply_id: {  // 要评论的评论id，如果没有则是对主题的评论
        type: String,
        default: ''
      },
      loginname: {  // 回复某人
        type: String,
        default: ''
      }
    },

    mounted () {
      this.form.accesstoken = this.hasToken  // token
      this.form.topic_id = this.$route.params.id
      this.form.reply_id = this.reply_id
    },
    methods: {
      submit () {
        let {reply_id, form, loginname} = this
        if (form.content === '') {
          return utils.layerMsg('回复不能为空')
        }
        this.btn = '回复中...'
        if (reply_id) {  // 回复某人
          form.content = `[@${loginname}](/user/${loginname}) ${form.content}`
        }
        form.content += `
        From [mrsix vue-cnode](https://github.com/Mr-six/my-cnode)`
        api.createReplies(form)
          .then(({data}) => {
            if (data && data.success) {
              this.btn = '回复'
              form.content = ''
              this.$emit('updata')
              utils.layerMsg('回复成功')
            }
          })
          .catch((err) => {
            this.btn = '回复失败'
            utils.layerMsg('回复出错：' + err)
          })
      }
    }
  }
</script>
