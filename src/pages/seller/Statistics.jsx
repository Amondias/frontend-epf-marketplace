import { useEffect, useState } from "react";

import SellerLayout from "../../layouts/SellerLayout";

import StatsCard from "../../components/admin/StatsCard";

import sellerService from "../../services/sellerService";

import Loader from "../../components/common/Loader";

export default function Statistics() {

    const [stats, setStats] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        loadStatistics();

    }, []);

    const loadStatistics = async () => {

        const response =
            await sellerService.getStatistics();

        setStats(
            response.data ||
            response
        );

        setLoading(false);
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <SellerLayout>

            <h1 className="text-3xl font-bold mb-6">
                Statistiques
            </h1>

            <div className="grid md:grid-cols-3 gap-4">

                <StatsCard
                    title="Ventes"
                    value={
                        stats.total_sales
                    }
                />

                <StatsCard
                    title="Produits"
                    value={
                        stats.total_products
                    }
                />

                <StatsCard
                    title="Produits actifs"
                    value={
                        stats.active_products
                    }
                />

                <StatsCard
                    title="Commandes"
                    value={
                        stats.total_orders
                    }
                />

                <StatsCard
                    title="En attente"
                    value={
                        stats.pending_orders
                    }
                />

                <StatsCard
                    title="Note moyenne"
                    value={
                        stats.average_rating
                    }
                />

            </div>

            {stats.top_products?.length >
                0 && (
                <div className="mt-10">

                    <h2 className="text-2xl font-bold mb-4">
                        Produits populaires
                    </h2>

                    <div className="bg-white rounded shadow">

                        {stats.top_products.map(
                            product => (
                                <div
                                    key={
                                        product.id
                                    }
                                    className="p-4 border-b"
                                >
                                    {
                                        product.name
                                    }
                                </div>
                            )
                        )}

                    </div>

                </div>
            )}

        </SellerLayout>
    );
}