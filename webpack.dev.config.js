const path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    //devServer: {
    //    contentBase: path.resolve(__dirname, 'dist'),
    //    historyApiFallback: true,
    //},
    devServer: {
        historyApiFallback: true,
        static: {
         directory: path.join(__dirname, "/"),
       },
        port: 8081,
        open: true
      }
};
