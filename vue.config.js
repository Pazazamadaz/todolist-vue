const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/' // no need for separate path for production as going to use Azure Static instead of GitHub Pages
});


