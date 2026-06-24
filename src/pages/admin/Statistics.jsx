import { useEffect, useState } from "react";

import AdminLayout from "../../layouts/AdminLayout";

import StatsCard from "../../components/admin/StatsCard";

import Loader from "../../components/common/Loader";

import adminService from "../../services/adminService";

export default function Statistics() {

    const [stats, setStats] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        loadStats();

    }, []);

    const loadStats = async () => {

        const response =
            await adminService.getStats();

        setStats(
            response.data || response
        );

        setLoading(false);
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <AdminLayout>

            <h1 className="text-3xl font-bold mb-6">
                Statistiques globales
            </h1>

            <div className="grid md:grid-cols-4 gap-4">

                <StatsCard
                    title="Utilisateurs"
                    value={
                        stats.total_users
                    }
                />

                <StatsCard
                    title="Produits"
                    value={
                        stats.total_products
                    }
                />

                <StatsCard
                    title="Commandes"
                    value={
                        stats.total_orders
                    }
                />

                <StatsCard
                    title="Ventes"
                    value={
                        stats.total_sales
                    }
                />

            </div>

        </AdminLayout>
    );
}