import { useNavigate } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";

import CartItem from "../../components/cart/CartItem";
import CartSummary from "../../components/cart/CartSummary";

import useCart from "../../hooks/useCart";

export default function Cart() {

    const navigate = useNavigate();

    const {
        cart,
        total,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart
    } = useCart();

    return (
        <MainLayout>

            <h1 className="text-3xl font-bold mb-6">
                Mon panier
            </h1>

            <div className="grid md:grid-cols-3 gap-6">

                <div className="md:col-span-2 space-y-4">

                    {cart.map(item => (
                        <CartItem
                            key={item.id}
                            item={item}
                            onIncrease={
                                increaseQuantity
                            }
                            onDecrease={
                                decreaseQuantity
                            }
                            onRemove={
                                removeFromCart
                            }
                        />
                    ))}

                </div>

                <CartSummary
                    total={total}
                    onCheckout={() =>
                        navigate(
                            "/checkout"
                        )
                    }
                />

            </div>

        </MainLayout>
    );
}