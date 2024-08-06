// import dynamic from "next/dynamic";
import { LoaderProducts } from "@/components/loader/LoaderProducts";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const RetriveId = dynamic(() => 
    import("./retriveId"), {
        loading: () => <span className="flex justify-center items-center"><LoaderProducts /></span>,
        ssr: false
    }
)

export default function ProductId() {
    return (
        <>
        <Suspense fallback={<LoaderProducts />}>
            <RetriveId />
        </Suspense>
        </>
    );
}
