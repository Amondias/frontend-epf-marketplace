import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";

import ProductList from "../../components/products/ProductList";

import sellerService from "../../services/sellerService";

import Loader from "../../components/common/Loader";

export default function SellerProfile() {

    const { id } = useParams();

    const [seller, setSeller] =
        useState(null);

    const [products, setProducts] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        loadSeller();

        loadProducts();

    }, [id]);

    const loadSeller = async () => {

        const response =
            await sellerService.getSeller(id);

        setSeller(
            response.data || response
        );
    };

    const loadProducts = async () => {

        const response =
            await sellerService.getSellerProducts(
                id
            );

        setProducts(
            response.data || response
        );

        setLoading(false);
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <MainLayout>

            <div className="bg-white p-6 rounded shadow mb-8">

                <h1 className="text-3xl font-bold">
                    {seller?.name}
                </h1>

                <p className="text-gray-500">
                    {seller?.city}
                </p>

                <p className="mt-3">
                    {seller?.bio}
                </p>

            </div>

            <h2 className="text-2xl font-bold mb-5">
                Produits du vendeur
            </h2>

            <ProductList
                products={products}
            />

        </MainLayout>
    );
}