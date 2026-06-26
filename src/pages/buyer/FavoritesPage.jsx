import { useEffect, useState } from "react";
import MainLayout from "../../components/layout/MainLayout";
import ProductGrid from "../../components/products/ProductGrid";
import favoriteService from "../../services/favoriteService";
import useCart from "../../hooks/useCart";
import { getErrorMessage } from "../pageHelpers";

export default function FavoritesPage() {
    const [favorites, setFavorites] = useState([]);
    const [error, setError] = useState("");
    const { addToCart } = useCart();

    useEffect(() => {
        favoriteService.getFavorites()
            .then((response) => setFavorites(response.data || []))
            .catch((err) => setError(getErrorMessage(err, "Impossible de charger les favoris.")));
    }, []);

    return (
        <MainLayout>
            <div className="mx-auto max-w-7xl px-6 py-10">
                <h1 className="text-3xl font-black text-slate-950">Mes favoris</h1>
                {error && <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
                <div className="mt-6">
                    <ProductGrid products={favorites} onAddToCart={addToCart} />
                </div>
            </div>
        </MainLayout>
    );
}
