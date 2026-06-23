import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";

import ProductReviews from "../../components/products/ProductReviews";

import productService from "../../services/productService";
import reviewService from "../../services/reviewService";

import Loader from "../../components/common/Loader";

import useCart from "../../hooks/useCart";

export default function ProductDetails() {

    const { id } = useParams();

    const { addToCart } = useCart();

    const [product, setProduct] =
        useState(null);

    const [reviews, setReviews] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        loadProduct();

        loadReviews();

    }, [id]);

    const loadProduct = async () => {

        const response =
            await productService.getProduct(id);

        setProduct(
            response.data || response
        );

        setLoading(false);
    };

    const loadReviews = async () => {

        const response =
            await reviewService.getReviews(id);

        setReviews(
            response.data || response
        );
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <MainLayout>

            <div className="grid md:grid-cols-2 gap-10">

                <img
                    src={product.image}
                    alt={product.name}
                    className="rounded shadow"
                />

                <div>

                    <h1 className="text-3xl font-bold">
                        {product.name}
                    </h1>

                    <p className="my-4">
                        {product.description}
                    </p>

                    <p className="text-2xl font-bold text-blue-600">
                        {product.price} FCFA
                    </p>

                    <button
                        onClick={() =>
                            addToCart(product)
                        }
                        className="
                        mt-5
                        bg-green-600
                        text-white
                        px-5
                        py-2
                        rounded
                        "
                    >
                        Ajouter au panier
                    </button>

                </div>

            </div>

            <div className="mt-10">

                <h2 className="text-2xl font-bold mb-4">
                    Avis
                </h2>

                <ProductReviews
                    reviews={reviews}
                />

            </div>

        </MainLayout>
    );
}