'use client'

import { Main } from "@/components/home/main";
import dynamic from "next/dynamic";
import { useSearch } from "./searchProvider";
import { ListProductsFeatures } from "@/components/home/listProdutsFeatures";
import { UseAuth } from "@/hooks/auth";
import { LoaderProducts } from "../../components/loader/LoaderProducts";
import { Suspense } from "react";

const Features = dynamic(() =>
    import(
        // webpackPrefetch: true
        /* webpackChuckName: "Features"*/
        "@/components/home/features")
        .then((module) => module.Features), {
            loading: () => <LoaderProducts />,
            ssr: true
        }
  );

export default function Home() {
    const { searchTerm, filteredProducts } = useSearch()
    const { isMenuOpen } = UseAuth()

    return (
        <section className={`${isMenuOpen ? 'h-0 overscroll-y-none overflow-hidden' : 
        'flex flex-col min-h-screen w-full justify-between gap-6 bg-dark-700 overflow-hidden pb-6 md:pb-12 md:pt-28 lg:pt-44'}`}>
            {searchTerm ? (
                <section className="w-3/4 mt-0 m-auto flex gap-4">
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
                </section>
            ) : (
                <>
                    <Main />
                    <Suspense fallback={<LoaderProducts />}>
                        <Features section="Refeições"/>
                        <Features section="Sobremesas"/>
                        <Features section="Bebidas"/>
                    </Suspense>
                </>
            )}
        </section>
    )
}