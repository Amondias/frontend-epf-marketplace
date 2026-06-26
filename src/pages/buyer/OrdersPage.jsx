import { useEffect, useState } from "react";
import MainLayout from "../../components/layout/MainLayout";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import orderService from "../../services/orderService";
import { formatPrice, getErrorMessage, statusLabel, statusVariant } from "../pageHelpers";

export default function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState("");

    const loadOrders = () => {
        orderService.getMyOrders()
            .then((response) => setOrders(response.data || []))
            .catch((err) => setError(getErrorMessage(err, "Impossible de charger les commandes.")));
    };

    useEffect(loadOrders, []);

    const cancel = async (id) => {
        await orderService.cancelOrder(id);
        loadOrders();
    };

    return (
        <MainLayout>
            <div className="mx-auto max-w-5xl px-6 py-10">
                <h1 className="text-3xl font-black text-slate-950">Mes commandes</h1>
                {error && <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
                <div className="mt-6 grid gap-4">
                    {orders.map((order) => (
                        <Card key={order.id} className="p-5">
                            <div className="flex flex-wrap items-center justify-between gap-4">
                                <div>
                                    <p className="font-bold text-slate-950">{order.order_number}</p>
                                    <p className="text-sm text-slate-500">{order.item_count} article(s)</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Badge variant={statusVariant(order.status)}>{statusLabel(order.status)}</Badge>
                                    <p className="font-black text-indigo-600">{formatPrice(order.total_amount)}</p>
                                    {order.status === "pending" && (
                                        <Button variant="danger" onClick={() => cancel(order.id)}>Annuler</Button>
                                    )}
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </MainLayout>
    );
}
