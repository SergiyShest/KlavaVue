module.exports = {
  configureWebpack: {
    devtool: "source-map"
  },
  chainWebpack: config => {
    config.module.rules.delete("eslint");
  }
};
