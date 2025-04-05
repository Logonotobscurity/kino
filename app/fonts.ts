import localFont from 'next/font/local';

// Inter font (variable) 
export const inter = localFont({
  src: [
    {
      path: '../public/fonts/inter/inter-variable.woff2',
      style: 'normal',
    }
  ],
  variable: '--font-inter',
  display: 'swap',
});

// Lato font
export const lato = localFont({
  src: [
    {
      path: '../public/fonts/lato/lato-100.woff2',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../public/fonts/lato/lato-300.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/lato/lato-400.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/lato/lato-700.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/lato/lato-900.woff2',
      weight: '900',
      style: 'normal', 
    }
  ],
  variable: '--font-lato',
  display: 'swap',
}); 