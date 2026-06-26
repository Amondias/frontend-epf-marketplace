import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import Card from "../../components/ui/Card";
import orderService from "../../services/orderService";
import { formatPrice, statusLabel, statusVariant } from "../pageHelpers";

export default function OrdersPage() {
    const [orders, setOrders] = useState([]);

    const loadOrders = () => {
        orderService.getSellerOrders()
            .then((response) => setOrders(response.data || []))
            .catch(() => setOrders([]));
    };

    useEffect(loadOrders, []);

    const nextStatus = {
        pending: "confirmed",
        confirmed: "shipped",
        shipped: "delivered",
    };

    const advance = async (order) => {
        const status = nextStatus[order.status];
        if (!status) return;
        await orderService.updateStatus(order.id, status);
        loadOrders();
    };

    return (
        <DashboardLayout>
            <h1 className="text-3xl font-black text-slate-950">Commandes vendeur</h1>
            <div className="mt-6 grid gap-4">
                {orders.map((order) => (
                    <Card key={order.id} className="p-5">
                        <div className="flex flex-wrap items-start justify-between gap-4">
                            <div>
                                <p className="font-bold text-slate-950">{order.order_number}</p>
                                <p className="text-sm text-slate-500">Client : {order.buyer?.name || "Inconnu"}</p>
                                <div className="mt-3 space-y-1 text-sm text-slate-600">
                                    {(order.items || []).map((item, index) => (
                                        <p key={`${order.id}-${index}`}>{item.quantity} x {item.product?.title}</p>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-wrap items-center gap-3">
                                <Badge variant={statusVariant(order.status)}>{statusLabel(order.status)}</Badge>
                                <p className="font-black text-indigo-600">{formatPrice(order.total_amount)}</p>
                                {nextStatus[order.status] && (
                                    <Button onClick={() => advance(order)}>Passer a {statusLabel(nextStatus[order.status])}</Button>
                                )}
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </DashboardLayout>
    );
}
