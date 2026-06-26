import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import Card from "../components/ui/Card";
import productService from "../services/productService";
import reviewService from "../services/reviewService";
import useAuth from "../hooks/useAuth";
import useCart from "../hooks/useCart";
import { formatPrice, getErrorMessage } from "./pageHelpers";

export default function ProductDetailsPage() {
    const { id } = useParams();
    const { user } = useAuth();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [review, setReview] = useState({ rating: 5, comment: "" });
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        productService.getProduct(id)
            .then(setProduct)
            .catch((err) => setError(getErrorMessage(err, "Produit introuvable.")));
    }, [id]);

    const submitReview = async (event) => {
        event.preventDefault();
        setMessage("");
        setError("");
        try {
            await reviewService.addReview(id, review);
            const fresh = await productService.getProduct(id);
            setProduct(fresh);
            setReview({ rating: 5, comment: "" });
            setMessage("Avis enregistre.");
        } catch (err) {
            setError(getErrorMessage(err, "Impossible d'enregistrer cet avis."));
        }
    };

    if (error && !product) {
        return (
            <MainLayout>
                <div className="mx-auto max-w-4xl px-6 py-16 text-red-700">{error}</div>
            </MainLayout>
        );
    }

    if (!product) {
        return (
            <MainLayout>
                <div className="mx-auto max-w-4xl px-6 py-16">Chargement...</div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div className="mx-auto grid max-w-7xl gap-10 px-6 py-10 lg:grid-cols-[1fr_0.9fr]">
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                    <img src={product.image} alt={product.title} className="aspect-square w-full object-cover" />
                </div>

                <div>
                    <div className="flex flex-wrap gap-2">
                        {product.category && <Badge>{product.category.name}</Badge>}
                        {product.is_on_sale && <Badge variant="danger">Promotion</Badge>}
                    </div>
                    <h1 className="mt-4 text-4xl font-black text-slate-950">{product.title}</h1>
                    <p className="mt-4 text-slate-600">{product.description}</p>

                    <div className="mt-6 flex items-end gap-4">
                        <span className="text-3xl font-black text-indigo-600">
                            {formatPrice(product.effective_price)}
                        </span>
                        {product.is_on_sale && (
                            <span className="text-lg text-slate-400 line-through">{formatPrice(product.price)}</span>
                        )}
                    </div>

                    <p className="mt-3 text-sm text-slate-500">Stock disponible : {product.quantity}</p>

                    <div className="mt-8 flex flex-wrap gap-3">
                        <Button
                            onClick={() => addToCart(product)}
                            disabled={Number(product.quantity) <= 0 || product.status === "inactive"}
                        >
                            {Number(product.quantity) <= 0
                                ? "Rupture de stock"
                                : product.status === "inactive"
                                    ? "Produit désactivé"
                                    : "Ajouter au panier"}
                        </Button>
                        {product.seller && (
                            <Link to={`/messages?user=${product.seller.id}&product=${product.id}`}>
                                <Button variant="secondary">Contacter le vendeur</Button>
                            </Link>
                        )}
                    </div>

                    {product.seller && (
                        <Card className="mt-8 p-5">
                            <p className="font-bold text-slate-950">Vendeur : {product.seller.name}</p>
                            <p className="mt-1 text-sm text-slate-600">
                                Note {product.seller.rating || 0}/5 - {product.seller.city || "Ville non renseignee"}
                            </p>
                        </Card>
                    )}
                </div>
            </div>

            <section className="mx-auto max-w-7xl px-6 pb-16">
                <h2 className="text-2xl font-black text-slate-950">Avis clients</h2>
                {message && <p className="mt-4 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-700">{message}</p>}
                {error && <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}

                {user && (
                    <form onSubmit={submitReview} className="mt-5 grid gap-3 rounded-2xl border border-slate-200 bg-white p-5">
                        <select
                            value={review.rating}
                            onChange={(event) => setReview({ ...review, rating: Number(event.target.value) })}
                            className="rounded-lg border border-gray-300 px-4 py-3"
                        >
                            {[5, 4, 3, 2, 1].map((rating) => (
                                <option key={rating} value={rating}>{rating}/5</option>
                            ))}
                        </select>
                        <textarea
                            value={review.comment}
                            onChange={(event) => setReview({ ...review, comment: event.target.value })}
                            rows={3}
                            placeholder="Votre avis"
                            className="rounded-lg border border-gray-300 px-4 py-3"
                        />
                        <Button type="submit">Publier l'avis</Button>
                    </form>
                )}

                <div className="mt-6 grid gap-4">
                    {(product.reviews || []).map((item) => (
                        <Card key={item.id} className="p-5">
                            <p className="font-semibold text-slate-950">{item.buyer?.name || "Client"} - {item.rating}/5</p>
                            <p className="mt-2 text-slate-600">{item.comment || "Aucun commentaire."}</p>
                        </Card>
                    ))}
                </div>
            </section>
        </MainLayout>
    );
}
