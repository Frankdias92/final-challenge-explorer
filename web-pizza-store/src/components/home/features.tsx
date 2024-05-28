'use client'

import { useRef } from "react";
import { ListProductsFeatures } from "./listProdutsFeatures";
import Slider from "react-slick"
import { UseAuth } from "@/hooks/auth";


interface FeaturesProps {
    section: string
}

export function Features({ section }: FeaturesProps) {
    const sliderRef = useRef<Slider | null>(null)


    const feature = UseAuth()
    
    console.log('feature: ', feature)

    const products = [
        {
            id: 1,
            image: "Mask%20group-6.png",
            title: "Salada Ravanello",
            price: "49,97",
        },
        {
            id: 2,
            image: "Mask%20group-1.png",
            title: "Salada Ravanello",
            price: "49,97",
        },
        {
            id: 3,
            image: "Mask%20group-2.png",
            title: "Salada Ravanello",
            price: "49,97",
        },
    ]

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
           
                        {products.map(item => {
                            return (
                                <div className="flex  z-0" key={item.id}>
                                    <ListProductsFeatures
                                        productList={{
                                            id: item.id,
                                            image: item.image,
                                            title: item.title,
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