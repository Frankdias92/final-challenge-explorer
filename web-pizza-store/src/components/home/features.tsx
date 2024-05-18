import { ListProductsFeatures } from "./listProdutsFeatures";


export function Features() {

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


    return (
        <div className="flex flex-col w-full h-full justify-center font-poppins text-light-300 antialiased">
            <h3 className="font-medium text-lg ">Section Name</h3>

            <div className="flex w-full gap-4 overflow-hidden">
                {products.map(item => {
                    return (
                        <ListProductsFeatures
                        key={item.id}
                        image={item.image}
                        title="Salada Ravanello"
                        price="49,97"
                        amount="1"
                        />
                    )
                })}
            </div>
        </div>
    )
}