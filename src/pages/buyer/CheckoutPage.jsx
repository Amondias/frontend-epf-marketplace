import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../components/layout/MainLayout";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Card from "../../components/ui/Card";
import orderService from "../../services/orderService";
import useCart from "../../hooks/useCart";
import { formatPrice, getErrorMessage } from "../pageHelpers";

export default function CheckoutPage() {
    const navigate = useNavigate();
    const { cart, total, refreshCart } = useCart();
    const [form, setForm] = useState({
        shipping_address: "",
        shipping_city: "",
        shipping_postal_code: "",
        shipping_phone: "",
        coupon_code: "",
        notes: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const update = (event) => setForm({ ...form, [event.target.name]: event.target.value });

    const submit = async (event) => {
        event.preventDefault();
        setError("");
        setLoading(true);
        try {
            await orderService.createOrder(form);
            await refreshCart();
            navigate("/orders");
        } catch (err) {
            setError(getErrorMessage(err, "Commande impossible."));
        } finally {
            setLoading(false);
        }
    };

    return (
        <MainLayout>
            <div className="mx-auto grid max-w-5xl gap-6 px-6 py-10 lg:grid-cols-[1fr_320px]">
                <Card className="p-6">
                    <h1 className="text-3xl font-black text-slate-950">Finaliser la commande</h1>
                    {error && <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
                    <form onSubmit={submit} className="mt-6 grid gap-4">
                        <Input name="shipping_address" value={form.shipping_address} onChange={update} placeholder="Adresse" required />
                        <div className="grid gap-4 sm:grid-cols-2">
                            <Input name="shipping_city" value={form.shipping_city} onChange={update} placeholder="Ville" required />
                            <Input name="shipping_postal_code" value={form.shipping_postal_code} onChange={update} placeholder="Code postal" required />
                        </div>
                        <Input name="shipping_phone" value={form.shipping_phone} onChange={update} placeholder="Telephone" required />
                        <Input name="coupon_code" value={form.coupon_code} onChange={update} placeholder="Code promo" />
                        <textarea name="notes" value={form.notes} onChange={update} rows={3} placeholder="Notes" className="rounded-lg border border-gray-300 px-4 py-3" />
                        <Button type="submit" disabled={loading || cart.length === 0}>
                            {loading ? "Validation..." : "Valider la commande"}
                        </Button>
                    </form>
                </Card>

                <Card className="h-fit p-6">
                    <h2 className="font-bold text-slate-950">Resume</h2>
                    <p className="mt-4 text-sm text-slate-500">{cart.length} ligne(s)</p>
                    <p className="mt-2 text-3xl font-black text-indigo-600">{formatPrice(total)}</p>
                </Card>
            </div>
        </MainLayout>
    );
}
