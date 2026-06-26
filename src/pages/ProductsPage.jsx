import { useCallback, useEffect, useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import ProductGrid from "../components/products/ProductGrid";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import productService from "../services/productService";
import categoryService from "../services/categoryService";
import useCart from "../hooks/useCart";
import { getErrorMessage } from "./pageHelpers";

export default function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filters, setFilters] = useState({
        search: "",
        category_id: "",
        sort: "newest",
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const { addToCart } = useCart();

    const loadProducts = useCallback(async () => {
        setLoading(true);
        setError("");
        try {
            const response = await productService.getProducts(filters);
            setProducts(response.data || []);
        } catch (err) {
            setError(getErrorMessage(err, "Impossible de charger les produits."));
        } finally {
            setLoading(false);
        }
    }, [filters]);

    useEffect(() => {
        categoryService.getAll()
            .then((response) => setCategories(response || []))
            .catch(() => setCategories([]));
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            loadProducts();
        }, 250);

        return () => clearTimeout(timer);
    }, [filters, loadProducts]);

    const handleSubmit = (event) => {
        event.preventDefault();
        loadProducts();
    };

    return (
        <MainLayout>
            <div className="mx-auto max-w-7xl px-6 py-10">
                <div className="mb-8">
                    <h1 className="text-3xl font-black text-slate-950">Catalogue</h1>
                    <p className="mt-2 text-slate-600">Recherchez les produits publies par les vendeurs.</p>
                </div>

                <form onSubmit={handleSubmit} className="mb-8 grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 md:grid-cols-[1fr_220px_180px_auto]">
                    <Input
                        value={filters.search}
                        onChange={(event) => setFilters({ ...filters, search: event.target.value })}
                        onKeyDown={(event) => {
                            if (event.key === "Enter") {
                                handleSubmit(event);
                            }
                        }}
                        placeholder="Rechercher un produit"
                    />
                    <select
                        value={filters.category_id}
                        onChange={(event) => setFilters({ ...filters, category_id: event.target.value })}
                        className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500"
                    >
                        <option value="">Toutes categories</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    <select
                        value={filters.sort}
                        onChange={(event) => setFilters({ ...filters, sort: event.target.value })}
                        className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-indigo-500"
                    >
                        <option value="newest">Recents</option>
                        <option value="popular">Populaires</option>
                        <option value="cheapest">Moins chers</option>
                        <option value="most_rated">Mieux notes</option>
                    </select>
                    <Button type="submit">Filtrer</Button>
                </form>

                {error && <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
                {loading ? <p className="text-slate-600">Chargement...</p> : <ProductGrid products={products} onAddToCart={addToCart} />}
            </div>
        </MainLayout>
    );
}
