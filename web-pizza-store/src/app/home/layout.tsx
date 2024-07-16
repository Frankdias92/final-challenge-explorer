import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
    title: "Home | Food explorer",
    description: "A aplicação que desenvolveremos é um cardápio digital para um restaurante fictício, conhecido como foodExplorer.",
  };

  const header = dynamic(() => import(
    /* webpackPrefetch: true */
    /* webpackChunkName: "Header"*/
    "@/components/home/header"), { ssr: true }
  )

  const footer = dynamic(() => 
    import(
      /* webpackPrefetch: true */
      /* webpackChunkName: "Footer" */
      "@/components/home/footer")
)

  
  export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <>
        <header />
        {children}
        <footer />
      </>
    );
  }