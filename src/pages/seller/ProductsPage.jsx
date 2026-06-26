import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import Card from "../../components/ui/Card";
import EmptyState from "../../components/ui/EmptyState";
import productService from "../../services/productService";
import { formatPrice, statusLabel, statusVariant } from "../pageHelpers";

export default function ProductsPage() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

    const loadProducts = () => {
        productService.getMyProducts()
            .then((response) => {
                // productService may return the axios response data object or the paginated payload
                // handle both: if response.data is present use it, else if response is an object with 'data' field use that, otherwise assume response is the array
                const productsArray = response?.data ?? response ?? [];
                // if paginated payload (has data property), normalize
                const normalized = Array.isArray(productsArray) ? productsArray : (productsArray.data ?? []);
                setProducts(normalized);
            })
            .catch(() => setProducts([]));
    };

    useEffect(loadProducts, []);

    const remove = async (id) => {
        await productService.deleteProduct(id);
        loadProducts();
    };

    return (
        <DashboardLayout>
            <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-950">Mes produits</h1>
                    <p className="mt-2 text-slate-600">Gerez votre catalogue vendeur.</p>
                </div>
                <Link to="/seller/products/create">
                    <Button>Nouveau produit</Button>
                </Link>
            </div>

            <div className="mt-6 grid gap-4">
                {products.length === 0 ? (
                    <EmptyState
                        title="Aucun produit"
                        description="Vous n'avez pas encore de produit."
                    >
                        <div className="mt-4">
                            <Link to="/seller/products/create">
                                <Button>Créer un produit</Button>
                            </Link>
                        </div>
                    </EmptyState>
                ) : (
                    products.map((product) => (
                        <Card key={product.id} className="p-4">
                            <div className="flex flex-wrap items-center gap-4">
                                <img src={product.image} alt={product.title} className="h-20 w-20 rounded-xl object-cover" />
                                <div className="min-w-0 flex-1">
                                    <p className="font-bold text-slate-950">{product.title}</p>
                                    <p className="mt-1 text-sm text-slate-500">Stock : {product.quantity ?? "-"} - Vues : {product.views}</p>
                                </div>
                                <p className="font-black text-indigo-600">{formatPrice(product.price)}</p>
                                <Badge variant={statusVariant(product.status)}>{statusLabel(product.status)}</Badge>
                                <Link to={`/products/${product.id}`}>
                                    <Button variant="secondary">Voir</Button>
                                </Link>
                                <Button variant="secondary" onClick={() => navigate(`/seller/products/edit/${product.id}`)}>Modifier</Button>
                                <Button variant="danger" onClick={() => remove(product.id)}>Supprimer</Button>
                            </div>
                        </Card>
                    ))
                )}
            </div>
        </DashboardLayout>
    );
}
