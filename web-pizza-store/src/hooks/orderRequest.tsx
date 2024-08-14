import { api } from "@/services/api";
import { useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

interface OrderProps {
    order_id: number;
    order_date: string;
    total_price: number;
    user_id: number;
}

export interface ProductProps {
    meal_id: number
    name: string
    description: string
    ingredients: string[]
    category: string
    price: number
    productImg: string
}
interface OrderItemProps {
    order_item_id: number
    order_id: number
    meal_id: number
    quantity: number
}

interface OrderContextProps {
    orders: OrderProps[] | null
    orderItems: OrderItemProps[] | null
    handleFetchMeals: (productsList: ProductProps[]) => void
    fetchOrders: () => void
    fetchOrderItems: (order_id: number) => void
    ingredients: string[]
    DeleteMealId: (meal_id: number) => void
    meals: ProductProps[] | null
}

export const OrderContext = createContext<OrderContextProps>({
    orders: null,
    orderItems: null,
    handleFetchMeals: () => {},
    fetchOrders: () => {},
    fetchOrderItems: () => {},
    ingredients: [],
    DeleteMealId: () => {},
    meals: null,
})

function OrdersProvider({ children }: any) {
    const [meals, setMeals] = useState<ProductProps[]>([])
    const [orderItems, setOrderItems] = useState<OrderItemProps[]>([])
    const [ingredients, setIngredients] = useState<string[]> ([])
    
    const [orders, setOrders] = useState<OrderProps[] | null>(null)

    const router = useRouter()

    const handleFetchMeals = useCallback(async(productsList: ProductProps[]) => {
        setMeals(productsList)
    }, [])
 
    // Orders
    const fetchOrders = useCallback(async () => {
        const user = localStorage.getItem("@estock:user")
        try {
            if (!user) {
                const response = await api.get('/orders')
                setOrders(response.data)
            } else return
        } catch (error) {
            console.error("Error fetching orders: ", error)
        }
    }, [])

    // order_request
    const fetchOrderItems = useCallback(async (order_id: number) => {
        try {
            if (order_id) {
                const response = await api.get(`/order_request/${order_id}`)
                setOrderItems(response.data)
            }
        } catch (error) {
            console.error('Error fetching order items: ', error)
        }
    }, [])

    //meal_id
    const DeleteMealId = useCallback(async (meal_id: number) => {
        try {
            const response = await api.delete(`/meals/${meal_id}`)
            console.log(response.data)
            if (response) {
                router.push('/')
            }
        } catch (error: any) {
            console.error(error.response.data.message)
        }
    }, [router])
 
    useEffect(() => {
        const user = localStorage.getItem('@estock:user')
        if (user) {
            const { id } = JSON.parse(user)
            fetchOrders()
        }
        
    }, [ fetchOrders])

    return (
        <OrderContext.Provider
            value={{
                handleFetchMeals,
                fetchOrderItems,
                DeleteMealId,
                fetchOrders,
                orderItems,
                ingredients,
                orders,
                meals,
            }}
        >
            {children}
        </OrderContext.Provider>
    )
}

function useOrders() {
    const context = useContext(OrderContext)
    return context
}

export { OrdersProvider, useOrders }