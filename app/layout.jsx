import './globals.css';

export const metadata = {
  title: 'Humatindo — Restoring the soil that feeds Asia',
  description: 'PT Artha Prima Humatindo turns Sumatran lignite into humic biostimulants for regenerative agriculture. Founded in Riau in 2016.',
  icons: { icon: '/img/logo-symbol.webp' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
