import { api } from "@/services/api";
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
    ingredients: string[]
    // setIngredients: string[] | any
    // handleAddIngredients: (newIngredients: string) => void
    // handleRemoveIngredients: (ingredientToRemove: string) => void
    groupedCartItems: CartProps[] | null
    totalPrice: number | 0
    RemoveOrderId: (order_item_id: number) => void
    totalCartQuantity: number | 0
    totalCartPrice: number | 0
    showGroupedCartItems: CartProps[]
}

export const OrderContext = createContext<OrderContextProps>({
    orders: null,
    orderItems: null,
    fetchOrders: () => {},
    fetchOrderItems: () => {},
    addDisheOnCart: () => {},
    RemoveDisheOnCart: () => {},
    cart: null,
    ingredients: [],
    // setIngredients: [],
    // handleAddIngredients: () => {},
    // handleRemoveIngredients: () => {},
    groupedCartItems: null,
    totalPrice: 0,
    RemoveOrderId: () => {},
    totalCartQuantity: 0,
    totalCartPrice: 0,
    showGroupedCartItems: []
})

function OrdersProvider({ children }: any) {
    const [orders, setOrders] = useState<OrderProps[] | null>(null)
    const [orderItems, setOrderItems] = useState<OrderItemProps[]>([])
    const [cart, setCart] = useState<CartProps[] >([])
    const [ingredients, setIngredients] = useState<string[]> ([])
    const [newIngredientes, setNewIngredientes] = useState<string>('')
    const [totalCartQuantity, setTotalCartQuantity] = useState<number>(0)
    const [totalCartPrice, setTotalCartPrice] = useState<number>(0)
    const [showGroupedCartItems, setShowGroupedCartItems] = useState<CartProps[] >([])

    // const handleAddIngredients = useCallback((ingredients: string) => {
    //     setIngredients(prevState => Array.isArray(ingredients) ? [...prevState, newIngredientes]: [newIngredientes])
    // }, [newIngredientes])
    // const handleRemoveIngredients = useCallback((deleted: string) => {
    //     setIngredients(prevState => prevState.filter(item => item !== deleted))
    // }, [])

    // CART
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
    const addDisheOnCart = useCallback(async ({ user_id, meal_id, quantity }: addDisheOnCartProps) => {
        try {
            const response = await api.post(`/cart`, {
                user_id,
                meal_id: meal_id,
                quantity
            });
            setCart(prevCart => {
                const newCart = [...prevCart, response.data]
                return newCart
            } )
            fetchCart(user_id)
        } catch (error) {
            // console.error('Erro ao adicionar prato ao carrinho: ', error);
        }
    }, [fetchCart]);
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
       const getFilteredCartItems = (cart: CartProps[]): CartProps[] => {
        if (!Array.isArray(cart)) {
            console.error('Cart is not an array: ', cart);
            return [];
        }
    
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
    
        // console.log('Itens do carrinho agrupados:', filteredCartItems);
        return filteredCartItems;
    }; 

    // Orders
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

    // order_items
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



    
    useEffect(() => {
        if (Array.isArray(cart)) {
            const calculateTotals = () => {
                const totalPrc = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
                const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
                setTotalCartQuantity(totalQty);
                setTotalCartPrice(totalPrc);
                console.log('print test', cart)
            }
            calculateTotals()
        }
    
        if (Array.isArray(cart)) {
            // calculateTotals();
            setShowGroupedCartItems(getFilteredCartItems(cart));
        } else {
            // console.error('Cart is not an array: ', cart);
        }
    }, [cart]);
    
      
    
    const groupedCartItems = getFilteredCartItems(cart)
    const totalPrice = Number(groupedCartItems.reduce((sum, item) => sum + item.price, 0).toFixed(2))

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
                ingredients,
                // setIngredients,
                // handleAddIngredients,
                // handleRemoveIngredients,
                groupedCartItems,
                totalPrice,
                RemoveOrderId,
                totalCartQuantity,
                totalCartPrice,
                showGroupedCartItems
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