import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function SellerRoute({ children }) {

    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                Chargement...
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (
        user.role !== "seller" &&
        user.role !== "admin"
    ) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
}