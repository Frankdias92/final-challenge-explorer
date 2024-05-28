
import { Image } from "@nextui-org/react";
import { FormEvent, useState } from "react";
import NextImage from "next/image";

import { GoDash, GoPlus } from "react-icons/go";
import { PiPencilSimple } from "react-icons/pi";
import { FaHeart } from "react-icons/fa";

import { useProducts } from "@/hooks/stateProducts";
import { DataProps } from "@/types/types";
import { ButtonText } from "../buttonText";
import { UseAuth } from "@/hooks/auth";
import Link from "next/link";


interface ListProps {
    productList: {
        id: number
        image: string 
        title: string 
        price: string 
    }
    
}

export function ListProductsFeatures({ productList }: ListProps) {
    const { updateProduct, product } = useProducts()


    const [ itemValue, setItemValue] = useState<number>(1)
    const [data, setData] = useState<DataProps>()
    
    const pathImg = 'https://raw.githubusercontent.com/Frankdias92/final-challenge-explorer/main/web-pizza-store/src/assets/menu'


    const { user } = UseAuth()

    return (
        <div className="flex flex-col m-4 w-[210px] h-[292px] rounded-lg bg-dark-900 border-0 outline-none
            ring-1 ring-dark-800 relative">
                <div className="absolute flex right-4 top-4 text-light-300 text-2xl">
                    {user && user.role === 'admin' ?  <PiPencilSimple /> : <FaHeart /> }
                </div>
                <div className="flex flex-col w-full h-full justify-start items-center gap-3 p-6">
                    <span className="flex h-[88px] bg-cover">
                        <Image
                            as={NextImage}
                            width={88}
                            height={88}
                            src={`${pathImg}/${productList.image}`}
                            alt="NextUI hero Image"
                            className="flex"
                        />
                    </span>

                    
                    <div className="flex flex-col items-center w-full h-full gap-3">
                        <Link href={`/home/${productList.id}`}>{productList.title} {`>`}</Link>
                        <span>R$ {productList.price}</span>

                        <div className="flex justify-center items-center gap-x-4 text-lg text-white z-20">
                            <GoDash onClick={() => setItemValue(itemValue -1)}/>
                            <span className="text-light-300">{itemValue}</span>
                            <GoPlus onClick={() => setItemValue(itemValue +1)}/>
                        </div>

                        {user && user.role === 'customer' && <ButtonText text="incluir" />}
                    </div>
                </div>
            </div>
    )
}