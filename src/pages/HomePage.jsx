import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import ProductGrid from "../components/products/ProductGrid";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import productService from "../services/productService";
import categoryService from "../services/categoryService";
import useCart from "../hooks/useCart";

export default function HomePage() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const { addToCart } = useCart();

    useEffect(() => {
        productService.getTopSelling()
            .then((response) => setProducts(response.data || []))
            .catch(() => setProducts([]));

        categoryService.getAll()
            .then((response) => setCategories(response || []))
            .catch(() => setCategories([]));
    }, []);

    return (
        <MainLayout>
            <section className="bg-white">
                <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600">
                            Marketplace EPF
                        </p>
                        <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight text-slate-950 md:text-6xl">
                            Achetez, vendez et gerez des produits simplement.
                        </h1>
                        <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                            Une interface React connectee a une API Laravel complete : catalogue,
                            panier, commandes, avis, messagerie et administration.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <Link to="/products">
                                <Button>Voir les produits</Button>
                            </Link>
                            <Link to="/register">
                                <Button variant="secondary">Creer un compte</Button>
                            </Link>
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
                        <img
                            src="/src/assets/hero.png"
                            alt="Marketplace"
                            className="h-full min-h-80 w-full object-cover"
                        />
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 py-12">
                <div className="mb-6 flex items-end justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-black text-slate-950">Categories</h2>
                        <p className="mt-1 text-slate-600">Explorez les familles de produits.</p>
                    </div>
                    <Link to="/products" className="text-sm font-semibold text-indigo-600">
                        Tout voir
                    </Link>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {categories.slice(0, 8).map((category) => (
                        <Card key={category.id} className="p-5">
                            <p className="text-lg font-bold text-slate-950">{category.name}</p>
                            <p className="mt-2 text-sm text-slate-500">
                                {category.products_count || 0} produit(s)
                            </p>
                        </Card>
                    ))}
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 py-12">
                <div className="mb-6">
                    <h2 className="text-2xl font-black text-slate-950">Meilleures ventes</h2>
                    <p className="mt-1 text-slate-600">Les produits les plus populaires.</p>
                </div>
                <ProductGrid products={products} onAddToCart={addToCart} />
            </section>
        </MainLayout>
    );
}
