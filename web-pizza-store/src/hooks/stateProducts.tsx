'use client'

import { createContext, useContext, useEffect, useState } from "react"

export interface Product {
    id: number,
    image: string 
    title: string 
    price: string 
    amount: string
    link: string
}

interface ProductsContextProps {
    updateProduct: (product: UpdateProductProps) => void
    product: Product | null
    card: CardAmountProps | null
    handleUpdateCard: (card: CardAmountProps) => void
}

interface UpdateProductProps {
    id: number
    image: string 
    title: string 
    price: string 
    amount: string
    link: string
}

interface CardAmountProps {
    card: number
}


export const ProductsContext = createContext<ProductsContextProps>({
    updateProduct: () => {},
    product: null,
    card: null,
    handleUpdateCard: () => {}
})




function ProductProvider({children}: any) {
    const [product, setProduct] = useState<Product | null>(null)
    const [card, setCard] = useState<CardAmountProps | null>(null)
    
    console.log('card', card)

    function updateProduct(updatedProduct: Product) {
        try {
            if (updatedProduct) {
                setProduct(updatedProduct)
                console.log('something')
            }
        } catch (error) {
            if (error) {
                alert('Something wrong with update product')
            }
        }
    }

    function handleUpdateCard({ card }: CardAmountProps) {
        try {
            setCard({ card: card})
        } catch (error) {
            alert('Something went wrong with updating the card amount')
        }
    }
    

    return (
        <ProductsContext.Provider value={{
            updateProduct,
            product,
            card,
            handleUpdateCard,
        }}>
            {children}
        </ProductsContext.Provider>
    )
}

function useProducts() {
    const context = useContext(ProductsContext)

    if (!context) {
        throw new Error('useProducts must be used within a ProductProvider')
    }
    return context
}

export { ProductProvider, useProducts }