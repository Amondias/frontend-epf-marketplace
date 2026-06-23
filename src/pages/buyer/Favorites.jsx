import { useEffect, useState } from "react";

import MainLayout from "../../layouts/MainLayout";

import ProductList from "../../components/products/ProductList";

import favoriteService from "../../services/favoriteService";

import Loader from "../../components/common/Loader";

export default function Favorites() {

    const [favorites, setFavorites] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        loadFavorites();

    }, []);

    const loadFavorites = async () => {

        const response =
            await favoriteService.getFavorites();

        setFavorites(
            response.data ||
            response
        );

        setLoading(false);
    };

    return (
        <MainLayout>

            <h1 className="text-3xl font-bold mb-6">
                Mes favoris
            </h1>

            {loading ? (
                <Loader />
            ) : (
                <ProductList
                    products={favorites}
                />
            )}

        </MainLayout>
    );
}