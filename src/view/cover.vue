<template>
  <div>
    <img id="index_cover" class="index" src="https://gss0.baidu.com/-4o3dSag_xI4khGko9WTAnF6hhy/zhidao/wh%3D600%2C800/sign=ce0c6c810bd162d985bb6a1a21ef85d4/d50735fae6cd7b89525518c60e2442a7d9330ebd.jpg">
  </div>
</template>

<script>
export default {
  name: 'cover',
  mounted () {
    setTimeout(() => {
      this.$router.push({
        name: 'Index',
        query: {
          tab: 'all'
        }
      })
    }, 2000)
  }
}
</script>

<style>
  #index_cover{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
