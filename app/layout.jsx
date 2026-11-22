export const metadata = {
  title: 'Humatindo — Leading Biostimulant and Organic Fertilizer',
  description: 'PT. Artha Prima Humatindo: humic biostimulants and organic fertilizer from Sumatran lignite, made in Pekanbaru, Riau.',
  icons: { icon: '/img/logo-symbol.webp' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
