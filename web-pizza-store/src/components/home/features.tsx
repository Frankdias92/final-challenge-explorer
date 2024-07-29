'use client'

import { useEffect, useState } from "react";
import { ListProductsFeatures } from "./listProdutsFeatures";

import Slider from "react-slick"
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import axios from "axios";

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
                const response = await axios.get('http://localhost:3333/meals/index')
                
                if (response) {
                    setData(response.data)
                }
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

                    {data && data.map(item => {
                        return (
                            (data && 
                                <div className="flex px-4 z-0" key={item.meal_id}>
                                    <ListProductsFeatures
                                        meal_id={item.meal_id}
                                        title={item.name}
                                        description={item.description}
                                        ingredients={item.ingredients}
                                        price={item.price}
                                        image={item.productImg}
                                    />
                                </div>
                            )
                        )
                    })}
                
            </Slider>

            <div className="hidden lg:flex bg-gradient-to-r from-dark-700 to-dark-700/0 w-[233px] h-full absolute left-0 top-0 z-10 pointer-events-none"/>
            <div className="hidden md:flex bg-gradient-to-l from-dark-700 to-dark-700/0 w-[233px] h-full absolute right-0 top-0 z-10 pointer-events-none"/>
        </div>
    )
}