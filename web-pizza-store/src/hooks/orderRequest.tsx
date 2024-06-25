import { api } from "@/services/api";
import { createContext, useContext, useEffect, useState } from "react";

interface OrderProps {
    order_id: number;
    order_date: string;
    total_price: number;
    user_id: number;
}

interface OrderItemProps {
    order_item_id: number
    order_id: number
    meal_id: number
    quantity: number
}
type addDisheOnCartProps = {
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
}

export const OrderContext = createContext<OrderContextProps>({
    orders: null,
    orderItems: null,
    fetchOrders: () => {},
    fetchOrderItems: () => {},
    addDisheOnCart: () => {}
})

function OrdersProvider({ children }: any) {
    const [orders, setOrders] = useState<OrderProps[] | null>(null)
    const [orderItems, setOrderItems] = useState<OrderItemProps[] | null>(null)

    async function fetchOrders() {
        try {
            const user = localStorage.getItem("@estock:user")
            if (user) {
                const response = await api.get('/orders', { withCredentials: true })
                setOrders(response.data)
            }
        } catch (error) {
            console.error("Error fetching orders: ", error)
        }
    }

    async function fetchOrderItems(order_id: number) {
        try {
            if (order_id) {
                const response = await api.get(`/orders_request/${order_id}`, { withCredentials: true })
                setOrderItems(response.data)
            }
        } catch (error: any) {
            console.error('Error fetching order items:', error)
        }
    }

    async function addDisheOnCart({ user_id, meal_id, quantity }: addDisheOnCartProps) {
        try {
            const response = await api.post(`/cart`, {
                user_id,
                meal_id: Number(meal_id),
                quantity
            })
            console.log('print response', response.data)
        } catch (error) {
            console.error('Error fetching cart items: ', error)
        }
    }

    useEffect(() => {
        fetchOrders()
    }, [])

    return (
        <OrderContext.Provider
            value={{
                orders,
                orderItems,
                fetchOrders,
                fetchOrderItems,
                addDisheOnCart,
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