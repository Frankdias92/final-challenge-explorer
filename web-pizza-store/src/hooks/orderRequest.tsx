import { api } from "@/services/api";
import { createContext, useContext, useEffect, useState } from "react";

interface OrdersProps {
    order_id: number
    order_date: string
    total_price: number
    user_id: number
}
// interface OrderRequestProps {

// }

interface OrderContextProps {
    orders: OrdersProps | null
    orderRequest: any | null
    fetchOrderRequests: (order_id: number) => void
}

export const OrderContext = createContext<OrderContextProps>({
    orders: null,
    orderRequest: null,
    fetchOrderRequests: () => {}
})

function OrdersProvider({ children }: any) {
    const [data, setData] = useState<{ 
        orders: OrdersProps | null,
        orderRequest:  OrdersProps | null
    }>({ orders: null, orderRequest: null })
    const [orderRequests, setOrderRequests] = useState([])

    async function fetchOrders() {
        const response = await api.get('/orders', { withCredentials: true })
        const data = response.data.orders
        setData((prevData) => ({
            ...prevData,
            orders: data[0]
        }))
    }

    async function fetchOrderRequests(order_id: number) {
        try {
            const response = await api.get(`/orders_request/${order_id}`, { withCredentials: true })
            const data = response.data
            setData((prevData) => ({
                ...prevData,
                orderRequest: data
            }))
            console.log('test order_request', response.data)
        } catch (error: any) {
            console.error(error.response.data.message)
        }
        
    }


    useEffect(() => {
        fetchOrders()
        fetchOrderRequests()
    }, [])

    return (
        <OrderContext.Provider
            value={{
                orders: data.orders,
                orderRequest: data.orderRequest,
                fetchOrderRequests
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