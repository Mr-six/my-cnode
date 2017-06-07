<template>
  <div v-show="loading" class="loading text-center">
    <i class="fa fa-spinner fa-spin fa-fw margin-bottom"></i>
    加载中……
  </div>
</template>
<script>
export default {
  computed: {
    loading () {
      return this.$store.state.comm.loading
    }
  }
}
</script>
