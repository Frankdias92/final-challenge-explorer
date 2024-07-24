
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Pedido | Food explorer",
    description: "Continue com o pagamento do seu pedido",
  };
  
  export default function CheckOutLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <section className="flex flex-col w-full min-h-screen justify-between overflow-hidden overscroll-y-auto">
        {children}
      </section>
    );
  }