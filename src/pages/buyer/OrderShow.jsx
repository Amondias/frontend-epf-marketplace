import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";

import OrderDetails from "../../components/orders/OrderDetails";

import orderService from "../../services/orderService";

import Loader from "../../components/common/Loader";

export default function OrderShow() {

    const { id } = useParams();

    const [order, setOrder] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        loadOrder();

    }, [id]);

    const loadOrder = async () => {

        const response =
            await orderService.getOrder(
                id
            );

        setOrder(
            response.data ||
            response
        );

        setLoading(false);
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <MainLayout>

            <OrderDetails
                order={order}
            />

        </MainLayout>
    );
}