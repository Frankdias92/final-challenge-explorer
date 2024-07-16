import { BsFillHexagonFill } from "react-icons/bs";
import { Suspense } from "react";
import dynamic from "next/dynamic";

const HandleWithLogin = dynamic(() => 
    import(
        /* webpackChunkName: "handleWith-Login"*/
        '../../components/login/handleWithLogin'), { ssr: false }
)

export default function LogIn() {
    return (
        <section className="flex w-full min-h-full flex-col px-12 pt-[98px] lg:pt-24 m-auto bg-dark-700 text-white lg:px-[108px] lg:overflow-y-auto min-w-[428px]">

            <div className="flex flex-col w-full lg:flex-row lg:justify-between m-auto max-w-[1368px]">
                <span className="flex w-full items-center justify-center lg:justify-start lg:items-start lg:mt-[200px] font-bold gap-2 text-3xl">
                    <span className="text-tint-cake-400 text-4xl"><BsFillHexagonFill /></span>
                    food explorer
                </span>

                <div className="flex flex-col w-full min-h-full gap-8  m-auto rounded-2xl lg:bg-dark-400 lg:p-16 max-w-[476px]">
                    <Suspense fallback={<div>Loading...</div>}>
                        <HandleWithLogin />
                    </Suspense>
                </div>
            </div>
        </section>
    )
}