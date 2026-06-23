import { useState } from "react";

export default function ProductForm({
    categories = [],
    initialData = {},
    onSubmit,
}) {
    const [form, setForm] = useState({
        name: initialData.name || "",
        description:
            initialData.description || "",
        price: initialData.price || "",
        stock: initialData.stock || "",
        category_id:
            initialData.category_id || "",
        image: null,
    });

    const handleChange = (e) => {
        const value =
            e.target.type === "file"
                ? e.target.files[0]
                : e.target.value;

        setForm({
            ...form,
            [e.target.name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();

        Object.keys(form).forEach((key) => {
            formData.append(
                key,
                form[key]
            );
        });

        onSubmit(formData);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded shadow space-y-4"
        >
            <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Nom"
                className="w-full border p-2 rounded"
            />

            <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Description"
                className="w-full border p-2 rounded"
            />

            <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="Prix"
                className="w-full border p-2 rounded"
            />

            <input
                type="number"
                name="stock"
                value={form.stock}
                onChange={handleChange}
                placeholder="Stock"
                className="w-full border p-2 rounded"
            />

            <select
                name="category_id"
                value={form.category_id}
                onChange={handleChange}
                className="w-full border p-2 rounded"
            >
                <option value="">
                    Catégorie
                </option>

                {categories.map((category) => (
                    <option
                        key={category.id}
                        value={category.id}
                    >
                        {category.name}
                    </option>
                ))}
            </select>

            <input
                type="file"
                name="image"
                onChange={handleChange}
            />

            <button className="bg-green-600 text-white px-4 py-2 rounded">
                Enregistrer
            </button>
        </form>
    );
}