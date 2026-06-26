import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Card from "../../components/ui/Card";
import sellerService from "../../services/sellerService";
import { formatPrice } from "../pageHelpers";

export default function DashboardPage() {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        sellerService.dashboard()
            .then(setStats)
            .catch(() => setStats(null));
    }, []);

    if (!stats) {
        return <DashboardLayout>Chargement...</DashboardLayout>;
    }

    const cards = [
        { label: "Ventes", value: formatPrice(stats.total_sales) },
        { label: "Commandes", value: stats.total_orders },
        { label: "En attente", value: stats.pending_orders },
        { label: "Produits actifs", value: stats.active_products },
    ];

    return (
        <DashboardLayout>
            <h1 className="text-3xl font-black text-slate-950">Tableau de bord vendeur</h1>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {cards.map((card) => (
                    <Card key={card.label} className="p-5">
                        <p className="text-sm text-slate-500">{card.label}</p>
                        <p className="mt-2 text-2xl font-black text-slate-950">{card.value}</p>
                    </Card>
                ))}
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
                <Card className="p-5">
                    <h2 className="font-bold text-slate-950">Commandes recentes</h2>
                    <div className="mt-4 space-y-3">
                        {(stats.recent_orders || []).map((order) => (
                            <div key={order.order_number} className="flex justify-between border-t pt-3 text-sm">
                                <span>{order.order_number}</span>
                                <span className="font-semibold">{formatPrice(order.total)}</span>
                            </div>
                        ))}
                    </div>
                </Card>

                <Card className="p-5">
                    <h2 className="font-bold text-slate-950">Meilleurs produits</h2>
                    <div className="mt-4 space-y-3">
                        {(stats.top_products || []).map((product) => (
                            <div key={product.title} className="flex justify-between border-t pt-3 text-sm">
                                <span>{product.title}</span>
                                <span className="font-semibold">{product.sales_count} vente(s)</span>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </DashboardLayout>
    );
}
