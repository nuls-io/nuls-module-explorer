const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = ['js', 'css'];
const webpack = require('webpack');
const shell = require("shelljs");
shell.cp(process.cwd() + "/config/" + process.env.NULS_ENV + ".js", process.cwd() + "/src/config.js");
const isProduction = process.env.NODE_ENV === 'production';
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
  lintOnSave: false,
  publicPath: process.env.NODE_ENV === 'production' ? '/dist/' : '/',
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false
    }
  },

  configureWebpack: config => {
    if (isProduction) {
      config.plugins.push(new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8
      }));
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
    }
    // config.plugins.push(new BundleAnalyzerPlugin())

    config.devtool = !isProduction ? 'cheap-module-source-map' : false;

    config.externals = {
      'vue': 'Vue',
      'vue-router': 'VueRouter',
      'vuex': 'Vuex',
      'moment': 'moment',
      'echarts': 'echarts',
      'element-ui': 'ELEMENT',
    }

  },

  baseUrl: undefined,
  outputDir: undefined,
  assetsDir: undefined,
  runtimeCompiler: undefined,
  productionSourceMap: false,
  parallel: undefined,
  transpileDependencies: [
    'vue-echarts',
    'resize-detector'
  ],
  css: {
    sourceMap: true
  },
  devServer: {
    port: 8080,
    host: '0.0.0.0',
    https: false, // https:{type:Boolean}
    open: true,
    proxy: {
      '/api': {
        // target: 'http://127.0.0.1:8080/',
        // target: "https://beta.public1.nuls.io/jsonrpc",
        // target: 'http://beta.wallet.nuls.io/api',
        // target: 'https://beta.nulscan.io/api',
        target: 'https://nulscan.io/api',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      },
      '/mApi': {
        target: 'https://04.nulscan.io/api', 
        changeOrigin: true,
        pathRewrite: {
          '^/mApi': '/'
        }
      }
    }
  },

}
