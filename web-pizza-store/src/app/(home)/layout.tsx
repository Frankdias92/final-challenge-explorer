import { Footer } from "@/components/home/footer";
import Header from "@/components/home/header";
import { Metadata } from "next";
import { ProviderHomeCart } from './ProviderHomeCart'

export const metadata: Metadata = {
    title: "Home | Food explorer",
    description: "A aplicação que desenvolveremos é um cardápio digital para um restaurante fictício, conhecido como foodExplorer.",
  };

  export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    
    return (
      <ProviderHomeCart >
        <section className="flex flex-col w-full min-h-screen justify-between">
          <Header />
            {children}
          <Footer />
        </section>
      </ProviderHomeCart>
    );
  }