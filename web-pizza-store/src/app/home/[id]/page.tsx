import { Suspense } from "react";
import RetriveId from "./retriveId";

export default function ProductId() {
    return (
        <>
        <Suspense fallback={<p>Loading...</p>}>
            <RetriveId />
        </Suspense>
        </>
    );
}
