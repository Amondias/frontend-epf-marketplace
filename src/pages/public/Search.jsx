import { useState } from "react";

import MainLayout from "../../layouts/MainLayout";

import ProductList from "../../components/products/ProductList";

import searchService from "../../services/searchService";

export default function Search() {

    const [query, setQuery] =
        useState("");

    const [products, setProducts] =
        useState([]);

    const handleSearch = async () => {

        const response =
            await searchService.search(
                query
            );

        setProducts(
            response.data || response
        );
    };

    return (
        <MainLayout>

            <h1 className="text-3xl font-bold mb-6">
                Recherche
            </h1>

            <div className="flex gap-3 mb-6">

                <input
                    value={query}
                    onChange={(e) =>
                        setQuery(
                            e.target.value
                        )
                    }
                    placeholder="Rechercher..."
                    className="
                    flex-1
                    border
                    p-2
                    rounded
                    "
                />

                <button
                    onClick={handleSearch}
                    className="
                    bg-blue-600
                    text-white
                    px-5
                    rounded
                    "
                >
                    Rechercher
                </button>

            </div>

            <ProductList
                products={products}
            />

        </MainLayout>
    );
}