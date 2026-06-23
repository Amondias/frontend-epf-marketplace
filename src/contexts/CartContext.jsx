import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export default function CartProvider({ children }) {

    const [cart, setCart] = useState([]);

    useEffect(() => {

        const savedCart = localStorage.getItem("cart");

        if (savedCart) {

            setCart(JSON.parse(savedCart));

        }

    }, []);

    useEffect(() => {

        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );

    }, [cart]);

    const addToCart = (product) => {

        const existingProduct = cart.find(
            item => item.id === product.id
        );

        if (existingProduct) {

            const updatedCart = cart.map(item =>
                item.id === product.id
                    ? {
                          ...item,
                          quantity:
                              item.quantity + 1,
                      }
                    : item
            );

            setCart(updatedCart);

        } else {

            setCart([
                ...cart,
                {
                    ...product,
                    quantity: 1,
                },
            ]);
        }
    };

    const removeFromCart = (id) => {

        setCart(
            cart.filter(
                item => item.id !== id
            )
        );
    };

    const increaseQuantity = (id) => {

        setCart(
            cart.map(item =>
                item.id === id
                    ? {
                          ...item,
                          quantity:
                              item.quantity + 1,
                      }
                    : item
            )
        );
    };

    const decreaseQuantity = (id) => {

        setCart(
            cart.map(item =>
                item.id === id
                    ? {
                          ...item,
                          quantity:
                              Math.max(
                                  1,
                                  item.quantity - 1
                              ),
                      }
                    : item
            )
        );
    };

    const clearCart = () => {

        setCart([]);

    };

    const total = cart.reduce(
        (sum, item) =>
            sum +
            item.price * item.quantity,
        0
    );

    return (
        <CartContext.Provider
            value={{
                cart,
                total,
                addToCart,
                removeFromCart,
                increaseQuantity,
                decreaseQuantity,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}