import { createContext, useCallback, useEffect, useState } from "react";
import cartService from "../services/cartService";
import useAuth from "../hooks/useAuth";

export const CartContext = createContext();

export default function CartProvider({ children }) {
    const { user } = useAuth();
    const [cart, setCart] = useState([]);
    const [summary, setSummary] = useState({
        total: "0.00",
        item_count: 0,
    });
    const [loading, setLoading] = useState(false);

    const refreshCart = useCallback(async () => {
        if (!localStorage.getItem("token")) {
            setCart([]);
            setSummary({ total: "0.00", item_count: 0 });
            return;
        }

        setLoading(true);
        try {
            const response = await cartService.getCart();
            setCart(response.items || []);
            setSummary({
                total: response.total || "0.00",
                item_count: response.item_count || 0,
            });
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        refreshCart().catch(() => {});
    }, [refreshCart]);

    useEffect(() => {
        if (!user) {
            setCart([]);
            setSummary({ total: "0.00", item_count: 0 });
            return;
        }

        refreshCart().catch(() => {});
    }, [user, refreshCart]);

    const addToCart = async (product, quantity = 1) => {
        const productId = typeof product === "object" ? product.id : product;
        await cartService.addToCart({
            product_id: productId,
            quantity,
        });
        await refreshCart();
    };

    const removeFromCart = async (id) => {
        await cartService.removeItem(id);
        await refreshCart();
    };

    const updateQuantity = async (id, quantity) => {
        await cartService.updateItem(id, { quantity });
        await refreshCart();
    };

    const increaseQuantity = async (id) => {
        const item = cart.find((row) => row.id === id);
        if (item) {
            await updateQuantity(id, item.quantity + 1);
        }
    };

    const decreaseQuantity = async (id) => {
        const item = cart.find((row) => row.id === id);
        if (item) {
            await updateQuantity(id, Math.max(1, item.quantity - 1));
        }
    };

    const clearCart = async () => {
        await cartService.clearCart();
        setCart([]);
        setSummary({ total: "0.00", item_count: 0 });
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                total: summary.total,
                itemCount: summary.item_count,
                loading,
                refreshCart,
                addToCart,
                removeFromCart,
                updateQuantity,
                increaseQuantity,
                decreaseQuantity,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}
