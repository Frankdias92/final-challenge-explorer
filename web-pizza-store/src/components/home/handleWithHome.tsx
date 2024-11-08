'use client'

import { Main } from "@/components/home/main";
import dynamic from "next/dynamic";
import { UseAuth } from "@/hooks/auth";
import { LoaderProducts } from "../../components/loader/LoaderProducts";
import { Suspense } from "react";
import { useSearch } from "@/app/(home)/searchProvider";


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

const ListProductsFeatures = dynamic(() => 
    /* webpackChuckName: ListProductsFeatures */
    import('@/components/home/listProdutsFeatures')
        .then((module) => module.ListProductsFeatures), {
            loading: () => <LoaderProducts />,
            ssr: true
        }
)

export function HandleWithHome () {
    const { searchTerm, filteredProducts } = useSearch()
    const { isMenuOpen } = UseAuth()

    return (
        <section className={`${isMenuOpen ? 'h-0 overscroll-y-none overflow-hidden' : 
            'flex flex-col min-h-screen w-full justify-between gap-6 bg-dark-700 overflow-hidden pb-6 md:pb-12 md:pt-28 lg:pt-44'}`}>
            {searchTerm ? (
                <section className="w-3/4 mt-0 m-auto flex gap-4">
                    {filteredProducts.map(product => (
                        <ListProductsFeatures 
                            key={product.meal_id || 1}
                            title={product.name || 'Sample'}
                            description={product.description || 'sample'}
                            image={product.productImg || `${process.env.BLUR_DATA}`}
                            ingredients={product.ingredients || ['test']}
                            meal_id={product.meal_id || 1}
                            price={product.price || 0}
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