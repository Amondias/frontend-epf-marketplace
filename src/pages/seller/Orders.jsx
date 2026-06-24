import { useEffect, useState } from "react";

import SellerLayout from "../../layouts/SellerLayout";

import sellerService from "../../services/sellerService";

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

        const response =
            await sellerService.getOrders();

        setOrders(
            response.data ||
            response
        );

        setLoading(false);
    };

    const updateStatus = async (
        orderId,
        status
    ) => {

        await sellerService.updateOrderStatus(
            orderId,
            {
                status,
            }
        );

        loadOrders();
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <SellerLayout>

            <h1 className="text-3xl font-bold mb-6">
                Commandes reçues
            </h1>

            <div className="bg-white rounded shadow overflow-x-auto">

                <table className="w-full">

                    <thead>

                        <tr className="bg-gray-100">

                            <th className="p-3">
                                Commande
                            </th>

                            <th className="p-3">
                                Client
                            </th>

                            <th className="p-3">
                                Total
                            </th>

                            <th className="p-3">
                                Statut
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {orders.map(
                            order => (
                                <tr
                                    key={
                                        order.id
                                    }
                                >
                                    <td className="p-3">
                                        #
                                        {
                                            order.id
                                        }
                                    </td>

                                    <td className="p-3">
                                        {
                                            order.user
                                                ?.name
                                        }
                                    </td>

                                    <td className="p-3">
                                        {
                                            order.total
                                        }
                                        FCFA
                                    </td>

                                    <td className="p-3">

                                        <select
                                            value={
                                                order.status
                                            }
                                            onChange={(
                                                e
                                            ) =>
                                                updateStatus(
                                                    order.id,
                                                    e
                                                        .target
                                                        .value
                                                )
                                            }
                                            className="border rounded p-2"
                                        >
                                            <option value="pending">
                                                pending
                                            </option>

                                            <option value="processing">
                                                processing
                                            </option>

                                            <option value="shipped">
                                                shipped
                                            </option>

                                            <option value="delivered">
                                                delivered
                                            </option>

                                        </select>

                                    </td>

                                </tr>
                            )
                        )}

                    </tbody>

                </table>

            </div>

        </SellerLayout>
    );
}