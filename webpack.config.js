
module.exports = {
  entry: ['./scr/app.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/bundle.js'
  },
  mode: 'development'
};