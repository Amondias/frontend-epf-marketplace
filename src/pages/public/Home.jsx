import { useEffect, useState } from "react";

import MainLayout from "../../layouts/MainLayout";

import ProductList from "../../components/products/ProductList";

import productService from "../../services/productService";

import Loader from "../../components/common/Loader";

export default function Home() {

    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadProducts();

    }, []);

    const loadProducts = async () => {

        try {

            const response =
                await productService.getTopSelling();

            setProducts(
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

            <div className="mb-10">

                <h1 className="text-4xl font-bold mb-4">
                    Marketplace EPF
                </h1>

                <p className="text-gray-600">
                    Achetez et vendez facilement vos produits.
                </p>

            </div>

            {loading ? (
                <Loader />
            ) : (
                <ProductList products={products} />
            )}

        </MainLayout>
    );
}