module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        surface: '#fbfbf7',
        foreground: '#0f172a',
        accent: '#6b705c',
        pine: '#2f5132',
        ember: '#f07a4b'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        serif: ['Playfair Display', 'ui-serif', 'serif']
      },
      boxShadow: {
        xlsoft: '0 10px 30px rgba(15,23,42,0.12)'
      },
      borderRadius: {
        lgcard: '18px'
      }
    }
  },
  plugins: []
}
