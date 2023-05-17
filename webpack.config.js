const path = require('path');


module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, '../client/libs'),
    filename: 'tolmasoft.js'
  },
  mode: 'development',
  //mode: 'production',
  //devtool: 'source-map'

  
};