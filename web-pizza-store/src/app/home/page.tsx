import { Main } from "@/components/home/main";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const Features = dynamic(() =>
    import(
        /* webpackChuckName: "Features"*/
        "@/components/home/features")
        .then((module) => module.Features)
  );

export default function Home() {

    return (
        <section className="flex flex-col min-h-screen w-full justify-between gap-6 bg-dark-700 overflow-hidden pb-6
            md:pb-12 md:pt-28 lg:pt-44"
        >
            <Main />
            <Suspense fallback={<p>Carregando Refeições...</p>}>
                <Features section="Refeições"/>
                <Features section="Pratos principais"/>
                <Features section="Pratos principais"/>
            </Suspense>
        </section>
    )
}