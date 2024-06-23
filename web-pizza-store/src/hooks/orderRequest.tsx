import { api } from "@/services/api";
import { createContext, useContext, useEffect, useState } from "react";

interface OrdersProps {
    order_id: number
    order_date: string
    total_price: number
    user_id: number
}

interface OrderContextProps {
    orders: OrdersProps | null
}

export const OrderContext = createContext<OrderContextProps>({
    orders: null
})

function OrdersProvider({ children }: any) {
    const [data, setData] = useState<{ 
        orders: OrdersProps | null 
    }>({ orders: null })
    const [orderRequests, setOrderRequests] = useState([])

    async function fetchOrders() {
        const response = await api.get('/orders', { withCredentials: true })
        const data = response.data.orders
        setData({ orders: data[0] })
    }

    async function fetchOrderRequests() {
        const response = await api.get(`/orders_request`, { withCredentials: true })
        const data = response.data.orderItems
        console.log('test oder_request', data[0])
    }


    useEffect(() => {
        fetchOrders()
        fetchOrderRequests()
    }, [])

    return (
        <OrderContext.Provider
            value={{
                orders: data.orders
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