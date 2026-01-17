/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'primary-pink': '#ff69b4',
        'soft-pink': '#ffb6c1',
        'deep-rose': '#c71585',
        'cream': '#fef5f7',
        'gold': '#ffd700',
        'vintage-brown': '#8b4513',
        'text-dark': '#4a4a4a',
      },
      fontFamily: {
        'great-vibes': ['Great Vibes', 'cursive'],
        'dancing': ['Dancing Script', 'cursive'],
        'patrick': ['Patrick Hand', 'cursive'],
        'playfair': ['Playfair Display', 'serif'],
        'indie': ['Indie Flower', 'cursive'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'handwriting': 'handwriting 3s ease-in-out infinite',
        'stamp-bounce': 'stamp-bounce 2s ease-in-out infinite',
        'flower-fall': 'flower-fall 8s linear infinite',
        'envelope-flip': 'envelope-flip 1.5s ease-in-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        handwriting: {
          '0%, 100%': { transform: 'rotate(-0.5deg)' },
          '50%': { transform: 'rotate(0.5deg)' },
        },
        'stamp-bounce': {
          '0%, 100%': { transform: 'translateY(0) rotate(-5deg)' },
          '50%': { transform: 'translateY(-5px) rotate(5deg)' },
        },
        'flower-fall': {
          '0%': { transform: 'translateY(-100px) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(100vh) rotate(360deg)', opacity: '0' },
        },
        'envelope-flip': {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(180deg)' },
        },
      },
      backgroundImage: {
        'vintage-paper': 'linear-gradient(45deg, #fef5f7 25%, transparent 25%), linear-gradient(-45deg, #fef5f7 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #fef5f7 75%), linear-gradient(-45deg, transparent 75%, #fef5f7 75%)',
        'romantic-gradient': 'linear-gradient(135deg, #ff69b4 0%, #ffb6c1 50%, #c71585 100%)',
      },
      backgroundSize: {
        'vintage': '20px 20px',
      },
      backgroundPosition: {
        'vintage': '0 0, 0 10px, 10px -10px, -10px 0px',
      },
    },
  },
  plugins: [],
}
