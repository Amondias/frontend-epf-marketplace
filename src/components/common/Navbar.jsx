import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";

export default function Navbar() {

    const { user, logout } = useAuth();

    const { cart } = useCart();

    const handleLogout = async () => {

        await logout();

    };

    return (
        <nav className="bg-white shadow">

            <div className="container mx-auto px-4">

                <div className="flex justify-between items-center h-16">

                    <Link
                        to="/"
                        className="font-bold text-xl"
                    >
                        EPF Marketplace
                    </Link>

                    <div className="flex gap-4 items-center">

                        <Link to="/products">
                            Produits
                        </Link>

                        <Link to="/categories">
                            Catégories
                        </Link>

                        {user && (
                            <Link to="/cart">
                                Panier ({cart.length})
                            </Link>
                        )}

                        {!user && (
                            <>
                                <Link to="/login">
                                    Connexion
                                </Link>

                                <Link to="/register">
                                    Inscription
                                </Link>
                            </>
                        )}

                        {user && (
                            <>
                                <Link to="/profile">
                                    Profil
                                </Link>

                                <button
                                    onClick={
                                        handleLogout
                                    }
                                    className="bg-red-500 text-white px-3 py-1 rounded"
                                >
                                    Déconnexion
                                </button>
                            </>
                        )}

                    </div>

                </div>

            </div>

        </nav>
    );
}