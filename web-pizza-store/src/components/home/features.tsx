'use client'

import { useEffect, useRef, useState } from "react";
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
    price: number
    productImg: string
}[]


export function Features({ section }: FeaturesProps ) {
    const sliderRef = useRef<Slider | null>(null)
    const [data, setData] = useState<ProductProps[]>([])
    // console.log(data)
    // const feature = UseAuth()

    useEffect(() => {
        async function getProducts() {
            try {
                const response = await api.get('/meals')
                const data = response.data
    
                setData(data)
            } catch (error) {
                alert(error)
            }
        }
        getProducts()
    }, [data])
    
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
        <div className="flex flex-col w-full h-full justify-center font-poppins text-light-300 antialiased ">
            <h3 className="font-medium text-lg px-7">{section}</h3>

                <Slider 
                    {...settings}
                    className="flex justify-center w-full h-full  overflow-hidden translate-x-2 z-0"
                >

                        
                        {data.map(item => {
                            return (
                                <div className="flex  z-0" key={item.meal_id}>
                                    <ListProductsFeatures
                                        productList={{
                                            id: item.meal_id,
                                            image: item.productImg,
                                            title: item.name,
                                            price: item.price,
                                        }}

                                    />
                                </div>
                            )
                        })}

                </Slider>

        </div>
    )
}