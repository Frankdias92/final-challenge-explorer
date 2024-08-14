import { DM_Sans, Poppins, Roboto } from 'next/font/google'
import { Providers } from './providers'
import "./globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Head from "next/head";

const roboto = Roboto({ subsets: ["latin"], weight: ["300","400","700"], variable: '--font-roboto' })
const poppins = Poppins({  subsets: ["latin-ext"], weight: ["400", "300"], variable: '--font-poppins' })
const dmSans = DM_Sans({ subsets: ["latin-ext"], variable: '--font-dmSams' })



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="!scroll-smooth dark">
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="32x32" type="image/x-icon" />
      </Head>
      <body className={`${roboto.variable} ${poppins.variable} ${dmSans.variable} relative bg-dark-700 overflow-x-hidden`}>
        <Providers>
          {/* <CartProvider> */}
            {children}
          {/* </CartProvider> */}
        </Providers>
      </body>
    </html>
  );
}
