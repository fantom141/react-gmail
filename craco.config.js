const path = require(`path`);

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@/context': path.resolve(__dirname, 'src/context'),
      '@/pages': path.resolve(__dirname, 'src/pages'),
      '@/components': path.resolve(__dirname, 'src/components'),
      '@/assets': path.resolve(__dirname, 'src/assets'),
    },
  },
};
