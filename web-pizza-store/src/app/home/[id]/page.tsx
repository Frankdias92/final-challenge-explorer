'use client'

import { ListProductsFeatures } from "@/components/home/listProdutsFeatures"
import { useParams } from "next/navigation"
import { useState } from "react"



interface ProductIdProps {
    id: number
}

interface ProductsProps {
    id: number
    image: string
    title: string
    price: string
    amount: string 
}


export default function ProductId({ id }: ProductIdProps) {
    const params = useParams()
    const productId = Number(params.id)

    const products: ProductsProps[] = [
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



    const filteredProductId = products.find(item => item.id === productId)
    const item = filteredProductId


    return (
        <div className="flex w-full min-h-screen text-light-200 bg-dark-700">
             
            <span>text</span>
        </div>
    )
}