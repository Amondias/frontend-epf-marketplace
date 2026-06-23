import { Link } from "react-router-dom";

export default function Sidebar({ type }) {

    return (

        <aside className="w-64 min-h-screen bg-white shadow">

            <div className="p-4 font-bold text-lg border-b">

                Menu

            </div>

            <nav className="flex flex-col p-4 gap-3">

                {type === "seller" && (
                    <>
                        <Link
                            to="/seller/dashboard"
                        >
                            Dashboard
                        </Link>

                        <Link
                            to="/seller/statistics"
                        >
                            Statistiques
                        </Link>

                        <Link
                            to="/seller/products"
                        >
                            Mes Produits
                        </Link>

                        <Link
                            to="/seller/products/create"
                        >
                            Ajouter Produit
                        </Link>

                        <Link
                            to="/seller/orders"
                        >
                            Commandes
                        </Link>
                    </>
                )}

                {type === "admin" && (
                    <>
                        <Link
                            to="/admin/dashboard"
                        >
                            Dashboard
                        </Link>

                        <Link
                            to="/admin/users"
                        >
                            Utilisateurs
                        </Link>

                        <Link
                            to="/admin/products"
                        >
                            Modération
                        </Link>

                        <Link
                            to="/admin/coupons"
                        >
                            Coupons
                        </Link>
                    </>
                )}

            </nav>

        </aside>

    );
}