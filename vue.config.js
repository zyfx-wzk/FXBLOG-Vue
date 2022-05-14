module.exports = {
    publicPath: './',
    assetsDir: './',
    transpileDependencies: true,
    configureWebpack: {
        //按需自动导入组件
        plugins: [
            require('unplugin-element-plus/webpack')({}),
        ],
        externals: {
            'jquary': '$',
        }
    },
    devServer: {
        hot: true,//是否启用模块的热替换功能
        open: false, // 是否启用浏览器自动打开
        host: "127.0.0.1",
        port: 3000,
    }
}
