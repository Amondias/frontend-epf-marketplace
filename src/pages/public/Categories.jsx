import { useEffect, useState } from "react";

import MainLayout from "../../layouts/MainLayout";

import categoryService from "../../services/categoryService";

import Loader from "../../components/common/Loader";

export default function Categories() {

    const [categories, setCategories] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        loadCategories();

    }, []);

    const loadCategories = async () => {

        try {

            const response =
                await categoryService.getAll();

            setCategories(
                response.data || response
            );

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }
    };

    return (
        <MainLayout>

            <h1 className="text-3xl font-bold mb-6">
                Catégories
            </h1>

            {loading ? (
                <Loader />
            ) : (
                <div className="grid md:grid-cols-4 gap-4">

                    {categories.map(
                        (category) => (
                            <div
                                key={category.id}
                                className="
                                bg-white
                                p-5
                                rounded
                                shadow
                                "
                            >
                                <h3 className="font-semibold">
                                    {category.name}
                                </h3>
                            </div>
                        )
                    )}

                </div>
            )}

        </MainLayout>
    );
}