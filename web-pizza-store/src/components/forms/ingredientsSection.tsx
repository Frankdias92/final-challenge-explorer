import { ReactNode } from "react"

interface SectionsProps {
    title: string
    children: ReactNode
}

export function Section({ title, children }: SectionsProps) {

    return (
        <div className="flex flex-col pt-6 w-full flex-wrap">
            <h2 className="text-xs text-light-400 font-roboto pb-2">{title}</h2>
            <section
                className="flex w-full px-3 py-2 leading-tight antialiased bg-dark-200 min-h-12
                text-light-500 shadow appearance-none border-none rounded-lg
                focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-light-700 placeholder:text-light-400 hover:placeholder:text-light-500 duration-300
            ">
                    {children}
            </section>
        </div>
    )
}