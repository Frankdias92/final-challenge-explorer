'use client'

import { Features } from "@/components/home/features";
import { Footer } from "@/components/home/footer";
import { Header } from "@/components/home/header";
import { Main } from "@/components/home/main";

export default function Home() {

    return (
        <section className="flex flex-col min-h-full w-full gap-6 bg-dark-700 overflow-hidden">
            <Header />
            <Main />
            <Features section="Refeições"/>
            <Features section="Pratos principais"/>
            <Features section="Pratos principais"/>
            <Footer />
        </section>
    )
}