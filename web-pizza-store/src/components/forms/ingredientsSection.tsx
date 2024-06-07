import { ReactNode } from "react"

interface SectionsProps {
    title: string
    children: ReactNode
}

export function Section({ title, children }: SectionsProps) {

    return (
        <div className="flex flex-col w-full gap-1">
            <h2 className="text-xl font-roboto font-bold tracking-wider">{title}</h2>
            <div className="flex w-full h-0.5 bg-store-secondary/15 mb-2"/>
            <span className="flex flex-wrap gap-4">
                {children}
            </span>
        </div>
    )
}