import { useState } from "react";

import { useNavigate } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";

import useCart from "../../hooks/useCart";

import orderService from "../../services/orderService";

export default function Checkout() {

    const navigate = useNavigate();

    const { total, clearCart } =
        useCart();

    const [form, setForm] =
        useState({
            shipping_address: "",
            shipping_city: "",
            shipping_postal_code:
                "",
            shipping_phone: "",
            coupon_code: "",
            notes: "",
        });

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]:
                e.target.value,
        });

    };

    const handleSubmit = async (
        e
    ) => {

        e.preventDefault();

        try {

            const response =
                await orderService.createOrder(
                    form
                );

            clearCart();

            navigate(
                `/orders/${response.id}`
            );

        } catch (error) {

            console.log(error);

        }
    };

    return (
        <MainLayout>

            <h1 className="text-3xl font-bold mb-6">
                Validation commande
            </h1>

            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded shadow space-y-4"
            >

                <input
                    name="shipping_address"
                    placeholder="Adresse"
                    value={
                        form.shipping_address
                    }
                    onChange={
                        handleChange
                    }
                    className="w-full border p-2 rounded"
                />

                <input
                    name="shipping_city"
                    placeholder="Ville"
                    value={
                        form.shipping_city
                    }
                    onChange={
                        handleChange
                    }
                    className="w-full border p-2 rounded"
                />

                <input
                    name="shipping_postal_code"
                    placeholder="Code postal"
                    value={
                        form.shipping_postal_code
                    }
                    onChange={
                        handleChange
                    }
                    className="w-full border p-2 rounded"
                />

                <input
                    name="shipping_phone"
                    placeholder="Téléphone"
                    value={
                        form.shipping_phone
                    }
                    onChange={
                        handleChange
                    }
                    className="w-full border p-2 rounded"
                />

                <input
                    name="coupon_code"
                    placeholder="Coupon"
                    value={
                        form.coupon_code
                    }
                    onChange={
                        handleChange
                    }
                    className="w-full border p-2 rounded"
                />

                <textarea
                    name="notes"
                    placeholder="Notes"
                    value={form.notes}
                    onChange={
                        handleChange
                    }
                    className="w-full border p-2 rounded"
                />

                <div className="font-bold text-xl">

                    Total : {total} FCFA

                </div>

                <button
                    className="bg-green-600 text-white px-5 py-2 rounded"
                >
                    Commander
                </button>

            </form>

        </MainLayout>
    );
}