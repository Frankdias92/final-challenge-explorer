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
    productImg: string
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
    totalCartQuantity: number
    totalCartPrice: number
    totalPrice: number
    cart: CartProps[] | null
    fetchCart: (data_id: number) => void
}

export const CartContext = createContext<CartContextProps>({
    addDisheOnCart: () => {},
    RemoveDisheOnCart: () => {},
    RemoveOrderId: () => {},
    totalPrice: 0,
    groupedCartItems: null,
    cart: null,
    totalCartQuantity: 0,
    totalCartPrice: 0,
    showGroupedCartItems: [],
    fetchCart: () => {}
})

function CartProvider({ children }: CartProviderProps) {
    const [cart, setCart] = useState<CartProps[] >([])
    const [totalCartQuantity, setTotalCartQuantity] = useState<number>(0)
    const [totalCartPrice, setTotalCartPrice] = useState<number>(0)
    const [showGroupedCartItems, setShowGroupedCartItems] = useState<CartProps[] >([])

    const { user } = UseAuth()

    const getFilteredCartItems = useCallback(
        (cart: CartProps[]): CartProps[] => {
            const filteredCartItems = cart.reduce((acc, item) => {
                const existingItem = acc.find(i => i.meal_id === item.meal_id);
                if (existingItem) {
                    existingItem.quantity += item.quantity;
                    existingItem.price += item.price * item.quantity;
                } else {
                    acc.push({ ...item, price: item.price * item.quantity });
                }
                return acc;
            }, [] as CartProps[]);

            return filteredCartItems;
        },
        []
    )
    
    
    const fetchCart = useCallback(async (data_id: number) => {
        try {
            if (user) {
                const response = await api.get(`/cart/${data_id}`)
                setCart(response.data)
            }
        } catch (error) {
            console.error("Error fetching cart: ", error)
        }
    }, [user])

    const addDisheOnCart = useCallback(
        async ({ user_id, meal_id, quantity }: addDisheOnCartProps) => {
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

                    console.log('print order')
                    
                    // Atualize o estado do carrinho com o carrinho atualizado
                    return setCart(updatedCart)
                } else {
                    console.log('Dados inválidos para adicionar ao carrinho.');
                }
                fetchCart(user_id)
            } catch (error: any) {
                console.error(error.response?.data?.message || 'Erro ao adicionar prato ao carrinho: ', error);
            }
    }, [cart, fetchCart]);

    const RemoveDisheOnCart = useCallback(async (cart_item_id: number) => {
        try {
            if (cart_item_id) {
                await api.delete(`/cart/${cart_item_id}`)
                setCart(prevCart => prevCart?.filter(item => item.cart_item_id !== cart_item_id))

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


    const groupedCartItems = getFilteredCartItems(cart)
    const totalPrice = Number(groupedCartItems.reduce((sum, item) => sum + item.price, 0).toFixed(2))


    useEffect(() => {
        if (user) {
            fetchCart(user.id)
        }
        console.log('render first time')
    }, [fetchCart, user])

    useEffect(() => {
        if (cart.length > 0) {
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
            // console.log('checking cart on update', cart)
        }
        // fetchCart(2)
    }, [cart, getFilteredCartItems, fetchCart]);


    return (
        <CartContext.Provider
            value={{
                addDisheOnCart,
                RemoveDisheOnCart,
                RemoveOrderId,
                cart,
                totalCartQuantity,
                totalCartPrice,
                totalPrice,
                groupedCartItems,
                showGroupedCartItems,
                fetchCart
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