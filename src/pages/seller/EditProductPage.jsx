import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import ProductForm from "../../components/products/ProductForm";
import productService from "../../services/productService";
import categoryService from "../../services/categoryService";
import { buildProductFormData, getErrorMessage } from "../pageHelpers";

export default function EditProductPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [form, setForm] = useState({
        title: "",
        description: "",
        price: "",
        quantity: "",
        category_id: "",
        status: "published",
    });
    const [image, setImage] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        categoryService.getAll().then(setCategories).catch(() => setCategories([]));
        productService.getProduct(id)
            .then((product) => setForm({
                title: product.title || "",
                description: product.description || "",
                price: product.price || "",
                quantity: product.quantity || "",
                category_id: product.category?.id || "",
                status: product.status || "published",
            }))
            .catch(() => {});
    }, [id]);

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
            await productService.updateProduct(id, buildProductFormData(form, image));
            navigate("/seller/products");
        } catch (err) {
            setError(getErrorMessage(err, "Mise a jour impossible."));
        }
    };

    return (
        <DashboardLayout>
            <h1 className="mb-6 text-3xl font-black text-slate-950">Modifier le produit</h1>
            {error && <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
            <ProductForm formData={form} categories={categories} onChange={update} onSubmit={submit} />
        </DashboardLayout>
    );
}
