const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');
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
                   from: 'src/service-worker.js',
                   to: './'
               },
               {
                   from: 'src/manifest.json',
                   to: './'
               }
           ]
       })
   ]
}