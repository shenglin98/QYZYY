module.exports = {
    filenameHashing: true, // 默认开启
    configureWebpack: {
        output: {
            filename: '[name].[contenthash:8].js',
            chunkFilename: '[name].[contenthash:8].js'
        },
        devtool: 'source-map'
    },
    // configureWebpack: {
    //     devtool: 'source-map'
    // },
    transpileDependencies: [/node_modules/],
    pages: {
        index: {
            // add here ---start---
            entry: ['node_modules/babel-polyfill/dist/polyfill.js', 'src/main.js'],
            // add here ---end---
            template: 'public/index.html',
            filename: 'index.html',
            chunks: ['chunk-vendors', 'chunk-common', 'index'],
        },
    },
    lintOnSave: false,
    productionSourceMap: false,
    publicPath: "/",
    outputDir: "dist",
    assetsDir: "static",
    devServer: {
        // 核心配置：关闭主机头验证
        disableHostCheck: true,
        proxy: {
            // '/apiWxUnifiedOrder': {
            //     target: 'http://101.200.229.181:8030/api-pay/Payment/WxUnifiedOrder',
            //     changeOrigin: true,
            // },
            // '/apipayWx': {
            //     // 此处的写法，目的是为了 将 /api 替换成 https://www.baidu.com/
            //     target: 'http://101.200.229.181:8030/api-pay/Register/WxLogin',
            //     // 允许跨域
            //     changeOrigin: true,
            //     pathRewrite: {
            //         '^/apipayWx': ''
            //     }
            // },
            '/api-pay/': {
                target: 'http://101.200.229.181:8030/', // 上传
                ws: true,
                changeOrigin: true, //允许跨域

            }
        }
    }
}