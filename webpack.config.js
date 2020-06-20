module.exports = {
  entry: ['react-hot-loader/patch', './src'],
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
};
