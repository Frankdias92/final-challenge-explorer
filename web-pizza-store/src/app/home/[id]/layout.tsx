
import { Metadata } from "next";


export const metadata: Metadata = {
    title: "Admin | Food explorer",
    description: "Area exclusiva para alteração dos pratos.",
};


export default function EditLayout({ children }: Readonly<{children: React.ReactNode}>) {

    return (
        <>
            {children}
        </>
    )
} 