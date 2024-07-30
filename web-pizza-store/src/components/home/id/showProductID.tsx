'use client';

import { ProductProps } from "../features";
import { GoDash, GoPlus } from "react-icons/go";
import { PiReceipt } from "react-icons/pi";
import { ButtonText } from "@/components/buttonText";
import { useRouter } from "next/navigation";
import { useOrders } from "@/hooks/orderRequest";
import Link from "next/link";

type ShowProductIDProps = {
    filteredProductId: ProductProps
    user: any
    itemValue: number
    setItemValue: (value: number) => void
};

export function ShowProductID({ filteredProductId, user, itemValue, setItemValue }: ShowProductIDProps) {
    const { addDisheOnCart } = useOrders();
    const router = useRouter();

    function handleAddDicherOnCart() {
        addDisheOnCart({
            user_id: user?.id as number,
            meal_id: filteredProductId.meal_id as number,
            quantity: itemValue
        });
    }

    console.log('print filteredCartItems', filteredProductId)
    return (
        <section className="flex flex-col font-poppins antialiased w-full gap-6 items-center md:justify-self-start md:items-start md:col-span-1 md:z-20 md:pl-8">
            <h2 className="text-3xl flex md:font-medium md:text-[40px]">
                {filteredProductId.name}
            </h2>
            <p className="text-base text-center md:text-start md:text-2xl w-full text-light-300">
                {filteredProductId?.description}
            </p>
            <div className="flex w-full gap-6 md:gap-3 flex-wrap justify-center md:justify-start">
                {filteredProductId.ingredients.map((ingredient, index) => (
                    <span 
                        key={index} 
                        className="flex text-sm py-1 px-3 bg-dark-100 rounded-md font-medium text-light-100"
                    >
                        {ingredient}
                    </span>
                ))}
            </div>
            {user && user.role === 'admin' ? (
                <span className="flex w-full pt-12 md:w-fit md:ml-0 px-7 md:px-0">
                    <ButtonText text="Editar prato" size={48} onclick={() => router.push(`/home/${filteredProductId.meal_id}/edit`)} />
                </span>  
            ) : (
                <div className="flex w-full flex-col lg:flex-row justify-center items-center gap-x-4 text-lg text-white pt-12 mb-12">
                    <span className="flex m-auto items-center gap-4">
                        <GoDash className="text-6xl" onClick={() => setItemValue(itemValue - 1)} />
                        <span className="text-light-300 font-roboto font-bold text-2xl">
                            {itemValue}
                        </span>
                        <GoPlus className="text-6xl" onClick={() => setItemValue(itemValue + 1)} />
                    </span>
                    <Link 
                        href={'/checkout'}
                        onClick={handleAddDicherOnCart}
                        className="flex w-full min-w-[180px] items-center justify-center h-11 gap-2 rounded-md text-white text-xs bg-tint-tomato-400 hover:bg-tint-tomato-300 duration-75"
                    >
                        <PiReceipt className="text-xl" /> 
                        pedir ∙ R$ {filteredProductId?.price}
                    </Link>
                </div>
            )}
        </section>
    );
}