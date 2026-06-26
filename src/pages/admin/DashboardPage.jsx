import { useEffect, useState } from "react";
import AdminShell from "../../components/admin/AdminShell";
import Card from "../../components/ui/Card";
import adminService from "../../services/adminService";
import { formatPrice } from "../pageHelpers";

export default function DashboardPage() {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        adminService.getStats()
            .then(setStats)
            .catch(() => setStats(null));
    }, []);

    const cards = [
        { label: "Utilisateurs", value: stats?.users_count || 0 },
        { label: "Produits", value: stats?.products_count || 0 },
        { label: "Commandes", value: stats?.orders_count || 0 },
        { label: "Revenu", value: formatPrice(stats?.total_revenue) },
    ];

    return (
        <AdminShell title="Vue d'ensemble" subtitle="Indicateurs globaux de la marketplace.">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {cards.map((card) => (
                    <Card key={card.label} className="p-5">
                        <p className="text-sm text-slate-500">{card.label}</p>
                        <p className="mt-2 text-2xl font-black text-slate-950">{card.value}</p>
                    </Card>
                ))}
            </div>
        </AdminShell>
    );
}
