import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import SellerLayout from "../../layouts/SellerLayout";

import productService from "../../services/productService";

import Loader from "../../components/common/Loader";

export default function Products() {

    const [products, setProducts] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        loadProducts();

    }, []);

    const loadProducts = async () => {

        try {

            const response =
                await productService.getMyProducts();

            setProducts(
                response.data || response
            );

        } finally {

            setLoading(false);

        }
    };

    const removeProduct = async (
        id
    ) => {

        if (
            !window.confirm(
                "Supprimer ce produit ?"
            )
        ) {
            return;
        }

        await productService.deleteProduct(
            id
        );

        loadProducts();
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <SellerLayout>

            <div className="flex justify-between mb-6">

                <h1 className="text-3xl font-bold">
                    Mes produits
                </h1>

                <Link
                    to="/seller/products/create"
                    className="
                    bg-green-600
                    text-white
                    px-4
                    py-2
                    rounded
                    "
                >
                    Nouveau produit
                </Link>

            </div>

            <div className="bg-white rounded shadow overflow-x-auto">

                <table className="w-full">

                    <thead>

                        <tr className="bg-gray-100">

                            <th className="p-3">
                                Produit
                            </th>

                            <th className="p-3">
                                Prix
                            </th>

                            <th className="p-3">
                                Stock
                            </th>

                            <th className="p-3">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {products.map(
                            product => (
                                <tr
                                    key={
                                        product.id
                                    }
                                >
                                    <td className="p-3">
                                        {
                                            product.name
                                        }
                                    </td>

                                    <td className="p-3">
                                        {
                                            product.price
                                        }
                                        {" "}
                                        FCFA
                                    </td>

                                    <td className="p-3">
                                        {
                                            product.stock
                                        }
                                    </td>

                                    <td className="p-3 space-x-2">

                                        <Link
                                            to={`/seller/products/${product.id}/edit`}
                                            className="text-blue-600"
                                        >
                                            Modifier
                                        </Link>

                                        <button
                                            onClick={() =>
                                                removeProduct(
                                                    product.id
                                                )
                                            }
                                            className="text-red-600"
                                        >
                                            Supprimer
                                        </button>

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