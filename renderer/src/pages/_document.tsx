import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://weekly.ecukorea.com" />
        <meta property="og:title" content="ECU 토요모임" />
        <meta
          property="og:image"
          content="https://weekly.ecukorea.com/logo.jpg"
        />
        <meta property="og:description" content="ECU 토요모임" />
        <meta property="og:site_name" content="ECU 토요모임" />
        <meta property="og:locale" content="ko_KR" />
        <meta property="og:image:width" content="239" />
        <meta property="og:image:height" content="104" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
