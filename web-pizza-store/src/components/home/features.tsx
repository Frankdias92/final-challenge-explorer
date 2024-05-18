import { Image } from "@nextui-org/react";
import NextImage from "next/image";

export function Features() {
    const pathImg = 'https://raw.githubusercontent.com/Frankdias92/final-challenge-explorer/main/web-pizza-store/src/assets/menu'


    return (
        <div className="flex flex-col w-full h-full justify-center font-poppins text-light-300 antialiased">
            <h3 className="font-medium text-lg">Section Name</h3>

            <div className="flex flex-col w-[210px] h-[292px] rounded-lg bg-dark-900 border-0 outline-none
            ring-1 ring-dark-800 ">
                <div className="flex flex-col w-full h-full justify-start items-center p-6">
                    <span className="flex size-[88px] bg-cover">
                        <Image
                            as={NextImage}
                            width={88}
                            height={88}
                            src={`${pathImg}/Mask%20group.png`}
                            alt="NextUI hero Image"
                            className="flex"
                        />
                    </span>

                    <span>test</span>
                </div>
            </div>
        </div>
    )
}