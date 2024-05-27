import { Image } from "@nextui-org/react";
import NextImage from "next/image";

export function Main() {
    const pathImg = 'https://raw.githubusercontent.com/Frankdias92/final-challenge-explorer/main/web-pizza-store/src/assets'


    return (
        <section className="flex w-full px-7 mt-11">
            <div className="grid grid-cols-2 w-full h-[120px] bg-gradient-to-b from-gradient-200-to to-gradient-200-stop rounded-[3px] relative">
                <div className="flex">
                    <span className="absolute flex bottom-0 left-0 overflow-hidden 
                        h-[160px]">
                        <Image
                            as={NextImage}
                            width={656}
                            height={412}
                            src={`${pathImg}/mask-group.png`}
                            alt="NextUI hero Image"
                            className="flex w-[205px] h-[160px] rotate-[2deg] translate-y-2 -translate-x-3"
                        />
                    </span>
                </div>

                <div className="flex flex-col w-full justify-center items-center font-poppins text-light-300 antialiased">
                    <h3 className="text-lg font-semibold ">
                        Sabores inigualáveis
                    </h3>
                    <p className="text-sm">
                        Sinta o cuidado do preparo com ingredientes selecionados.
                    </p>
                </div>
            </div>
        </section>
    )
}