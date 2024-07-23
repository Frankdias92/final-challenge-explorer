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
    ingredients: string[]
    handleAddIngredients: (newIngredients: string) => void
    handleRemoveIngredients: (ingredientToRemove: string) => void
    groupedCartItems: CartProps[] | null
    totalPrice: string
    RemoveOrderId: (order_item_id: number) => void
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
    HandleWithCurrentStep: () => {},
    ingredients: [],
    handleAddIngredients: () => {},
    handleRemoveIngredients: () => {},
    groupedCartItems: null,
    totalPrice: '0,00',
    RemoveOrderId: () => {}
})

function OrdersProvider({ children }: any) {
    const [orders, setOrders] = useState<OrderProps[] | null>(null)
    const [orderItems, setOrderItems] = useState<OrderItemProps[] | null>(null)
    const [cart, setCart] = useState<CartProps[] | null>(null)
    const [currentStep, setCurrentStep] = useState<number>(1)
    const [ingredients, setIngredients] = useState<string[]> ([])
    const router = useRouter()

    const handleAddIngredients = useCallback((newIngredients: string) => {
        setIngredients(prevState => [...prevState, newIngredients])
    }, [])
    const handleRemoveIngredients = useCallback((ingredientToRemove: string) => {
        setIngredients(prevState => prevState.filter(item => item !== ingredientToRemove))
    }, [])

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

    const RemoveOrderId = useCallback(async (order_item_id: number) => {
        try {
            if (order_item_id) {
                await api.delete(`/order_items/${order_item_id}`)
            }

            const user = localStorage.getItem('@estock:user')

            if (user) {
                const { id } = JSON.parse(user)
                fetchCart(id)
            }
        } catch (error) {
            console.error('Error ao deletar ordem')
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

    const getFilteredCartItems = (cart: CartProps[]): CartProps[] => {
        const filteredCartItems = cart.reduce((acc, item) => {
            const existingItem = acc.find((i) => i.meal_id === item.meal_id);
            if (existingItem) {
                existingItem.quantity += item.quantity;
                existingItem.price += item.price * item.quantity;
            } else {
                acc.push({ ...item, price: item.price * item.quantity });
            }
            return acc;
        }, [] as CartProps[]);

        return filteredCartItems;
    }
    const groupedCartItems = cart ? getFilteredCartItems(cart) : [];
    const totalPrice = groupedCartItems.reduce((sum, item) => sum + item.price, 0).toFixed(2);

    

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
                HandleWithCurrentStep,
                ingredients,
                handleAddIngredients,
                handleRemoveIngredients,
                groupedCartItems,
                totalPrice,
                RemoveOrderId
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