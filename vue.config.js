const webpack = require('webpack')
const path = require('path')

module.exports = {
  publicPath: process.env.BASE_URL || '/',
  chainWebpack: config => {
    const svgRule = config.module.rule('svg')

    svgRule.uses.clear()

    svgRule.use('vue-svg-loader').loader('vue-svg-loader')

    config.module
      .rule('graphql')
      .test(/\.(graphql|gql)$/)
      .use('graphql-tag/loader')
      .loader('graphql-tag/loader')
      .end()
  },
  configureWebpack: {
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          API_ENV: JSON.stringify(process.env.API_ENV),
        },
      }),
    ],
  },
}
