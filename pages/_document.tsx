import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        <meta name="title" content="Dermile — Your Skin At It's Best" />
        <meta
          name="description"
          content="Beauty, cosmetic & personal care. Your skin at its best! Nigerian 🇳🇬 brand. Dm to order. Only payment validates the order. Nationwide shipping is available."
        />
        <meta name="description" content="Dermile skin care" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dermile.com" />
        <meta property="og:title" content="Dermile — Your Skin At It's Best" />
        <meta
          property="og:description"
          content="Beauty, cosmetic & personal care. Your skin at its best! Nigerian 🇳🇬 brand. Dm to order. Only payment validates the order. Nationwide shipping is available."
        />
        <meta property="og:image" content="/images/logos/color-logo.svg" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://dermile.com" />
        <meta
          property="twitter:title"
          content="Dermile — Your Skin At It's Best"
        />
        <meta
          property="twitter:description"
          content="Beauty, cosmetic & personal care. Your skin at its best! Nigerian 🇳🇬 brand. Dm to order. Only payment validates the order. Nationwide shipping is available."
        />
        <meta property="twitter:image" content="/images/logos/color-logo.svg" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
