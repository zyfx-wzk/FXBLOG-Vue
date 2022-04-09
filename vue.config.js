module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/production-sub-path/' : '/',
    transpileDependencies: true,
    devServer: {
        hot: true,//是否启用模块的热替换功能
        open: false, // 是否启用浏览器自动打开
        host: "127.0.0.1",
        port: 3000
    }
}
