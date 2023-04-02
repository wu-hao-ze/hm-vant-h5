<template>
  <div class="article-page">
    <!-- 导航部分 -->
    <nav class="my-nav van-hairline--bottom">
      <a :class="{ active: sorter === 'weight_desc' }" @click="changeSorter('weight_desc')" href="javascript:;">推荐</a>
      <a :class="{ active: sorter === null }" @click="changeSorter(null)" href="javascript:;">最新</a>
      <!--
        这里传null的原因是getArticles发请求时携带sorter参数，而对于axios的请求，如果参数传递的属性值是null或者undefined，此参数将被忽略，也就是说在article.js中的sorter:null，这样也就做到了不传sorter参数，因为不传才是获取最新
      -->
      <div class="logo"><img src="@/assets/logo.png" alt=""></div>
    </nav>
    <!--
        需求：分页加载，触底时再加载更多
        使用vant中的List组件通过 loading 和 finished 两个变量控制加载状态

        loading：是否在加载中
        true在加载中，此时不会重复触发加载
        false不在加载中，又可以加载更多数据了

        finished：是否加载已完成
        true数据已经加载完成，再次触发加载的话不通过
        false数据还没加载完成，再次触发加载还是可以的

        当组件滚动到底部时 或 进入页面时发现数据没有撑满页面，会触发 load 事件，并将 loading 设置成 true (节流)
        此时可以发起异步操作并更新数据，数据更新完毕后，将 loading 设置成 false 即可
        若数据已全部加载完毕，则直接将 finished 设置成 true 即可。
    -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <article-item v-for="item in list" :key="item.id" :item="item"></article-item>
    </van-list>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'

export default {
  name: 'article-page',
  data () {
    return {
      current: 1,
      sorter: 'weight_desc', // 推荐=>weight_desc  最新=>null
      list: [],
      loading: false, // 默认非加载状态
      finished: false // 默认数据未加载完
    }
  },
  methods: {
    // 触发时机(onLoad会被触发多次！):
    // 1.一进入页面，如果数据没有撑满整个屏幕，触发load事件
    // 2.当用户往下滑动，触底时，需要加载更多，触发load事件
    async onLoad () {
      console.log('需要加载更多了, 应该要发送请求了...')
      const res = await getArticles({
        current: this.current,
        sorter: this.sorter
      })
      // 需要累加数据
      this.list.push(...res.data.rows)
      console.log(this.list)

      // 注意：加载完成数据后，需要将loading状态改成false，表示加载已完成
      this.loading = false

      // 让当前页+1，下一次加载下一页的数据
      this.current++

      // 如果下一页的页码，已经大于最大页码数，说明数据已经加载完成了，需要将finished改成true
      if (this.current > res.data.pageTotal) {
        this.finished = true
      }
    },
    changeSorter (value) {
      this.sorter = value

      // 重置所有条件
      this.current = 1 // 排序条件变化，重新从第一页开始加载
      this.list = []
      this.finished = false // finished重置，重新有数据可以加载了

      // 手动加载更多
      // 手动调用了加载更多，也需要手动将loading改成true，表示正在加载中(避免重复触发)
      this.loading = true
      this.onLoad()
    }
  }
}
</script>

<style lang="less" scoped>
.article-page {
  margin-bottom: 50px;
  margin-top: 44px;
  .my-nav {
    height: 44px;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 999;
    background: #fff;
    display: flex;
    align-items: center;
    > a {
      color: #999;
      font-size: 14px;
      line-height: 44px;
      margin-left: 20px;
      position: relative;
      transition: all 0.3s;
      &::after {
        content: '';
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 0;
        width: 0;
        height: 2px;
        background: #222;
        transition: all 0.3s;
      }
      &.active {
        color: #222;
        &::after {
          width: 14px;
        }
      }
    }
    .logo {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      > img {
        width: 64px;
        height: 28px;
        display: block;
        margin-right: 10px;
      }
    }
  }
}
</style>
