/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
    theme: {
        extend: {
            keyframes: {
                gradient: {
                    "0%, 100%": {
                        "background-size": "400% 400%",
                        "background-position": "center right",
                    },
                    "50%": {
                        "background-size": "100% 100%",
                        "background-position": "center left",
                    },
                },
            },
            fontFamily: {
                sans: ["InterVariable", "Inter", ...defaultTheme.fontFamily.sans],
            },
            screens: {
                xs: '481px',
            },
            fontSize: {
                xxs: '0.7rem',
            },
            typography: (theme) => ({
                DEFAULT: {
                    css: {
                        color: theme('colors.gray.900'),
                        a: {
                            color: theme('colors.blue.700'),
                            '&:hover': {
                                color: theme('colors.blue.500'),
                            },
                        },
            
                        'code::before': {
                            content: '""',
                        },
                        'code::after': {
                            content: '""',
                        },
                    },
                },
                dark: {
                    css: {
                        color: theme('colors.gray.300'),
                        a: {
                            color: theme('colors.purple.500'),
                            '&:hover': {
                                color: theme('colors.purple.400'),
                            },
                        },

                        h1: {
                            color: theme('colors.gray.100'),
                        },
                        h2: {
                            color: theme('colors.gray.100'),
                        },
                        h3: {
                            color: theme('colors.gray.100'),
                        },
                        h4: {
                            color: theme('colors.gray.100'),
                        },
                        h5: {
                            color: theme('colors.gray.100'),
                        },
                        h6: {
                            color: theme('colors.gray.100'),
                        },
            
                        strong: {
                            color: theme('colors.gray.100'),
                        },
            
                        code: {
                            color: theme('colors.gray.300'),
                        },
            
                        figcaption: {
                            color: theme('colors.gray.500'),
                        },
                    },
                },
            }),
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
};
