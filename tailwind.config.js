/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
    content: ["./index.html", "./src/**/*.{ts,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif']
            },
            colors: {
                brand: {
                    primary: '#E63946',
                    secondary: '#457B9D',
                    accent: '#A8DADC',
                    base: '#1D3557',
                    light: '#F1FAEE',
                },
                state: {
                    ok: '#2ecc71',
                    warn: '#f39c12',
                    err: '#E63946',
                    inf: '#457B9D'
                },
            },
            borderRadius: {
                sm: '6px',
                md: '10px',
                lg: '16px',
                pill: '9999px'
            },
            fontSize: {
                xs: '11px',
                sm: '13px',
                md: '15px',
                lg: '18px',
                xl: '22px',
                '2xl': '28px'
            },
            spacing: {
                1: '4px',
                2: '8px',
                3: '12px',
                4: '16px',
                5: '24px',
                6: '32px'
            },
            boxShadow: {
                sm: '0 2px 8px rgba(0,0,0,.45), 0 0 0 .5px rgba(168,218,220,.1)',
                md: '0 4px 20px rgba(0,0,0,.55), 0 0 0 .5px rgba(168,218,220,.12)',
                lg: '0 8px 40px rgba(0,0,0,.65), 0 0 0 .5px rgba(168,218,220,.14)',
                fab: '0 6px 24px rgba(230,57,70,.45), 0 2px 8px rgba(0,0,0,.4)',
            },
            backdropBlur: {
                glass: '16px'
            },
        },
        plugins: [],
    }
}
