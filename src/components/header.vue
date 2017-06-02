<template>
  <!-- header部分 -->
  <div :title="header.title" class="flex-between" id="header">
    <div class="header-l" v-show="header.left">
      <!-- 菜单按钮 -->
      <i class="fa fa-bars" aria-hidden="true" v-show="header.menu" @click="showAside"></i>
      <!-- 返回按钮 -->
      <i class="fa fa-chevron-left"aria-hidden="true" v-show="header.back"  @click="history"></i>
    </div>
    <h2>{{ header.title }}</h2>
    <div class="header-r" v-show="header.right">
      <!-- 头部导航栏右侧 -->
      <i class="fa fa-plus-square theme" aria-hidden="true" v-show="header.plus" @click="submit"> 发帖</i>
      <i class="fa fa-power-off" aria-hidden="true" v-show="header.logout" @click="signout"> 退出</i>
    </div>
  </div><!-- header部分 end -->
</template>

<script>
  import comMixin from '../mixins/com-mixin'
  export default {
    mixins: [comMixin],
    name: 'header',
    props: {
      header: {
        type: Object
      }
    },
    methods: {
      history () {  // 返回按钮
        this.$router.go(-1)
      },
      submit () {  // 发帖
        let {hasToken, $router} = this
        if (hasToken) {  // 登录检测
          $router.push({name: 'submit'})
        } else {
          $router.push({name: 'login'})
        }
      },
      signout () {  // 登出
        this.$store.dispatch('singOut')
        this.$router.push({name: 'Index', query: {tab: 'all'}})
      }
    }
  }
</script>
