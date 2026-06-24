import { useEffect, useState } from "react";

import SellerLayout from "../../layouts/SellerLayout";

import StatsCard from "../../components/admin/StatsCard";

import sellerService from "../../services/sellerService";

import Loader from "../../components/common/Loader";

export default function Dashboard() {

    const [dashboard, setDashboard] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {

        try {

            const response =
                await sellerService.getDashboard();

            setDashboard(
                response.data || response
            );

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <SellerLayout>

            <h1 className="text-3xl font-bold mb-8">
                Tableau de bord vendeur
            </h1>

            <div className="grid md:grid-cols-4 gap-4">

                <StatsCard
                    title="Produits"
                    value={
                        dashboard.total_products
                    }
                />

                <StatsCard
                    title="Commandes"
                    value={
                        dashboard.total_orders
                    }
                />

                <StatsCard
                    title="En attente"
                    value={
                        dashboard.pending_orders
                    }
                />

                <StatsCard
                    title="Ventes"
                    value={
                        dashboard.total_sales
                    }
                />

            </div>

        </SellerLayout>
    );
}