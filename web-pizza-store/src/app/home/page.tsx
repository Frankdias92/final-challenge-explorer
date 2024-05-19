import { Features } from "@/components/home/features";
import { Main } from "@/components/home/main";
import NextImage from "next/image";



export default function Home() {

    return (
        <section className="flex flex-col min-h-screen w-full justify-between gap-6 bg-dark-700 overflow-hidden">
            <Main />
            <Features section="Refeições"/>
            <Features section="Pratos principais"/>
            <Features section="Pratos principais"/>
        </section>
    )
}