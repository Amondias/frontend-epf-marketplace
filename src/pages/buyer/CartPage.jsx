import { Link } from "react-router-dom";
import MainLayout from "../../components/layout/MainLayout";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import useCart from "../../hooks/useCart";
import { formatPrice } from "../pageHelpers";

export default function CartPage() {
    const {
        cart,
        total,
        loading,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
    } = useCart();

    return (
        <MainLayout>
            <div className="mx-auto max-w-5xl px-6 py-10">
                <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-black text-slate-950">Panier</h1>
                        <p className="mt-2 text-slate-600">Votre panier est synchronise avec l'API.</p>
                    </div>
                    {cart.length > 0 && <Button variant="secondary" onClick={clearCart}>Vider le panier</Button>}
                </div>

                {loading && <p>Chargement...</p>}

                {!loading && cart.length === 0 && (
                    <Card className="p-8 text-center">
                        <p className="font-semibold text-slate-950">Votre panier est vide.</p>
                        <Link to="/products" className="mt-4 inline-flex">
                            <Button>Voir les produits</Button>
                        </Link>
                    </Card>
                )}

                <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
                    <div className="space-y-4">
                        {cart.map((item) => (
                            <Card key={item.id} className="p-4">
                                <div className="flex gap-4">
                                    <img
                                        src={item.product?.image}
                                        alt={item.product?.title}
                                        className="h-24 w-24 rounded-xl object-cover"
                                    />
                                    <div className="flex-1">
                                        <h2 className="font-bold text-slate-950">{item.product?.title}</h2>
                                        <p className="mt-1 text-sm text-slate-500">{item.seller?.name}</p>
                                        <p className="mt-2 font-semibold text-indigo-600">{formatPrice(item.subtotal)}</p>
                                        <div className="mt-3 flex flex-wrap items-center gap-2">
                                            <Button variant="secondary" onClick={() => decreaseQuantity(item.id)}>-</Button>
                                            <span className="min-w-8 text-center font-semibold">{item.quantity}</span>
                                            <Button variant="secondary" onClick={() => increaseQuantity(item.id)}>+</Button>
                                            <Button variant="danger" onClick={() => removeFromCart(item.id)}>Retirer</Button>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>

                    {cart.length > 0 && (
                        <Card className="h-fit p-6">
                            <p className="text-sm text-slate-500">Total</p>
                            <p className="mt-2 text-3xl font-black text-slate-950">{formatPrice(total)}</p>
                            <Link to="/checkout" className="mt-6 block">
                                <Button className="w-full">Commander</Button>
                            </Link>
                        </Card>
                    )}
                </div>
            </div>
        </MainLayout>
    );
}
