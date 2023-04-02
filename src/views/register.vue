<template>
  <div class="login-page">
    <van-nav-bar title="面经注册" />
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="username"
        label="用户名"
        placeholder="用户名"
        :rules="[
          { required: true, message: '请填写用户名' },
          { pattern: /^\w{5,}$/, message: '长度必须5个字符以上' },
        ]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[
          { required: true, message: '请填写密码' },
          { pattern: /^\w{6,}$/, message: '长度必须6个字符以上' },
        ]"
      />
      <div style="margin: 16px">
        <van-button block type="primary" native-type="submit">注册</van-button>
      </div>
    </van-form>
    <router-link class="link" to="/login">有账号，去登录</router-link>
  </div>
</template>

<script>
// import { Toast } from 'vant'
// 注意下面如果想使用Toast，这里还要引入，虽然在main.js中导入vant-ui.js，通过Vue.use()已经注册为全局可用
// 但是那都是直接使用标签等的方式可以直接使用
// 这里是要在js中使用Toast，则必须要引入Toast，要不然一个js是一个模块，不导入到这里就无法使用

// 引入 Toast 组件后，会自动在 Vue 的 prototype 上挂载 $toast 方法，便于在组件内调用
// 在组件内部通过this.$toast可以使用，而不需要import { Toast } from 'vant'再导入Toast，但是一定要注意this是指向组件实例的
import { register } from '@/api/user'

export default {
  name: 'register-page',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async onSubmit (values) {
      // 发送注册的请求
      // try catch：尝试执行try代码块的逻辑，如果有错误，会被catch捕获，存入error中
      // try {
      //   await register(values)
      //   this.$toast.success('注册成功！')
      //   this.$router.push('/login')
      // } catch (error) {
      //   console.dir(error)
      //   this.$toast(error.response.data.message)
      // }
      // 每次都要自己写一遍错误提示很麻烦，直接在响应拦截器中加错误处理，在request.js中
      await register(values)
      this.$toast.success('注册成功！')
      this.$router.push('/login')
    }
  }
}

// Toast('普通提示')

// Toast.loading({
//   message: '拼命加载中...',
//   forbidClick: true,
//   duration: 0 // 永远不自动消失
// })

// setTimeout(() => {
//   console.log('3秒后, 请求回来了')
//   // Toast.clear()
//   Toast.success('恭喜注册成功')
// }, 3000)

// 必须在组件实例范围内，this指向某个组件实例，才能这么用
// this.$toast.fail('失败了')
</script>

<style lang="less" scoped>
.link {
  color: #069;
  font-size: 12px;
  padding-right: 20px;
  float: right;
}
</style>
