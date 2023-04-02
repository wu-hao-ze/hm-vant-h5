import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/utils/vant-ui'

// 全局注册的组件，可以在任意的实例范围内使用，一次注册全局使用
import ArticleItem from '@/components/article-item'
Vue.component('ArticleItem', ArticleItem)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
