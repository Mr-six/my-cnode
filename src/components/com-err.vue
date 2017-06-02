<template>
  <div v-show="err" class="course-loading">
    <i class="fa fa-times" aria-hidden="true"></i>
    加载数据出错，请检查网络连接……
    {{ errMes }}
  </div>
</template>
<script>
  export default {
    computed: {
      err () {
        return this.$store.state.comm.err
      },
      errMes () {
        return this.$store.state.comm.errMes
      }
    }
  }
</script>
