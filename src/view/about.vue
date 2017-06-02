<template>
  <div id="about">
    <dl class="about-info">
      <dt>关于项目</dt>
      <dd>该项目是基于Cnodejs的api，采用vue.js重写的webapp。</dd>
      <dt>源码地址</dt>
      <dd>
        <a href="https://github.com/shinygang/Vue-cnodejs">
          https://github.com/shinygang/Vue-cnodejs
        </a>
      </dd>
      <dt>意见反馈</dt>
      <dd>
        <a href="https://github.com/shinygang/Vue-cnodejs/issues">
          发表意见或者提需求
        </a>
      </dd>
      <dt>当前版本</dt>
      <dd>V0.1</dd>
    </dl>
  </div>
</template>
<script>
  export default {
    name: 'about',
    mounted () {
      this.$store.dispatch('commConf', {menu: false, back: true, title: '关于'})
    }
  }
</script>
