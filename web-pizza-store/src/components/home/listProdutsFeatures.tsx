import { useState } from "react";
import { UseAuth } from "@/hooks/auth";
import { useRouter } from "next/navigation";
import { useOrders } from "@/hooks/orderRequest";

import NextImage from "next/image";
import { Image } from "@nextui-org/react";

import { PiPencilSimple } from "react-icons/pi";
import { FaHeart } from "react-icons/fa";
import { GoDash, GoPlus } from "react-icons/go";
import { TbArrowBadgeRightFilled } from "react-icons/tb";

import { ButtonText } from "../buttonText";
import Link from "next/link";
import { CiHeart } from "react-icons/ci";

interface Product {
    id: number
    image: string 
    description: string
    title: string 
    price: number 
    ingredients: string[]
}
interface ListProps {
    productList: Product[]
}

export function ListProductsFeatures({ productList }: ListProps) {
    const [itemValue, setItemValue] = useState<number>(1);
    // const [data, setData] = useState<DataProps>();
    const [isFavorite, setIsFavorite] = useState(false);
    const { addDisheOnCart } = useOrders()
    const router = useRouter();
    const { user } = UseAuth();

    function handleAddDicherOnCart({user_id, meal_id, quantity}: any) {
        // console.log('user', user_id, 'meal', meal_id, 'quantity', quantity)
        addDisheOnCart({
            user_id, 
            meal_id, 
            quantity
        })
    }

    return (
        <>
            {productList.map((product) => (
                <div key={product.id} className="flex flex-col w-[210px] h-[292px]  rounded-lg bg-dark-900 border-0 outline-none
                ring-1 ring-dark-800 relative md:w-[304px] md:h-[462px]">
                    <div className="absolute flex right-4 top-4 text-light-300 text-2xl">
                        {user && user.role === 'admin' ?  (
                            <PiPencilSimple  onClick={() => router.push(`/home/${product.id}/edit`)}
                                className="hover:text-light-400 hover:scale-105 duration-100 hover:cursor-pointer"
                            /> 
                        ) : (
                            <span className="flex size-8 items-center justify-center">
                                {isFavorite ? <FaHeart onClick={() => setIsFavorite(false)} className=" hover:cursor-pointer"/> : <CiHeart className="text-3xl  hover:cursor-pointer" onClick={() => setIsFavorite(true)}/>}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col w-full h-full items-center justify-center m-auto gap-3 p-6">
                        <span className="flex items-center size-[88px] md:size-[172px]">
                            <Image
                                as={NextImage}
                                // priority={false}
                                // placeholder="blur"
                                // blurDataURL={process.env.BLUR_DATA}
                                loading="lazy"
                                width={488}
                                height={488}
                                quality={100}
                                src={`http://localhost:3333/files/${product.image}`}
                                alt="NextUI hero Image"
                                className="flex bg-contain rounded-full overflow-hidden"
                            />
                        </span>

                        <div className="flex flex-col items-center w-full gap-3">
                            <Link className="flex items-center font-medium text-sm md:font-bold md:text-2xl" href={`/home/${product.id}`}>
                                {product.title} <TbArrowBadgeRightFilled className="flex flex-1 md:text-2xl"/>
                            </Link>

                            <span className="hidden md:flex font-roboto text-sm">{product.description}</span>
                            <span >R$ {product.price}</span>

                            {user && user.role === 'customer' &&
                                <>
                                    <div className="flex justify-center items-center gap-x-4 text-lg text-white z-20">
                                        <GoDash onClick={() => setItemValue(prev => Math.max(prev - 1, 1))}/>
                                        <span className="text-light-300">{itemValue}</span>
                                        <GoPlus onClick={() => setItemValue(prev => prev + 1)}/>
                                    </div>
                                    <ButtonText text="incluir" 
                                        onclick={() => handleAddDicherOnCart({
                                            user_id: user.id,
                                            meal_id: productList.map(item => item.id),
                                            quantity: itemValue
                                        })} 
                                        size={48}
                                    />
                                </>
                            }
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}
