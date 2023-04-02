module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      // 这里本来是style: true  如果想定制主题，那么可以配置如下按需引入样式源文件
      style: (name) => `${name}/style/less`
    }, 'vant']
  ]
}
