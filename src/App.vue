<template>
  <div id="app">
    <!-- 只需要留一个默认的路由出口 -->
    <!-- 这种标签里面没东西的话，也可以写成一个标签<router-view />，但是尽量不要这么使用 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less"></style>
