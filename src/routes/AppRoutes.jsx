import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import SellerRoute from "./SellerRoute";
import AdminRoute from "./AdminRoute";

import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ProductsPage from "../pages/ProductsPage";
import ProductDetailsPage from "../pages/ProductDetailsPage";
import ProfilePage from "../pages/ProfilePage";
import UnauthorizedPage from "../pages/UnauthorizedPage";

import CartPage from "../pages/buyer/CartPage";
import CheckoutPage from "../pages/buyer/CheckoutPage";
import FavoritesPage from "../pages/buyer/FavoritesPage";
import MessagesPage from "../pages/buyer/MessagesPage";
import OrdersPage from "../pages/buyer/OrdersPage";

import SellerDashboardPage from "../pages/seller/DashboardPage";
import SellerProductsPage from "../pages/seller/ProductsPage";
import CreateProductPage from "../pages/seller/CreateProductPage";
import EditProductPage from "../pages/seller/EditProductPage";
import SellerOrdersPage from "../pages/seller/OrdersPage";

import AdminDashboardPage from "../pages/admin/DashboardPage";
import AdminProductsPage from "../pages/admin/ProductsPage";
import AdminUsersPage from "../pages/admin/UsersPage";
import AdminCouponsPage from "../pages/admin/CouponsPage";

export default function AppRoutes() {
    return (
        <Routes>

            {/* PUBLIC */}

            <Route
                path="/"
                element={<HomePage />}
            />

            <Route
                path="/products"
                element={<ProductsPage />}
            />

            <Route
                path="/products/:id"
                element={<ProductDetailsPage />}
            />

            <Route
                path="/login"
                element={<LoginPage />}
            />

            <Route
                path="/register"
                element={<RegisterPage />}
            />

            <Route
                path="/unauthorized"
                element={<UnauthorizedPage />}
            />

            {/* USER */}

            <Route
                path="/profile"
                element={
                    <ProtectedRoute>
                        <ProfilePage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/cart"
                element={
                    <ProtectedRoute>
                        <CartPage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/checkout"
                element={
                    <ProtectedRoute>
                        <CheckoutPage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/orders"
                element={
                    <ProtectedRoute>
                        <OrdersPage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/favorites"
                element={
                    <ProtectedRoute>
                        <FavoritesPage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/messages"
                element={
                    <ProtectedRoute>
                        <MessagesPage />
                    </ProtectedRoute>
                }
            />

            {/* SELLER */}

            <Route
                path="/seller/dashboard"
                element={
                    <SellerRoute>
                        <SellerDashboardPage />
                    </SellerRoute>
                }
            />

            <Route
                path="/seller/products"
                element={
                    <SellerRoute>
                        <SellerProductsPage />
                    </SellerRoute>
                }
            />

            <Route
                path="/seller/products/create"
                element={
                    <SellerRoute>
                        <CreateProductPage />
                    </SellerRoute>
                }
            />

            <Route
                path="/seller/products/edit/:id"
                element={
                    <SellerRoute>
                        <EditProductPage />
                    </SellerRoute>
                }
            />

            <Route
                path="/seller/orders"
                element={
                    <SellerRoute>
                        <SellerOrdersPage />
                    </SellerRoute>
                }
            />

            {/* ADMIN */}

            <Route
                path="/admin/dashboard"
                element={
                    <AdminRoute>
                        <AdminDashboardPage />
                    </AdminRoute>
                }
            />

            <Route
                path="/admin/products"
                element={
                    <AdminRoute>
                        <AdminProductsPage />
                    </AdminRoute>
                }
            />

            <Route
                path="/admin/users"
                element={
                    <AdminRoute>
                        <AdminUsersPage />
                    </AdminRoute>
                }
            />

            <Route
                path="/admin/coupons"
                element={
                    <AdminRoute>
                        <AdminCouponsPage />
                    </AdminRoute>
                }
            />

            <Route
                path="*"
                element={<HomePage />}
            />

        </Routes>
    );
}
