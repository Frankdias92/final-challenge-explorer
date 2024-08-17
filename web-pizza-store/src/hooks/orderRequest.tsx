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
    cart_item_id: number;
    user_id: number;
    meal_id: number;
    quantity: number;
    name: string;
    description: string;
    price: number;
    category: string;
}

export interface ProductProps {
    meal_id: number;
    name: string;
    description: string;
    ingredients: string[];
    category: string;
    price: number;
    productImg: string;
}

interface OrderItemProps {
    order_item_id: number;
    order_id: number;
    meal_id: number;
    quantity: number;
}

export type addDisheOnCartProps = {
    user_id: number;
    meal_id: number;
    quantity: number;
}

interface OrderContextProps {
    orders: OrderProps[] | null;
    orderItems: OrderItemProps[] | null;
    handleFetchMeals: (productsList: ProductProps[]) => void;
    fetchOrders: () => void;
    fetchOrderItems: (order_id: number) => void;
    addDisheOnCart: (arg: addDisheOnCartProps) => void;
    RemoveDisheOnCart: (cart_item_id: number) => void;
    cart: CartProps[] | null;
    ingredients: string[];
    cartSummary: {
        totalQuantity: number;
        totalPrice: number;
        groupedItems: CartProps[];
    };
    DeleteMealId: (meal_id: number) => void;
    meals: ProductProps[] | null;
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
    cartSummary: {
        totalQuantity: 0,
        totalPrice: 0,
        groupedItems: []
    },
    DeleteMealId: () => {},
    meals: null,
});

function OrdersProvider({ children }: any) {
    const [meals, setMeals] = useState<ProductProps[]>([]);
    const [orders, setOrders] = useState<OrderProps[] | null>(null);
    const [orderItems, setOrderItems] = useState<OrderItemProps[]>([]);
    const [cart, setCart] = useState<CartProps[]>([]);
    const [ingredients, setIngredients] = useState<string[]>([]);
    const [cartSummary, setCartSummary] = useState({
        totalQuantity: 0,
        totalPrice: 0,
        groupedItems: [] as CartProps[]
    });

    const router = useRouter();

    const handleFetchMeals = useCallback(async (productsList: ProductProps[]) => {
        setMeals(productsList);
    }, []);

    // Meal Deletion
    const DeleteMealId = useCallback(async (meal_id: number) => {
        try {
            const response = await api.delete(`/meals/${meal_id}`);
            if (response) {
                router.push('/');
            }
        } catch (error: any) {
            console.error(error.response.data.message);
        }
    }, [router]);

    // Fetch Cart
    const fetchCart = useCallback(async (data_id: number) => {
        try {
            if (data_id) {
                const response = await api.get(`/cart/${data_id}`);
                setCart(response.data);
            }
        } catch (error) {
            console.error("Error fetching cart: ", error);
        }
    }, []);

    const addDisheOnCart = useCallback(async ({ user_id, meal_id, quantity }: addDisheOnCartProps) => {
        try {
            const response = await api.post(`/cart`, { user_id, meal_id, quantity });
            setCart(prevCart => [...prevCart, response.data]);
        } catch (error) {
            console.error('Erro ao adicionar prato ao carrinho: ', error);
        }
        fetchCart(user_id)
    }, [fetchCart]);

    const RemoveDisheOnCart = useCallback(async (cart_item_id: number) => {
        try {
            if (cart_item_id) {
                await api.delete(`/cart/${cart_item_id}`);
                setCart(prevCart => prevCart?.filter(item => item.cart_item_id !== cart_item_id) || []);

                const user = localStorage.getItem('@estock:user');
                if (user) {
                    const { id } = JSON.parse(user);
                    if (id) {
                        fetchCart(id);
                    }
                }
            }
        } catch (error) {
            console.error('Error removing the item: ', error);
        }
    }, [fetchCart]);

    const getFilteredCartItems = (cart: CartProps[]): CartProps[] => {
        return cart.reduce((acc, item) => {
            const existingItem = acc.find((i) => i.meal_id === item.meal_id);
            if (existingItem) {
                existingItem.quantity += item.quantity;
            } else {
                acc.push({ ...item });
            }
            return acc;
        }, [] as CartProps[]);
    };

    useEffect(() => {
        if (cart) {
            const groupedItems = getFilteredCartItems(cart);
            const totalQty = groupedItems.reduce((sum, item) => sum + item.quantity, 0);
            const totalPrc = groupedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
            
            setCartSummary({
                totalQuantity: totalQty,
                totalPrice: totalPrc,
                groupedItems: groupedItems
            });
        } else {
            console.error('Cart is not an array: ', cart);
        }
    }, [cart]);

    // Orders
    const fetchOrders = useCallback(async () => {
        try {
            const response = await api.get('/orders');
            setOrders(response.data);
        } catch (error) {
            console.error("Error fetching orders: ", error);
        }
    }, []);

    // Order Items
    const fetchOrderItems = useCallback(async (order_id: number) => {
        try {
            const response = await api.get(`/order_items/${order_id}`);
            setOrderItems(response.data);
        } catch (error) {
            console.error('Error fetching order items: ', error);
        }
    }, []);

    useEffect(() => {
        const user = localStorage.getItem('@estock:user');
        if (user) {
            const { id } = JSON.parse(user);
            if (id) {
                fetchOrders();
                // fetchCart(id);
                console.log('if user fetchCart')
            }
        }
    }, [fetchCart, fetchOrders]);

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
                cartSummary,
                DeleteMealId,
                meals
            }}
        >
            {children}
        </OrderContext.Provider>
    );
}

function useOrders() {
    const context = useContext(OrderContext);
    return context;
}

export { OrdersProvider, useOrders };
