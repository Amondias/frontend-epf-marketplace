import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import ProductForm from "../../components/products/ProductForm";
import productService from "../../services/productService";
import categoryService from "../../services/categoryService";
import { buildProductFormData, getErrorMessage } from "../pageHelpers";

export default function CreateProductPage() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [form, setForm] = useState({
        title: "",
        description: "",
        price: "",
        quantity: 1,
        category_id: "",
        status: "published",
    });
    const [image, setImage] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        categoryService.getAll().then(setCategories).catch(() => setCategories([]));
    }, []);

    const update = (event) => {
        if (event.target.name === "image") {
            setImage(event.target.files?.[0]);
            return;
        }
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const submit = async (event) => {
        event.preventDefault();
        setError("");
        try {
            await productService.createProduct(buildProductFormData(form, image));
            navigate("/seller/products");
        } catch (err) {
            setError(getErrorMessage(err, "Creation impossible."));
        }
    };

    return (
        <DashboardLayout>
            <h1 className="mb-6 text-3xl font-black text-slate-950">Nouveau produit</h1>
            {error && <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
            <ProductForm formData={form} categories={categories} onChange={update} onSubmit={submit} />
        </DashboardLayout>
    );
}
