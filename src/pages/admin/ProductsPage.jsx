import { useEffect, useState } from "react";
import AdminShell from "../../components/admin/AdminShell";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import Card from "../../components/ui/Card";
import productService from "../../services/productService";
import adminService from "../../services/adminService";
import { formatPrice, statusLabel, statusVariant } from "../pageHelpers";

export default function ProductsPage() {
    const [products, setProducts] = useState([]);

    const loadProducts = () => {
        productService.getProducts({ per_page: 50 })
            .then((response) => setProducts(response.data || []))
            .catch(() => setProducts([]));
    };

    useEffect(loadProducts, []);

    const setStatus = async (id, status) => {
        await adminService.updateProductStatus(id, status);
        loadProducts();
    };

    const destroy = async (id) => {
        await adminService.forceDeleteProduct(id);
        loadProducts();
    };

    const activeProducts = products.filter((product) => product.status !== "inactive");
    const disabledProducts = products.filter((product) => product.status === "inactive");

    return (
        <AdminShell title="Produits" subtitle="Moderation des produits publies.">
            <div className="grid gap-8">
                <section className="grid gap-4">
                    <div>
                        <h2 className="text-xl font-semibold text-slate-900">Produits actifs</h2>
                        <p className="text-sm text-slate-500">Liste des produits actuellement actifs ou en attente de publication.</p>
                    </div>

                    {activeProducts.length === 0 ? (
                        <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6 text-slate-600">
                            Aucun produit actif trouvé.
                        </div>
                    ) : (
                        activeProducts.map((product) => (
                            <Card key={product.id} className="p-5">
                                <div className="flex flex-wrap items-center gap-4">
                                    <img src={product.image} alt={product.title} className="h-20 w-20 rounded-xl object-cover" />
                                    <div className="min-w-0 flex-1">
                                        <p className="font-bold text-slate-950">{product.title}</p>
                                        <p className="text-sm text-slate-500">{product.seller?.name}</p>
                                    </div>
                                    <p className="font-black text-indigo-600">{formatPrice(product.effective_price || product.price)}</p>
                                    <Badge variant={statusVariant(product.status || "published")}>{statusLabel(product.status || "published")}</Badge>
                                    {product.status !== "inactive" && (
                                        <Button variant="secondary" onClick={() => setStatus(product.id, "inactive")}>Desactiver</Button>
                                    )}
                                    {product.status !== "published" && (
                                        <Button variant="secondary" onClick={() => setStatus(product.id, "published")}>Publier</Button>
                                    )}
                                    <Button variant="danger" onClick={() => destroy(product.id)}>Supprimer</Button>
                                </div>
                            </Card>
                        ))
                    )}
                </section>

                {disabledProducts.length > 0 && (
                    <section className="grid gap-4">
                        <div>
                            <h2 className="text-xl font-semibold text-slate-900">Produits désactivés</h2>
                            <p className="text-sm text-slate-500">Ces produits restent visibles dans l'administration et peuvent être réactivés.</p>
                        </div>

                        {disabledProducts.map((product) => (
                            <Card key={product.id} className="p-5 border border-slate-200 bg-slate-50">
                                <div className="flex flex-wrap items-center gap-4">
                                    <img src={product.image} alt={product.title} className="h-20 w-20 rounded-xl object-cover" />
                                    <div className="min-w-0 flex-1">
                                        <p className="font-bold text-slate-950">{product.title}</p>
                                        <p className="text-sm text-slate-500">{product.seller?.name}</p>
                                    </div>
                                    <p className="font-black text-indigo-600">{formatPrice(product.effective_price || product.price)}</p>
                                    <Badge variant={statusVariant(product.status)}>{statusLabel(product.status)}</Badge>
                                    <Button variant="secondary" onClick={() => setStatus(product.id, "published")}>Reactiver</Button>
                                    <Button variant="danger" onClick={() => destroy(product.id)}>Supprimer</Button>
                                </div>
                            </Card>
                        ))}
                    </section>
                )}
            </div>
        </AdminShell>
    );
}
