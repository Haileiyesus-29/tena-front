/** @type {import('tailwindcss').Config} */
import 'daisyui'
export default {
   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
   theme: {
      extend: {},
   },
   plugins: [require('daisyui')],
   daisyui: {
      theme: false,
   },
}