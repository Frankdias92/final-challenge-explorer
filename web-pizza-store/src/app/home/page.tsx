'use client'

import { Features } from "@/components/home/features";
import { Header } from "@/components/home/header";
import { Main } from "@/components/home/main";

export default function Home() {

    return (
        <section className="flex flex-col min-h-screen w-full gap-11 bg-dark-700">
            <Header />
            <Main />
            <Features />
        </section>
    )
}