<template>
  <div class="layout-page">
    <router-view></router-view>
    <!-- 在vant文档中的tabbar下面有路由模式，标签栏支持路由模式，用于搭配vue-router使用 -->
    <!-- 路由模式下会匹配页面路径和标签的to属性，并自动选中对应的标签，类似于router-link，而且这里自带高亮 -->
    <!-- van-tabbar上配置route属性，开始tabbar的路由模式，van-tabbar-item上配置to属性，定义跳转的地址 -->
    <van-tabbar route>
      <van-tabbar-item to="/article" icon="fire-o">面经</van-tabbar-item>
      <van-tabbar-item to="/collect" icon="star-o">收藏</van-tabbar-item>
      <van-tabbar-item to="/like" icon="like-o">点赞</van-tabbar-item>
      <van-tabbar-item to="/user" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'layout-page'
}
</script>

<style lang="less" scoped></style>
