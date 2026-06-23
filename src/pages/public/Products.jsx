import { useEffect, useState } from "react";

import MainLayout from "../../layouts/MainLayout";

import ProductList from "../../components/products/ProductList";
import ProductFilters from "../../components/products/ProductFilters";

import productService from "../../services/productService";
import categoryService from "../../services/categoryService";

import Loader from "../../components/common/Loader";

export default function Products() {

    const [products, setProducts] = useState([]);

    const [categories, setCategories] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [filters, setFilters] =
        useState({
            category_id: "",
            min_price: "",
            max_price: "",
        });

    useEffect(() => {

        loadCategories();

    }, []);

    useEffect(() => {

        loadProducts();

    }, [filters]);

    const loadCategories = async () => {

        const response =
            await categoryService.getAll();

        setCategories(
            response.data || response
        );
    };

    const loadProducts = async () => {

        try {

            setLoading(true);

            const response =
                await productService.getProducts(
                    filters
                );

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

            <h1 className="text-3xl font-bold mb-6">
                Produits
            </h1>

            <ProductFilters
                categories={categories}
                filters={filters}
                setFilters={setFilters}
            />

            {loading ? (
                <Loader />
            ) : (
                <ProductList products={products} />
            )}

        </MainLayout>
    );
}