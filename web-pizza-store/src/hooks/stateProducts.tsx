'use client'

import { createContext, useContext, useEffect, useState } from "react"

export interface Product {
    amount: number
}

interface ProductsContextProps {
    updateProduct: (product: UpdateProductProps) => void
    product: Product | null
    card: CardAmountProps | null
    handleUpdateCard: (card: CardAmountProps) => void
}

interface UpdateProductProps {
    product: {
        amount: number
    }
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
    const [data, setData] = useState<{ product: Product | null}>({ product: null })
    const [card, setCard] = useState<CardAmountProps | null>(null)
    
    console.log(data.product)

    function updateProduct({ product }: UpdateProductProps) {
        try {
            if (product) {
                setData({ product: product})
            }
        } catch (error) {
            if (error) {
                alert('Something wrong with update product')
            }
        }
    }

    function handleUpdateCard({ card }: CardAmountProps) {
        try {
            setCard({ card: data.product})
        } catch (error) {
            alert('Something went wrong with updating the card amount')
        }
    }
    console.log('card: ', card)

    // useEffect(() => {
    //     function handleUpdateCard() {
    //         try {
    //             if (data) {
    //                 // setCard({ card: data.product?.amount })
    //             }
    //         } catch (error) {
    //             alert('Something went wrong with updating the card amount')
    //         }
    //     }
    //     handleUpdateCard()
    // }, [data])
    
    
    

    return (
        <ProductsContext.Provider value={{
            updateProduct,
            product: data.product,
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