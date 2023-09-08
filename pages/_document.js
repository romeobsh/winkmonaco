import { Html, Head, Main, NextScript } from "next/document";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='true' />
        <link href='https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap' rel='stylesheet' />
      </Head>
      <body>
        <Main />
        <NextScript />
        <Script src='https://static.payzen.eu/static/js/authenticate-client/V1.0/kr-authenticate.umd.js'></Script>
        <Analytics />
      </body>
    </Html>
  );
}
