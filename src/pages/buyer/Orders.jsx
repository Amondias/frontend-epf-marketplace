import { useEffect, useState } from "react";

import MainLayout from "../../layouts/MainLayout";

import OrderCard from "../../components/orders/OrderCard";

import orderService from "../../services/orderService";

import Loader from "../../components/common/Loader";

export default function Orders() {

    const [orders, setOrders] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        loadOrders();

    }, []);

    const loadOrders = async () => {

        try {

            const response =
                await orderService.getMyOrders();

            setOrders(
                response.data ||
                response
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <MainLayout>

            <h1 className="text-3xl font-bold mb-6">
                Mes commandes
            </h1>

            {loading ? (
                <Loader />
            ) : (
                <div className="space-y-4">

                    {orders.map(order => (
                        <OrderCard
                            key={order.id}
                            order={order}
                        />
                    ))}

                </div>
            )}

        </MainLayout>
    );
}