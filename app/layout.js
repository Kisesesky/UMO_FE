// app/layout.js (서버 컴포넌트)
import './globals.css';
import AppBody from '../components/AppBody';

export const metadata = {
  title: 'UMO - Urban Umbrella Mobility',
  description: '도시형 공유 우산 플랫폼, 우모',
};

export function generateViewport() {
  return {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: 'no',
    viewportFit: 'cover',
  };
}

export const themeColor = '#000000';

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/assets/logo/umo-logo.png" />
      </head>
      <body>
        <AppBody>{children}</AppBody>
      </body>
    </html>
  );
}
