import { useState } from "react";

import MainLayout from "../../layouts/MainLayout";

import ProfileForm from "../../components/forms/ProfileForm";

import ErrorMessage from "../../components/common/ErrorMessage";

import useAuth from "../../hooks/useAuth";
import useApi from "../../hooks/useApi";

import authService from "../../services/authService";

export default function Profile() {

    const { user, setUser } = useAuth();

    const {
        request,
        error
    } = useApi();

    const [success, setSuccess] =
        useState("");

    const handleSubmit = async (
        formData
    ) => {

        try {

            const response =
                await request(() =>
                    authService.updateProfile(
                        formData
                    )
                );

            const updatedUser =
                response.user ||
                response.data ||
                response;

            setUser(updatedUser);

            localStorage.setItem(
                "user",
                JSON.stringify(
                    updatedUser
                )
            );

            setSuccess(
                "Profil mis à jour."
            );

        } catch (error) {}
    };

    return (
        <MainLayout>

            <div className="max-w-3xl mx-auto">

                <h1 className="text-3xl font-bold mb-6">
                    Mon profil
                </h1>

                {success && (
                    <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
                        {success}
                    </div>
                )}

                <ErrorMessage
                    message={error}
                />

                <ProfileForm
                    user={user}
                    onSubmit={
                        handleSubmit
                    }
                />

            </div>

        </MainLayout>
    );
}