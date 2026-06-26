import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";

export default function Header() {
    const { user, logout } = useAuth();
    const { itemCount } = useCart();

    const itemClass = ({ isActive }) =>
        `text-sm font-medium transition ${isActive ? "text-indigo-600" : "text-slate-600 hover:text-indigo-600"}`;

    return (
        <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-slate-200/70">
            <div className="mx-auto max-w-7xl px-6">
                <div className="flex h-20 items-center justify-between">

                    <Link
                        to="/"
                        className="text-2xl font-black tracking-tight text-slate-900"
                    >
                        EPF<span className="text-indigo-600">Market</span>
                    </Link>

                    <nav className="hidden md:flex items-center gap-10">

                        <NavLink to="/products" className={itemClass}>
                            Produits
                        </NavLink>

                        <NavLink to="/cart" className={itemClass}>
                            Panier ({itemCount || 0})
                        </NavLink>

                        <NavLink to="/messages" className={itemClass}>
                            Messages
                        </NavLink>

                    </nav>

                    <div className="flex items-center gap-4">

                        {user ? (
                            <>
                                <Link
                                    to={user.role === "admin" ? "/admin/dashboard" : user.role === "seller" ? "/seller/dashboard" : "/profile"}
                                    className="flex items-center gap-3 text-sm font-semibold text-slate-700"
                                >
                                    {user.profile_image && (
                                        <img
                                            src={user.profile_image}
                                            alt={user.name}
                                            className="h-9 w-9 rounded-full object-cover"
                                        />
                                    )}
                                    {user.name}
                                </Link>

                                <button
                                    type="button"
                                    onClick={logout}
                                    className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
                                >
                                    Deconnexion
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="text-sm font-semibold text-slate-700"
                                >
                                    Connexion
                                </Link>

                                <Link
                                    to="/register"
                                    className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-500"
                                >
                                    Inscription
                                </Link>
                            </>
                        )}

                    </div>

                </div>
            </div>
        </header>
    );
}
