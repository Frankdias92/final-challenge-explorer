

import { Features } from "@/components/home/features";
import { Main } from "@/components/home/main";

export default function Home() {

    return (
        <section className="flex flex-col min-h-full w-full justify-between gap-6 bg-dark-700 overflow-hidden">
            <Main />
            <Features section="Refeições"/>
            <Features section="Pratos principais"/>
            <Features section="Pratos principais"/>
        </section>
    )
}