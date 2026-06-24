import { useEffect, useState } from "react";

import AdminLayout from "../../layouts/AdminLayout";

import UserTable from "../../components/admin/UserTable";

import Loader from "../../components/common/Loader";

import adminService from "../../services/adminService";

export default function Users() {

    const [users, setUsers] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        loadUsers();

    }, []);

    const loadUsers = async () => {

        const response =
            await adminService.getUsers();

        setUsers(
            response.data || response
        );

        setLoading(false);
    };

    const suspendUser = async (
        userId
    ) => {

        await adminService.suspendUser(
            userId
        );

        loadUsers();
    };

    const activateUser = async (
        userId
    ) => {

        await adminService.activateUser(
            userId
        );

        loadUsers();
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <AdminLayout>

            <h1 className="text-3xl font-bold mb-6">
                Gestion utilisateurs
            </h1>

            <UserTable
                users={users}
                onSuspend={
                    suspendUser
                }
                onActivate={
                    activateUser
                }
            />

        </AdminLayout>
    );
}