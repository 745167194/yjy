module.exports = {
  devServer: {
    before: require('./mock/index.js') // 引入 mock/index.js
  }
}


const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("assets", resolve("src/assets"))
      .set("components", resolve("src/components"))
      .set("base", resolve("baseConfig"))
      .set("public", resolve("public"));
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src') //配置根目录的@方法
      }
    }
  },
}


