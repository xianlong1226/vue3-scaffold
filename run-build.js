const webpack = require("webpack")
const config = require('./webpack.config.js')

webpack(config, (err, stats) => {
  if (err || stats.hasErrors()) {
    // 在这里处理错误
    console.error(stats.compilation.errors)
    return
  }

  // 处理完成
  console.log('编译完成')
})