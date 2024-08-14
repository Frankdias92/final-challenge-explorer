import { api } from "@/services/api";
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { UseAuth, User } from "./auth";
import { Item } from "@radix-ui/react-select";

interface CartProviderProps {
    children: ReactNode
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
export type addDisheOnCartProps = {
    user_id: number
    meal_id: number
    quantity: number
}

interface CartContextProps {
    addDisheOnCart: ( arg: addDisheOnCartProps ) => void
    RemoveDisheOnCart: ( art_item_id: number ) => void
    RemoveOrderId: (order_item_id: number) => void
    showGroupedCartItems: CartProps[] | []
    groupedCartItems: CartProps[] | null
    totalCartQuantity: number | 0
    totalCartPrice: number | 0
    totalPrice: number | 0
    cart: CartProps[] | null
}

export const CartContext = createContext<CartContextProps>({
    addDisheOnCart: () => {},
    RemoveDisheOnCart: () => {},
    RemoveOrderId: () => {},
    groupedCartItems: null,
    cart: null,
    totalPrice: 0,
    totalCartQuantity: 0,
    totalCartPrice: 0,
    showGroupedCartItems: [],
})

function CartProvider({ children }: CartProviderProps) {
    const [cart, setCart] = useState<CartProps[] >([])
    const [totalCartQuantity, setTotalCartQuantity] = useState<number>(0)
    const [totalCartPrice, setTotalCartPrice] = useState<number>(0)
    const [showGroupedCartItems, setShowGroupedCartItems] = useState<CartProps[] >([])

    const { user } = UseAuth()
    
    const fetchCart = useCallback(async (data_id: number) => {
        try {
            if (user) {
                if (data_id) {
                    const response = await api.get(`/cart/${data_id}`)
                    setCart(response.data)
                }
            } else console.log("You are not logget")
        } catch (error) {
            console.error("Error fetching cart: ", error)
        }
    }, [user])
    const addDisheOnCart = useCallback(async ({ user_id, meal_id, quantity }: addDisheOnCartProps) => {
        try {
            if (user_id && meal_id && quantity > 0) {
                // Verifique se o item já está no carrinho
                const existingItem = cart.find(item => item.meal_id === meal_id);
                let updatedCart: CartProps[];
    
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
                    updatedCart = [...cart, {
                        ...response.data,
                        price: Number(response.data)
                    }];
                    return updatedCart
                }
    
                // Atualize o estado do carrinho com o carrinho atualizado
                setCart( updatedCart )
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

        return filteredCartItems;
    }
    const groupedCartItems = getFilteredCartItems(cart)
    const totalPrice = Number(groupedCartItems.reduce((sum, item) => sum + item.price, 0).toFixed(2))

    


    useEffect(() => {
        if (user) {
            console.log('fetch cart', user.id)
            fetchCart(user.id)
        }
    }, [fetchCart, user])

    useEffect(() => {
        const calculateTotals = () => {
            const totalPrc = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
            const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
            setTotalCartQuantity(totalQty);
            setTotalCartPrice(totalPrc);
        }
        
        if (Array.isArray(cart)) {
            calculateTotals();
            setShowGroupedCartItems(getFilteredCartItems(cart));
        } else {
            console.error('Cart is not an array: ', cart);
        }
        console.log('print cart', cart)
    }, [cart]);


    return (
        <CartContext.Provider
            value={{
                addDisheOnCart,
                RemoveDisheOnCart,
                RemoveOrderId,
                cart,
                groupedCartItems,
                totalPrice,
                totalCartQuantity,
                totalCartPrice,
                showGroupedCartItems
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

function useCart() {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error('use Cart must be used within a cartProvider')
    }
    return context
}

export {CartProvider, useCart}