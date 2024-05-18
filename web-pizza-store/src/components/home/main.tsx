import { Image } from "@nextui-org/react";
import NextImage from "next/image";

export function Main() {

    return (
        <main className="bg-slate-500 flex w-full min-h-32 px-7"> 
            <Image
                as={NextImage}
                width={300}
                height={200}
                src="https://raw.githubusercontent.com/Frankdias92/final-challenge-explorer/main/web-pizza-store/src/assets/menu/Mask%20group-1.png"
                alt="NextUI hero Image"
            />
        </main>
    )
}