import { useEffect, useState } from "react";

import {
    useNavigate,
    useParams,
} from "react-router-dom";

import SellerLayout from "../../layouts/SellerLayout";

import ProductForm from "../../components/forms/ProductForm";

import categoryService from "../../services/categoryService";
import productService from "../../services/productService";

import Loader from "../../components/common/Loader";

export default function ProductEdit() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [product, setProduct] =
        useState(null);

    const [categories,
        setCategories] =
        useState([]);

    useEffect(() => {

        loadData();

    }, []);

    const loadData = async () => {

        const productResponse =
            await productService.getProduct(
                id
            );

        const categoriesResponse =
            await categoryService.getAll();

        setProduct(
            productResponse.data ||
            productResponse
        );

        setCategories(
            categoriesResponse.data ||
            categoriesResponse
        );
    };

    const handleSubmit = async (
        formData
    ) => {

        await productService.updateProduct(
            id,
            formData
        );

        navigate(
            "/seller/products"
        );
    };

    if (!product) {
        return <Loader />;
    }

    return (
        <SellerLayout>

            <h1 className="text-3xl font-bold mb-6">
                Modifier produit
            </h1>

            <ProductForm
                initialData={
                    product
                }
                categories={
                    categories
                }
                onSubmit={
                    handleSubmit
                }
            />

        </SellerLayout>
    );
}