const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');
const {InjectManifest} = require('workbox-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const path = require("path");

 
module.exports = {
   entry: "./src/app.js",
   output: {
       path: path.resolve(__dirname, "dist"),
       filename: "scripts/bundle.js"
   },
   module: {
       rules: [
           {
               test: /\.css$/,
               use: [
                   {
                       loader: "style-loader"
                   },
                   {
                       loader: "css-loader"
                   }
               ]
           }
       ]
   },
   plugins: [
       new CleanWebpackPlugin(),
       new HtmlWebpackPlugin({
           template: "./src/index.html",
           filename: "index.html"
       }),
       new CopyPlugin({
           patterns: [
               {
                   from: 'src/assets/',
                   to: './assets/'
               },
               {
                   from: 'src/pages/',
                   to: './pages/'
               },
               {
                   from: 'src/manifest.json',
                   to: './'
               }
           ]
       }),
       new InjectManifest({
           swSrc: path.join(process.cwd(), '/src/service-worker.js'),
           swDest: "service-worker.js"
       })
   ]
}