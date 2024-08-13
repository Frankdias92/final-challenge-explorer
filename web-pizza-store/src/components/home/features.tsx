'use client'

import { ListProductsFeatures } from "./listProdutsFeatures";

import Slider from "react-slick"
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useOrders } from "@/hooks/orderRequest";
import { useCallback, useEffect, useState } from "react";

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
    const { meals, handleFetchMeals } = useOrders()

    const fethMeals = useCallback(async() => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_DB}/meals/index`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            handleFetchMeals(data);
        } catch (error: any) {
            console.error('Erro fetch meals:', error.message);
        }
    }, [handleFetchMeals]);

    useEffect(() => {
        fethMeals()
    }, [fethMeals])
    
    
    // - Slider configs
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

                    {meals  && (
                        meals.map(item => {
                            return (
                                (meals && 
                                    <div className="flex px-4 z-0 " key={item.meal_id}>
                                        <ListProductsFeatures
                                            meal_id={item.meal_id}
                                            title={item.name || 'Sample'}
                                            description={item.description}
                                            ingredients={item.ingredients}
                                            price={item.price}
                                            image={item.productImg}
                                        />
                                    </div>
                            )
                            )
                        }) )
}
{/* : ( 
                        <div className="flex px-4 z-0 " key={1}>
                        <ListProductsFeatures
                            meal_id={1}
                            title={'Sample'}
                            description={'sample test'}
                            ingredients={['test']}
                            price={0}
                            image={ `${process.env.BLUR_DATA}`}
                        />
                    </div>
                     )
                }  */}
                
            </Slider>

            <div className="hidden lg:flex bg-gradient-to-r from-dark-700 to-dark-700/0 w-[233px] h-full absolute left-0 top-0 z-10 pointer-events-none"/>
            <div className="hidden md:flex bg-gradient-to-l from-dark-700 to-dark-700/0 w-[233px] h-full absolute right-0 top-0 z-10 pointer-events-none"/>
        </div>
    )
}