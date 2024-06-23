'use client'

import { useEffect, useState } from "react";
import { ListProductsFeatures } from "./listProdutsFeatures";
import Slider from "react-slick"
import { UseAuth } from "@/hooks/auth";
import { api } from "@/services/api";


interface FeaturesProps {
    section: string
}
export interface ProductProps {
    meal_id: number
    name: string
    description: string
    ingredients: string[]
    price: number
    productImg: string
}


export function Features({ section }: FeaturesProps ) {
    const [data, setData] = useState<ProductProps[]>([])

    useEffect(() => {
        async function getProducts() {
            try {
                const response = await api.get('/meals')
                const products = response.data
    
                setData(products)
            } catch (error) {
                alert(error)
            }
        }
        getProducts()
    }, [])
    
    // Slider configs
    const settings = {
        dots: true,
        focusOnSelect: false,
        adaptiveHeight: true,
        variableWidth: true,
        infinite: true,
        swipeToSlide: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1, 
        rtl: false, 
    }


    return (
        <div className="flex flex-col w-full h-full justify-center font-poppins text-light-300 antialiased
        md:w-3/4 m-auto relative">
            <h3 className="font-medium text-lg px-7 md:px-0 z-20 pb-6">{section}</h3>

            <Slider 
                {...settings}
                className="flex justify-center w-full h-full overflow-hidden pl-6 pb-11 md:pl-0 z-0"
            >

                {data.map(item => {
                    return (
                        <div className="flex px-4 z-0" key={item.meal_id}>
                            <ListProductsFeatures
                                productList={[{
                                    id: item.meal_id,
                                    image: item.productImg,
                                    title: item.name,
                                    description: item.description,
                                    price: item.price,
                                    ingredients: item.ingredients
                                }]}
                            />

                        </div>
                    )
                })}

            </Slider>

            <div className="hidden lg:flex bg-gradient-to-r from-dark-700 to-dark-700/0 w-[233px] h-full absolute left-0 top-0 z-10 pointer-events-none"/>
            <div className="hidden md:flex bg-gradient-to-l from-dark-700 to-dark-700/0 w-[233px] h-full absolute right-0 top-0 z-10 pointer-events-none"/>
        </div>
    )
}