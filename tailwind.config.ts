import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
                hero: "url('/images/hero-1.jpg')",
            },
            colors: {
                'secondary-dark': '#070720',
                secondary: '#0b0c2a',
                primary: '#e53637',
                'secondary-light': 'rgba(255, 255, 255, 0.2)',
                'premium-gold': '#B79501',
                'premium-white': '#CDC6B4',
                'premium-black': '#4D4C53',
                'premium-blue': '#09186D',
                'my-gray': '#3d3d3d',
                'font-color-light': '#b7b7b7',
            },
            fontFamily: {
                oswald: ['Oswald', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
export default config;
