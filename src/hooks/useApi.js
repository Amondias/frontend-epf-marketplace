import { useState } from "react";

export default function useApi() {

    const [loading, setLoading] =
        useState(false);

    const [error, setError] =
        useState(null);

    const request = async (
        callback
    ) => {

        try {

            setLoading(true);

            setError(null);

            return await callback();

        } catch (err) {

            setError(
                err.response?.data?.message ||
                "Erreur serveur"
            );

            throw err;

        } finally {

            setLoading(false);

        }
    };

    return {
        loading,
        error,
        request,
    };
}