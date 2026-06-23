import { useState } from "react";

export default function CouponForm({
    initialData = {},
    onSubmit,
}) {
    const [form, setForm] = useState({
        code: initialData.code || "",
        discount:
            initialData.discount || "",
        expires_at:
            initialData.expires_at || "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]:
                e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded shadow space-y-4"
        >
            <input
                name="code"
                value={form.code}
                onChange={handleChange}
                placeholder="Code"
                className="w-full border p-2 rounded"
            />

            <input
                type="number"
                name="discount"
                value={form.discount}
                onChange={handleChange}
                placeholder="Réduction"
                className="w-full border p-2 rounded"
            />

            <input
                type="date"
                name="expires_at"
                value={form.expires_at}
                onChange={handleChange}
                className="w-full border p-2 rounded"
            />

            <button className="bg-blue-600 text-white px-4 py-2 rounded">
                Sauvegarder
            </button>
        </form>
    );
}