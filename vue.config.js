module.exports = {
  devServer: {
    before: require('./mock/index.js') // 引入 mock/index.js
  }
}
