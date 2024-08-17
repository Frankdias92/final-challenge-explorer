'use client'

import { useCallback, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";

import { useOrders } from "@/hooks/orderRequest";
import { useRouter } from "next/navigation";
import { UseAuth } from "@/hooks/auth";

import { PiPencilSimple } from "react-icons/pi";
import { FaHeart } from "react-icons/fa";
import { GoDash, GoPlus } from "react-icons/go";
import { TbArrowBadgeRightFilled } from "react-icons/tb";
import { CiHeart } from "react-icons/ci";

import { LoaderProducts } from "../loader/LoaderProducts";

const ButtonText = dynamic(() => 
    import(
        /* webpackChunkName: '../buttonText' */
        '../buttonText'
    )
    .then((module) => module.ButtonText), {
        loading: () => <LoaderProducts />,
        ssr: false
    }
)

interface DisherProps {
    user_id: number
    meal_id: number
    quantity: number
}

interface ProductListProps {
    meal_id: number
    image: string 
    description: string
    title: string 
    price: number 
    ingredients?: string[]
}

export function ListProductsFeatures({ meal_id, image, description, title, price }: ProductListProps) {
    const [itemValue, setItemValue] = useState<number>(1);
    const [isFavorite, setIsFavorite] = useState(false);
    const { addDisheOnCart } = useOrders();
    const { user } = UseAuth();
    const router = useRouter();

    // BTN add on cart
    const handleAddDicherOnCart = useCallback(async({ user_id, meal_id, quantity }: DisherProps) => {
        try {
            await addDisheOnCart({
                user_id, 
                meal_id, 
                quantity
            });
        } catch (error) {
            console.error('Somenthing goes wrong on add on cart: ', error);
        }
    }, [addDisheOnCart]);


    return (
        <div key={meal_id} className="flex flex-col w-[210px] h-[292px] rounded-lg bg-dark-900 border-0 outline-none
            ring-1 ring-dark-800 relative md:w-[304px] md:h-[462px] hover:drop-shadow-lg hover:scale-[101%] duration-150">
            <div className="absolute flex right-4 top-4 text-light-300 text-2xl">
                {user && user.role === 'admin' ? (
                    <PiPencilSimple onClick={() => router.push(`/${meal_id}/edit`)}
                        className="hover:text-light-400 hover:scale-105 duration-100 hover:cursor-pointer"
                    />
                ) : (
                    <span className="flex size-8 items-center justify-center">
                        {isFavorite ? 
                            <FaHeart onClick={() => setIsFavorite(false)} className="hover:cursor-pointer"/> : 
                            <CiHeart className="text-3xl hover:cursor-pointer" onClick={() => setIsFavorite(true)}/>
                        }
                    </span>
                )}
            </div>
            <div className="flex flex-col w-full h-full items-center justify-center m-auto gap-3 p-6">
                <span className="flex items-center size-[88px] md:size-[172px]">
                    <Image
                        src={`${process.env.NEXT_PUBLIC_DB}/files/${image}`}
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL="data:'img/png"
                        width={488}
                        height={488}
                        // quality={85}
                        alt={`Image do prato ${title} com descrição ${description}`}
                        className="flex bg-contain rounded-full overflow-hidden"
                    />
                </span>
                <div className="flex flex-col items-center w-full gap-3">
                    <Link className="flex text-center truncate items-center font-medium text-sm md:font-bold md:text-2xl" href={`/${meal_id}`}>
                        {title} <TbArrowBadgeRightFilled className="flex flex-1 md:text-2xl"/>
                    </Link>
                    <span className="hidden md:flex font-roboto text-sm text-center h-11 w-fit truncate text-wrap">
                        {description}
                    </span>
                    <span>R$ {price}</span>
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
                                    meal_id: meal_id,
                                    quantity: itemValue
                                })} 
                                size={48}
                            />
                        </>
                    }
                </div>
            </div>
        </div>
    );
}
