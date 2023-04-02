// 首先第一点，一定要以本项目为根目录打开，否则就是报错
// 本项目要启用工作区的eslint，然后在设置中右上角打开settings.json，在其中加入如下
// 当保存的时候，eslint自动帮我们修复错误
// "editor.codeActionsOnSave": {
//   "source.fixAll": true
// },
// 并且要把保存时自动格式化取消，可以在设置中搜索保存，然后取消，也可以在settings.json中更改
// "editor.formatOnSave": true    把true改成false

// api目录是存放接口模块(发送ajax请求接口的模块，专门封装请求函数，一般只和接口文档相关)
// utils目录是存储一些工具模块(自己封装的方法)
// assets目录是新增项目使用的素材

// 框架是一整套完整的解决方案，而库相当于是工具箱
// 组件库：第三方封装好了很多很多的组件，整合到一起就是一个组件库
// PC端：element-ui  ant-design
// 移动：vant-ui

// 去vant官网上按照步骤来，首先安装npm i vant@latest-v2 -S
// 然后引入，分为全部导入和按需导入
// 下面是全部导入的做法：
// Vant支持一次性导入所有组件，引入所有组件会增加代码包体积，因此不推荐这种做法
// 可以在main.js中加入以下代码
// import Vue from 'vue';
// import Vant from 'vant';
// import 'vant/lib/index.css';
// Vue.use(Vant);
// 注意: 配置按需引入后，将不允许直接导入所有组件。

// 下面是按需导入的做法：
// babel-plugin-import 是一款 babel 插件，它会在编译过程中将 import 的写法自动转换为按需引入的方式
// npm i babel-plugin-import -D
// 然后对于使用 babel7 的用户，可以在 babel.config.js 中配置
// module.exports = {
//   plugins: [
//     ['import', {
//       libraryName: 'vant',
//       libraryDirectory: 'es',
//       style: true
//     }, 'vant']
//   ]
// };
// 接着你可以在代码中直接引入 Vant 组件
// 插件会自动将代码转化为手动按需引入形式
// import { Button } from 'vant';就会转换为import Button from 'vant/lib/button';
// 然后Vue.use(Button)，之后就可以使用了！！！！

// 可以看到vant文档进阶用法中可以解决浏览器适配问题
// Vant默认使用px作为样式单位，如果需要使用viewport单位(vw，vh，vmin，vmax)推荐使用postcss-px-to-viewport进行转换
// postcss-px-to-viewport是一款PostCSS插件，用于将px单位转化为vw/vh单位
// yarn add postcss-px-to-viewport@1.1.1 -D 进行安装
// 之后项目根目录，新建postcss的配置文件`postcss.config.js`进行配置
// module.exports = {
//   plugins: {
//     'postcss-px-to-viewport': {
//       viewportWidth: 375,
//     },
//   },
// };
// 之后在页面中写px就会被webpack自动转成vw

// request模块 - axios封装
// 接口文档地址：http://interview-api-t.itheima.net/swagger-ui/index.html#/
// 我们会使用axios来请求后端接口，一般都会对 axios 进行一些配置 (比如: 配置基础地址，请求拦截器，响应拦截器等)
// 一般项目开发中，都会对 axios 进行基本的二次封装，单独封装到一个模块中，便于使用
// 先yarn add axios，然后新建 `utils/request.js` 封装 axios 模块
// 官网：http://www.axios-js.com/zh-cn/docs/#axios-create-config

// Vant 使用了 Less 对样式进行预处理，并内置了一些样式变量，通过替换样式变量即可定制你自己需要的主题
// 定制方法：
// 1.按需引入样式源文件，在 babel.config.js 中配置按需引入样式源文件
// 2.修改样式变量，使用 Less 提供的 modifyVars 即可对变量进行修改，如果 vue-cli 搭建的项目，可以在 vue.config.js 中进行配置

// 路由懒加载 & 异步组件：不会一上来就将所有的组件都加载，而是访问到对应的路由了，才加载解析这个路由对应的所有组件
// 当打包构建应用时，JavaScript包会变得非常大，影响页面加载。
// 如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了
// 官网链接：https://router.vuejs.org/zh/guide/advanced/lazy-loading.html#%E4%BD%BF%E7%94%A8-webpack
// 打包发布后的文件中如果组件多了，app.js是我们自己的js文件，可能会非常大，导致首屏加载过慢
// 所以不需要一进页面就把所有组件都加载，用到哪个组件再加载，按需加载，这样就不会让首屏加载过慢
// 再次打包之后可以看到js文件夹中就会有很多js文件，可以理解为一个个的路由，访问哪个就会加载哪个
// 加载完之后会缓存，不需要再加载

// vue脚手架只是开发过程中，协助开发的工具，当真正开发完了 => 脚手架不参与上线
// 参与上线的是 => 打包后的源代码
// 打包：将多个文件压缩合并成一个文件，语法降级，less sass ts 语法解析成css....
// 打包后，可以生成浏览器能够直接运行的网页 => 就是需要上线的源码！
// 通过yarn build在项目的根目录会自动创建一个文件夹dist，dist中的文件就是打包后的文件，只需要放到服务器中即可

// 在vue.config.js中配置publicPath
// publicPath的官网地址：https://cli.vuejs.org/zh/config/#publicpath
// publicPath的默认值是'/'，所以默认直接打包的项目代码，必须直接丢在服务器根目录才能运行
// 默认情况下，Vue CLI会假设你的应用是被部署在一个域名的根路径上，例如https://www.my-app.com/
// 这里以CuteFTP为例，如果说把dist里面的所有内容直接丢到服务器根目录下，然后访问http://whzcarry.3vzhuji.cc/ 是可以运行出来的

// 如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径
// 例如，如果你的应用被部署在https://www.my-app.com/my-app/，则设置 publicPath 为 '/my-app/'
// 也就是说如果把dist目录丢到服务器根目录下，那么访问http://whzcarry.3vzhuji.cc/dist 是不能运行出来的
// 必须要配置publicPath为'/dist/'

// 那么如果不想这么麻烦，就可以设置为空字符串 ('') 或是相对路径 ('./')，这样所有的资源都会被链接为相对路径
// 这样打出来的包可以被部署在任意路径，也可以用在类似 Cordova hybrid 应用的文件系统中
module.exports = {
  publicPath: './'
}
