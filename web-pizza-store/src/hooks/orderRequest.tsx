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
export type addDisheOnCartProps = {
    user_id: number
    meal_id: number
    quantity: number
}


interface OrderContextProps {
    orders: OrderProps[] | null
    orderItems: OrderItemProps[] | null
    handleFetchMeals: (productsList: ProductProps[]) => void
    fetchOrders: () => void
    fetchOrderItems: (order_id: number) => void
    addDisheOnCart: ( arg: addDisheOnCartProps ) => void
    RemoveDisheOnCart: ( cart_item_id: number ) => void
    cart: CartProps[] | null
    ingredients: string[]
    groupedCartItems: CartProps[] | null
    totalPrice: number | 0
    RemoveOrderId: (order_item_id: number) => void
    totalCartQuantity: number | 0
    totalCartPrice: number | 0
    showGroupedCartItems: CartProps[]
    DeleteMealId: (meal_id: number) => void
    meals: ProductProps[] | null
}

export const OrderContext = createContext<OrderContextProps>({
    orders: null,
    orderItems: null,
    handleFetchMeals: () => {},
    fetchOrders: () => {},
    fetchOrderItems: () => {},
    addDisheOnCart: () => {},
    RemoveDisheOnCart: () => {},
    cart: null,
    ingredients: [],
    groupedCartItems: null,
    totalPrice: 0,
    RemoveOrderId: () => {},
    totalCartQuantity: 0,
    totalCartPrice: 0,
    showGroupedCartItems: [],
    DeleteMealId: () => {},
    meals: null,
})

function OrdersProvider({ children }: any) {
    const [meals, setMeals] = useState<ProductProps[]>([])
    const [orders, setOrders] = useState<OrderProps[] | null>(null)
    const [orderItems, setOrderItems] = useState<OrderItemProps[]>([])
    const [cart, setCart] = useState<CartProps[] >([])
    const [ingredients, setIngredients] = useState<string[]> ([])
    const [totalCartQuantity, setTotalCartQuantity] = useState<number>(0)
    const [totalCartPrice, setTotalCartPrice] = useState<number>(0)
    const [showGroupedCartItems, setShowGroupedCartItems] = useState<CartProps[] >([])
    const router = useRouter()

    const handleFetchMeals = useCallback(async(productsList: ProductProps[]) => {
        setMeals(productsList)
    }, [])
    
    // CART
    const fetchCart = useCallback(async (data_id: number) => {
        const verifyIfExistUser = localStorage.getItem('@estock:user')
        try {
            if (verifyIfExistUser) {
                if (!data_id) {
                    const response = await api.get(`/cart/${data_id}`)
                    setCart(response.data)
                } else {
                    return 
                }
            } else console.log("You are not logget")
        } catch (error) {
            console.error("Error fetching cart: ", error)
        }
    }, [])

    const addDisheOnCart = useCallback(async ({ user_id, meal_id, quantity }: addDisheOnCartProps) => {
        try {
            if (user_id && meal_id && quantity > 0) {
                // Verifique se o item já está no carrinho
                const existingItem = cart.find(item => item.meal_id === meal_id);
                let updatedCart;
    
                if (existingItem) {
                    // Se o item já está no carrinho, apenas atualize a quantidade
                    updatedCart = cart.map(item =>
                        item.meal_id === meal_id ? { ...item, quantity: item.quantity + quantity } : item
                    );
                } else {
                    // Se o item é novo, adicione-o ao carrinho
                    const response = await api.post(`/cart`, {
                        user_id,
                        meal_id,
                        quantity
                    });
                    updatedCart = [...cart, response.data];
                }
    
                // Atualize o estado do carrinho com o carrinho atualizado
                setCart(updatedCart);
            } else {
                console.log('Dados inválidos para adicionar ao carrinho.');
            }
        } catch (error: any) {
            console.error(error.response?.data?.message || 'Erro ao adicionar prato ao carrinho: ', error);
        }
    }, [cart]);
    const RemoveDisheOnCart = useCallback(async (cart_item_id: number) => {
        try {
            if (cart_item_id) {
                await api.delete(`/cart/${cart_item_id}`)
                setCart(prevCart => prevCart?.filter(item => item.cart_item_id !== cart_item_id) || null)

                const user = localStorage.getItem('@estock:user')

                if (user) {
                    const { id } = JSON.parse(user)
                    if (!id) {
                        console.log('passei por aqui')
                        fetchCart(id)
                    }
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
    
    // useEffect(() => {

    //     if(userId){
    //         console.log('print user cart', userId[0])
    //         // fetchCart(Number(userId))
    //     }
    // }, [fetchCart, cart])

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
        if (Array.isArray(cart)) {
            const calculateTotals = () => {
                const totalPrc = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
                const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
                setTotalCartQuantity(totalQty);
                setTotalCartPrice(totalPrc);
                // console.log('print test', cart)
            }
            calculateTotals()
        }
    
        if (Array.isArray(cart)) {
            setShowGroupedCartItems(getFilteredCartItems(cart));
        } else {
            console.error('Cart is not an array: ', cart);
        }
    }, [cart]);
    
      
    
    const groupedCartItems = getFilteredCartItems(cart)
    const totalPrice = Number(groupedCartItems.reduce((sum, item) => sum + item.price, 0).toFixed(2))

    useEffect(() => {
        const user = localStorage.getItem('@estock:user')
        if (user) {
            const { id } = JSON.parse(user)
            console.log('passei por aqui linha 261')
            fetchOrders()
            fetchCart(id)
        }
        
    }, [fetchCart, fetchOrders])

    return (
        <OrderContext.Provider
            value={{
                orders,
                orderItems,
                handleFetchMeals,
                fetchOrders,
                fetchOrderItems,
                addDisheOnCart,
                RemoveDisheOnCart,
                cart,
                ingredients,
                groupedCartItems,
                totalPrice,
                RemoveOrderId,
                totalCartQuantity,
                totalCartPrice,
                showGroupedCartItems,
                DeleteMealId,
                meals
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