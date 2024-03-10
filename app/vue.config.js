module.exports = {
    //处理map文件
    productionSourceMap:false,
    //关闭语法检查
    lintOnSave: false,

    //配置代理解决跨域问题
    devServer: {
        proxy: {
          '/api': {
            //目标服务器
            target: 'http://127.0.0.1:8000',
            ws: true,
            changeOrigin: true,
            pathRewrite: {
              '^/api': 'http://127.0.0.1:8000', //路径重写
            },
          },
        }
      }
}