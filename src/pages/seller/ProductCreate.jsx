import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import SellerLayout from "../../layouts/SellerLayout";

import ProductForm from "../../components/forms/ProductForm";

import categoryService from "../../services/categoryService";
import productService from "../../services/productService";

export default function ProductCreate() {

    const navigate = useNavigate();

    const [categories,
        setCategories] =
        useState([]);

    useEffect(() => {

        loadCategories();

    }, []);

    const loadCategories = async () => {

        const response =
            await categoryService.getAll();

        setCategories(
            response.data || response
        );
    };

    const handleSubmit = async (
        formData
    ) => {

        await productService.createProduct(
            formData
        );

        navigate(
            "/seller/products"
        );
    };

    return (
        <SellerLayout>

            <h1 className="text-3xl font-bold mb-6">
                Nouveau produit
            </h1>

            <ProductForm
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