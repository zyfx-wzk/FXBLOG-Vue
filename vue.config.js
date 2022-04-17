module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/production-sub-path/' : '/',
    transpileDependencies: true,
    devServer: {
        hot: true,//是否启用模块的热替换功能
        open: false, // 是否启用浏览器自动打开
        host: "127.0.0.1",
        port: 3000,
        //跨域请求配置
        proxy: {
            // 这个地方的 '/api'  名字要和底下 '^/api'  这个地方的名字一样。如果这里是 '/bpi'，那么底下就也要是 '^/bpi'
            '/music': {
                target: 'https://m.kugou.com/',
                ws: true,
                //允许跨域
                changOrigin: true,
                pathRewrite: {
                    '^/music': ''
                }
            },
            '/audio': {
                target: 'https://wwwapi.kugou.com/',
                ws: true,
                //允许跨域
                changOrigin: true,
                pathRewrite: {
                    '^/audio': ''
                }
            },
        }
    }
}
