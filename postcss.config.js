// postcss.config.js
module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      // 适配的标准手机屏幕 375  (2倍设计图，也就是说如果拿到的设计图是750，就写375，如果640，就写320)
      viewportWidth: 375
    }
  }
}
