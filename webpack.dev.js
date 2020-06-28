const merge = require("webpack-merge");
const common = require("./webpack.common");
 
module.exports = merge(common, {
   mode: "development",
   devServer: {
      contentBase: __dirname + "/dist/",
      writeToDisk: true
   }
})