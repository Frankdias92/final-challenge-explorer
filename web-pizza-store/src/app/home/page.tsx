import { Features } from "@/components/home/features";
import { Main } from "@/components/home/main";


export default function Home() {

    return (
        <section className="flex flex-col min-h-screen w-full justify-between gap-6 bg-dark-700 overflow-hidden pb-6
            md:pb-12 lg:pt-44"
        >
            <Main />
            <Features section="Refeições"/>
            <Features section="Pratos principais"/>
            <Features section="Pratos principais"/>
        </section>
    )
}