import { useEffect, useState } from "react";

import AdminLayout from "../../layouts/AdminLayout";

import CouponTable from "../../components/admin/CouponTable";

import Loader from "../../components/common/Loader";

import adminService from "../../services/adminService";

export default function Coupons() {

    const [coupons, setCoupons] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        loadCoupons();

    }, []);

    const loadCoupons = async () => {

        const response =
            await adminService.getCoupons();

        setCoupons(
            response.data || response
        );

        setLoading(false);
    };

    const deleteCoupon =
        async (couponId) => {

        await adminService.deleteCoupon(
            couponId
        );

        loadCoupons();
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <AdminLayout>

            <h1 className="text-3xl font-bold mb-6">
                Gestion coupons
            </h1>

            <CouponTable
                coupons={coupons}
                onDelete={
                    deleteCoupon
                }
            />

        </AdminLayout>
    );
}