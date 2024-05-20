
import { Image, card } from "@nextui-org/react";
import NextImage from "next/image";
import { ButtonText } from "../buttonText";
import { GoDash, GoPlus } from "react-icons/go";
import { useProducts } from "@/hooks/stateProducts";
import { useState } from "react";
import Link from "next/link";


interface ListProps {
    id: number
    image: string 
    title: string 
    price: string 
    amount: string
    link: string
}

export function ListProductsFeatures({ image, title, price, amount, link, id }: ListProps) {
    const { handleUpdateCard } = useProducts()
    const [itemValue, setItemValue] = useState<number>(1)
    
    const pathImg = 'https://raw.githubusercontent.com/Frankdias92/final-challenge-explorer/main/web-pizza-store/src/assets/menu'

    return (
        <div className="flex flex-col m-4 w-[210px] h-[292px] rounded-lg bg-dark-900 border-0 outline-none
            ring-1 ring-dark-800 ">
                <div className="flex flex-col w-full h-full justify-start items-center gap-3 p-6">
                    <span className="flex size-[88px] bg-cover">
                        <Image
                            as={NextImage}
                            width={88}
                            height={88}
                            src={`${pathImg}/${image}`}
                            alt="NextUI hero Image"
                            className="flex"
                        />
                    </span>

                    
                    <div className="flex flex-col items-center w-full h-full gap-3">
                        <Link href={`/home/${id}`}>{title} {`>`}</Link>
                        <span>R$ {price}</span>

                        <div className="flex justify-center items-center gap-x-4 text-lg text-white z-20">
                            <GoDash onClick={() => setItemValue(itemValue -1)}/>
                            <span className="text-light-300">{itemValue}</span>
                            <GoPlus onClick={() => setItemValue(itemValue +1)}/>
                        </div>

                        <ButtonText text="incluir" onclick={() => handleUpdateCard({ card: itemValue})}/>
                    </div>
                </div>
            </div>
    )
}