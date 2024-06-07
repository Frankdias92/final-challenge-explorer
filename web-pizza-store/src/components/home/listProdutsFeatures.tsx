import { Image } from "@nextui-org/react";
import { useEffect, useState } from "react";
import NextImage from "next/image";

import { GoDash, GoPlus } from "react-icons/go";
import { PiPencilSimple } from "react-icons/pi";
import { FaHeart } from "react-icons/fa";

import { DataProps } from "@/types/types";
import { ButtonText } from "../buttonText";
import { UseAuth } from "@/hooks/auth";
import Link from "next/link";
import { CiHeart } from "react-icons/ci";
import { useRouter } from "next/navigation";

interface Product {
    id: number
    image: string 
    title: string 
    price: number 
}
interface ListProps {
    productList: Product[]
}

export function ListProductsFeatures({ productList }: ListProps) {
    const [itemValue, setItemValue] = useState<number>(1);
    const [data, setData] = useState<DataProps>();
    const [isFavorite, setIsFavorite] = useState(false);
    const router = useRouter();

    const { user } = UseAuth();

    return (
        <>
            {productList.map((product) => (
                <div key={product.id} className="flex flex-col w-[210px] h-[292px] rounded-lg bg-dark-900 border-0 outline-none
                    ring-1 ring-dark-800 relative">
                    <div className="absolute flex right-4 top-4 text-light-300 text-2xl">
                        {user && user.role === 'admin' ?  
                            <PiPencilSimple onClick={() => router.push(`/home/${product.id}`)}/> : 
                            <span className="flex size-8 items-center justify-center">
                                {isFavorite ? <FaHeart onClick={() => setIsFavorite(false)}/> : <CiHeart className="text-3xl" onClick={() => setIsFavorite(true)}/>}
                            </span>
                        }
                    </div>
                    <div className="flex flex-col w-full h-full items-center justify-center m-auto gap-3 p-6">
                        <span className="flex items-center w-[88px] h-[88px]">
                            <Image
                                as={NextImage}
                                width={488}
                                height={488}
                                src={`http://localhost:3333/files/${product.image}`}
                                alt="NextUI hero Image"
                                className="flex bg-contain rounded-full overflow-hidden"
                            />
                        </span>

                        <div className="flex flex-col items-center w-full gap-3">
                            <Link href={`/home/${product.id}`}>{product.title} {`>`}</Link>
                            <span>R$ {product.price}</span>

                            {user && user.role === 'customer' &&
                                <>
                                    <div className="flex justify-center items-center gap-x-4 text-lg text-white z-20">
                                        <GoDash onClick={() => setItemValue(prev => Math.max(prev - 1, 1))}/>
                                        <span className="text-light-300">{itemValue}</span>
                                        <GoPlus onClick={() => setItemValue(prev => prev + 1)}/>
                                    </div>
                                    <ButtonText text="incluir" />
                                </>
                            }
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}
