const path = require(`path`);

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@/context': path.resolve(__dirname, 'src/context'),
      '@/pages': path.resolve(__dirname, 'src/pages'),
      '@/components': path.resolve(__dirname, 'src/components'),
      '@/features': path.resolve(__dirname, 'src/features'),
      '@/assets': path.resolve(__dirname, 'src/assets'),
      '@/store': path.resolve(__dirname, 'src/store'),
    },
  },
};
