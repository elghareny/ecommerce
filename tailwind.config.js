/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            gridTemplateColumns: {
                'auto-fill-100': 'repeat(auto-fill, minmax(100px, 1fr))',
                'auto-fit-100': 'repeat(auto-fit, minmax(100px, 1fr))',
                'auto-fill-200': 'repeat(auto-fill, minmax(200px, 1fr))',
                'auto-fill-250': 'repeat(auto-fill, minmax(250px, 1fr))',
                'auto-fit-200': 'repeat(auto-fit, minmax(200px, 1fr))',
                'auto-fit-200': 'repeat(auto-fit, minmax(200px, 1fr))',
                'auto-fill-300': 'repeat(auto-fill, minmax(300px, 1fr))',
                'auto-fit-300': 'repeat(auto-fit, minmax(300px, 1fr))',
                'auto-fill-400': 'repeat(auto-fill, minmax(400px, 1fr))',
                'auto-fit-400': 'repeat(auto-fit, minmax(400px, 1fr))',
            },

        },

    },
    plugins: [require('tailwind-scrollbar')],
}