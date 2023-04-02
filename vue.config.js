const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 默认直接打包的项目代码，必须直接丢在 服务器根目录 运行
  // 所有资源(js css img)的访问都是基于根路径，以绝对路径访问的
  // 如果想要在 任意目录 都能直接运行，需要将 publicPath 配置成相对路径，重新打包
  publicPath: './',

  // 定制主题，修改样式变量
  css: {
    loaderOptions: {
      less: {
        // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
        lessOptions: {
          modifyVars: {
            // 直接覆盖变量，这样就把vant中所有的蓝色都改成了自己定义的颜色
            blue: '#FA6D1D'
            // 'text-color': '#111',
            // 'border-color': '#eee',
            // 或者可以通过less文件覆盖(文件路径为绝对路径)
            // hack: 'true; @import "your-less-file-path.less";'
          }
        }
      }
    }
  }
})
