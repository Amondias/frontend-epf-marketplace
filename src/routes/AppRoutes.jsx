import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import SellerRoute from "./SellerRoute";
import AdminRoute from "./AdminRoute";

import Home from "../pages/public/Home";
import Products from "../pages/public/Products";
import ProductDetails from "../pages/public/ProductDetails";
import Categories from "../pages/public/Categories";
import Search from "../pages/public/Search";
import SellerProfile from "../pages/public/SellerProfile";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import Profile from "../pages/profile/Profile";

import Cart from "../pages/buyer/Cart";
import Checkout from "../pages/buyer/Checkout";
import Orders from "../pages/buyer/Orders";
import OrderShow from "../pages/buyer/OrderShow";
import Favorites from "../pages/buyer/Favorites";
import Messages from "../pages/buyer/Messages";

import Dashboard from "../pages/seller/Dashboard";
import Statistics from "../pages/seller/Statistics";
import SellerProducts from "../pages/seller/Products";
import ProductCreate from "../pages/seller/ProductCreate";
import ProductEdit from "../pages/seller/ProductEdit";
import SellerOrders from "../pages/seller/Orders";

import AdminDashboard from "../pages/admin/Dashboard";
import Users from "../pages/admin/Users";
import Coupons from "../pages/admin/Coupons";

import Unauthorized from "../pages/errors/Unauthorized";
import NotFound from "../pages/errors/NotFound";

export default function AppRoutes() {

    return (
        <Routes>

            {/* PUBLIC */}

            <Route
                path="/"
                element={<Home />}
            />

            <Route
                path="/products"
                element={<Products />}
            />

            <Route
                path="/products/:id"
                element={<ProductDetails />}
            />

            <Route
                path="/categories"
                element={<Categories />}
            />

            <Route
                path="/search"
                element={<Search />}
            />

            <Route
                path="/seller/:id"
                element={<SellerProfile />}
            />

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/register"
                element={<Register />}
            />

            {/* USER */}

            <Route
                path="/profile"
                element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/cart"
                element={
                    <ProtectedRoute>
                        <Cart />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/checkout"
                element={
                    <ProtectedRoute>
                        <Checkout />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/orders"
                element={
                    <ProtectedRoute>
                        <Orders />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/orders/:id"
                element={
                    <ProtectedRoute>
                        <OrderShow />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/favorites"
                element={
                    <ProtectedRoute>
                        <Favorites />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/messages"
                element={
                    <ProtectedRoute>
                        <Messages />
                    </ProtectedRoute>
                }
            />

            {/* SELLER */}

            <Route
                path="/seller/dashboard"
                element={
                    <SellerRoute>
                        <Dashboard />
                    </SellerRoute>
                }
            />

            <Route
                path="/seller/statistics"
                element={
                    <SellerRoute>
                        <Statistics />
                    </SellerRoute>
                }
            />

            <Route
                path="/seller/products"
                element={
                    <SellerRoute>
                        <SellerProducts />
                    </SellerRoute>
                }
            />

            <Route
                path="/seller/products/create"
                element={
                    <SellerRoute>
                        <ProductCreate />
                    </SellerRoute>
                }
            />

            <Route
                path="/seller/products/edit/:id"
                element={
                    <SellerRoute>
                        <ProductEdit />
                    </SellerRoute>
                }
            />

            <Route
                path="/seller/orders"
                element={
                    <SellerRoute>
                        <SellerOrders />
                    </SellerRoute>
                }
            />

            {/* ADMIN */}

            <Route
                path="/admin/dashboard"
                element={
                    <AdminRoute>
                        <AdminDashboard />
                    </AdminRoute>
                }
            />

            <Route
                path="/admin/users"
                element={
                    <AdminRoute>
                        <Users />
                    </AdminRoute>
                }
            />

            <Route
                path="/admin/coupons"
                element={
                    <AdminRoute>
                        <Coupons />
                    </AdminRoute>
                }
            />

            {/* ERRORS */}

            <Route
                path="/unauthorized"
                element={<Unauthorized />}
            />

            <Route
                path="*"
                element={<NotFound />}
            />

        </Routes>
    );
}