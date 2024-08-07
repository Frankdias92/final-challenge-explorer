import { Image } from "@nextui-org/react";
import NextImage from "next/image";

export function Main() {
    const pathImg = 'https://raw.githubusercontent.com/Frankdias92/final-challenge-explorer/main/web-pizza-store/src/assets'


    return (
        <section className="flex w-full md:w-3/4 m-auto px-6 md:px-0 mt-11 ">
            <div className="flex w-full h-[120px] lg:h-[260px] justify-end px-2 bg-gradient-to-b from-gradient-200-to to-gradient-200-stop rounded-[3px] antialiased ">
                <div className="flex flex-1 relative">
                    <span className="absolute flex bottom-0 -left-6 overflow-hidden w-[205px] h-[160px] md:w-[350px] md:h-[273px]  lg:w-[632px] lg:h-[406px] z-10">
                        <Image
                            as={NextImage}
                            width={656}
                            height={412}
                            src={`${pathImg}/mask-group.png`}
                            alt="NextUI hero Image"
                            className="flex w-[205px] h-[160px] md:w-[350px] md:h-[273px] lg:w-[632px] lg:h-[406px] rotate-[0deg] translate-y-3 md:-translate-x-8 translate-x-3"
                        />
                    </span>
                </div>

                <div className="flex flex-col w-[60%] justify-center font-poppins text-light-300 antialiased z-30">
                    <h3 className="text-lg font-semibold lg:text-[40px] leading-normal">
                        Sabores inigualáveis
                    </h3>
                    <p className="text-xs lg:text-base">
                        Sinta o cuidado do preparo com ingredientes selecionados.
                    </p>
                </div>
            </div>
        </section>
    )
}