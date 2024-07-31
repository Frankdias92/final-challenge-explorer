'use client'

import { Main } from "@/components/home/main";
import dynamic from "next/dynamic";
import { useSearch } from "./searchProvider";
import { ListProductsFeatures } from "@/components/home/listProdutsFeatures";

const Features = dynamic(() =>
    import(
        // webpackPrefetch: true
        /* webpackChuckName: "Features"*/
        "@/components/home/features")
        .then((module) => module.Features), {
            loading: () => <p>Loading...</p>,
            ssr: false
        }
  );

export default function Home() {
    const { searchTerm, filteredProducts } = useSearch()

    return (
        <section className="flex flex-col min-h-screen w-full justify-between gap-6 bg-dark-700 overflow-hidden pb-6
            md:pb-12 md:pt-28 lg:pt-44"
        >
            {searchTerm ? (
                <>
                    {filteredProducts.map(product => (
                        <ListProductsFeatures 
                            key={product.meal_id}
                            title={product.name}
                            description={product.description}
                            image={product.productImg}
                            ingredients={product.ingredients}
                            meal_id={product.meal_id}
                            price={product.price}
                        />
                    ))}
                </>
            ) : (
                <>
                    <Main />
                    <Features section="Refeições"/>
                    <Features section="Pratos principais"/>
                    <Features section="Pratos principais"/>
                </>
            )}
        </section>
    )
}