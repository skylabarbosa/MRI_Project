export default {
  mode: 'jit',
  content: ['./index.html', './src/**/*.jsx'],
  theme: {
    extend: {
      colors: {
        teal: {
          50: '#E1F5EE',
          400: '#1D9E75',
          600: '#0F6E56',
          800: '#085041'
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui']
      }
    }
  },
  plugins: []
};
