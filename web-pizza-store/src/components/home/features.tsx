import { useRef } from "react";
import { ListProductsFeatures } from "./listProdutsFeatures";
import Slider from "react-slick"


interface FeaturesProps {
    section: string
}

export function Features({ section }: FeaturesProps) {
    const sliderRef = useRef<Slider | null>(null)

    const products = [
        {
            id: 1,
            image: "Mask%20group-6.png",
            title: "Salada Ravanello",
            price: "49,97",
            amount: "1"
        },
        {
            id: 2,
            image: "Mask%20group-1.png",
            title: "Salada Ravanello",
            price: "49,97",
            amount: "1"
        },
        {
            id: 3,
            image: "Mask%20group-2.png",
            title: "Salada Ravanello",
            price: "49,97",
            amount: "1"
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
                    className="flex justify-center w-full h-full gap-4 overflow-hidden translate-x-7 z-0"
                >
           
                        {products.map(item => {
                            return (
                                <div className="flex gap-4 z-10" key={item.id}>
                                    <ListProductsFeatures
                                        image={item.image}
                                        title="Salada Ravanello"
                                        price="49,97"
                                        amount="1"
                                    />
                                </div>
                            )
                        })}

                </Slider>

        </div>
    )
}