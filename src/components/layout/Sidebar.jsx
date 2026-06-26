import { Link } from "react-router-dom";

export default function Sidebar() {

    return (
        <aside className="hidden md:flex w-64 flex-col border-r border-gray-200 bg-white">

            <div className="p-6">
                <h2 className="text-xl font-bold text-indigo-600">
                    Dashboard
                </h2>
            </div>

            <nav className="flex flex-col gap-2 px-4">

                <Link
                    to="/seller/dashboard"
                    className="rounded-lg px-4 py-3 hover:bg-gray-100"
                >
                    Tableau de bord
                </Link>

                <Link
                    to="/seller/products"
                    className="rounded-lg px-4 py-3 hover:bg-gray-100"
                >
                    Produits
                </Link>

                <Link
                    to="/seller/orders"
                    className="rounded-lg px-4 py-3 hover:bg-gray-100"
                >
                    Commandes
                </Link>

                <Link
                    to="/profile"
                    className="rounded-lg px-4 py-3 hover:bg-gray-100"
                >
                    Profil
                </Link>

            </nav>

        </aside>
    );
}