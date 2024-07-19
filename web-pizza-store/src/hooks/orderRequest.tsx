import { api } from "@/services/api";
import { useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

interface OrderProps {
    order_id: number;
    order_date: string;
    total_price: number;
    user_id: number;
}
export interface CartProps {
    cart_item_id: number
    user_id: number
    meal_id: number
    quantity: number
    name: string
    description: string
    price: number
    category: string
}
interface OrderItemProps {
    order_item_id: number
    order_id: number
    meal_id: number
    quantity: number
}
export type addDisheOnCartProps = {
    user_id: number
    meal_id: number
    quantity: number
}

interface OrderContextProps {
    orders: OrderProps[] | null
    orderItems: OrderItemProps[] | null
    fetchOrders: () => void
    fetchOrderItems: (order_id: number) => void
    addDisheOnCart: ( arg: addDisheOnCartProps ) => void
    RemoveDisheOnCart: ( cart_item_id: number ) => void
    cart: CartProps[] | null
    currentStep: number | 1
    HandleWithCurrentStep: (step: number) => void
}

export const OrderContext = createContext<OrderContextProps>({
    orders: null,
    orderItems: null,
    fetchOrders: () => {},
    fetchOrderItems: () => {},
    addDisheOnCart: () => {},
    RemoveDisheOnCart: () => {},
    cart: null,
    currentStep: 1,
    HandleWithCurrentStep: () => {}
})

function OrdersProvider({ children }: any) {
    const [orders, setOrders] = useState<OrderProps[] | null>(null)
    const [orderItems, setOrderItems] = useState<OrderItemProps[] | null>(null)
    const [cart, setCart] = useState<CartProps[] | null>(null)
    const [currentStep, setCurrentStep] = useState<number>(1)
    const router = useRouter()

    const fetchOrders = useCallback(async () => {
        try {
            const user = localStorage.getItem("@estock:user")
            if (user) {
                const response = await api.get('/orders')
                setOrders(response.data)
            }
        } catch (error) {
            console.error("Error fetching orders: ", error)
        }
    }, [])

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

    const fetchCart = useCallback(async (data_id: number) => {
        try {
            if (data_id) {
                const response = await api.get(`/cart/${data_id}`)
                setCart(response.data)
            }
        } catch (error) {
            console.error("Error fetching cart: ", error)
        }
    }, [])

    const addDisheOnCart = useCallback(async ({user_id, meal_id, quantity}: addDisheOnCartProps) => {
        try {
            const response = await api.post(`/cart`, {
                user_id,
                meal_id: Number(meal_id),
                quantity
            })
            // console.log('print response', response.data)
            setCart(prevCart => prevCart ? [...prevCart, response.data] : [response.data])
        } catch (error) {
            console.error('Error fething cart items: ', error)
        }
    }, [])

    const RemoveDisheOnCart = useCallback(async (cart_item_id: number) => {
        try {
            if (cart_item_id) {
                await api.delete(`/cart/${cart_item_id}`)
                setCart(prevCart => prevCart?.filter(item => item.cart_item_id !== cart_item_id) || null)

                const user = localStorage.getItem('@estock:user')

                if (user) {
                    const { id } = JSON.parse(user)
                    fetchCart(id)
                }
            }   
        } catch (error) {
            console.error('Error to removing the item: ', error)
        }
    }, [fetchCart])

    const HandleWithCurrentStep = useCallback((step: number) => {
        if (step === 0) {
            setCurrentStep(1)
            router.push('/checkout')
        } else if (step === 1) {
            setCurrentStep(2)
            router.push('/checkout/delivery')
        } else if (step === 2) {
            setCurrentStep(3)
            router.push('')
        }
    }, [router])

    useEffect(() => {
        const user = localStorage.getItem('@estock:user')
        if (user) {
            const { id } = JSON.parse(user)
            fetchOrders()
            fetchCart(id)
        }
    }, [fetchCart, fetchOrders])

    return (
        <OrderContext.Provider
            value={{
                orders,
                orderItems,
                fetchOrders,
                fetchOrderItems,
                addDisheOnCart,
                RemoveDisheOnCart,
                cart,
                currentStep,
                HandleWithCurrentStep
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