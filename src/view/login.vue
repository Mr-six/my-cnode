<template>
  <div id="login" class="flex-center-all">
    <form class="form" @submit.prevent="login">
      <div class="">
        <input type="text" placeholder="Access Token" v-model="token" maxlength="36">
      </div>
      <div class="text-center">
        <button class="btn">{{ loading ? '正在登录中……' : '登录' }}</button>
      </div>
    </form>
  </div>
</template>

<script>
  import api from '../api'
  import {layerMsg} from '../utils/utils'
  export default {
    name: 'login',

    data () {
      return {
        token: '',
        loading: false
      }
    },

    mounted () {
      this.$store.dispatch('commConf', {menu: false, back: true, title: '登录', plus: false, logout: false})
    },

    methods: {
      login () {
        if (this.loading) return
        if (!this.token) return layerMsg('请输入Access Token')
        this.loading = true
        api.accessToken(this.token)
          .then(({data}) => {  // 获取用户信息
            if (data && data.success) {
              data.token = this.token  // 添加入token
              this.$store.dispatch('singIn', data)
              layerMsg('登录成功')
              this.$router.go(-1)  // 返回上一页
            } else {
              layerMsg('登录出错')
            }
          })
          .catch((err) => {
            layerMsg('登录出错' + err)
          })
      }
    }
  }
</script>
