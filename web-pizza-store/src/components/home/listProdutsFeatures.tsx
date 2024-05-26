
import { Image, card } from "@nextui-org/react";
import NextImage from "next/image";
import { ButtonText } from "../buttonText";
import { GoDash, GoPlus } from "react-icons/go";
import { useProducts } from "@/hooks/stateProducts";
import { FormEvent, useState } from "react";
import Link from "next/link";
import { DataProps } from "@/types/types";


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


    // console.log('product:', 'product')
    function handleAddProductItem() { 
        try {
            if (itemValue) {
                const productupdated = itemValue
                updateProduct({ product: productupdated})
            }
            const productUpdate = data
            // updateProduct({ product: productUpdate })
        } catch (error) {
            alert('Something went wrong with updating the product amount')
        }


    }

    function handleAddItemCard(e: FormEvent<HTMLElement>) {
        let totalAmount = e.currentTarget
        console.log(totalAmount)

    }

    

    return (
        <div className="flex flex-col m-4 w-[210px] h-[292px] rounded-lg bg-dark-900 border-0 outline-none
            ring-1 ring-dark-800 ">
                <div className="flex flex-col w-full h-full justify-start items-center gap-3 p-6">
                    <span className="flex size-[88px] bg-cover">
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

                        <button onClick={handleAddProductItem}>enviar</button>
                        {/* <ButtonText text="incluir" onclick={handleAddProductItem}/> */}
                    </div>
                </div>
            </div>
    )
}