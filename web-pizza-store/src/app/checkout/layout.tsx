import { CheckoutStatus } from "@/components/checkout/checkoutStatus";
import { Footer } from "@/components/home/footer";
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
      <section className="flex flex-col w-full h-screen justify-between">
        <CheckoutStatus />
        {children}
        <Footer />
      </section>
    );
  }