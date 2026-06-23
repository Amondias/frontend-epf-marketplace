import { useState } from "react";

export default function RegisterForm({
    onSubmit,
    loading = false,
}) {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        role: "buyer",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
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
                type="text"
                name="name"
                placeholder="Nom"
                value={form.name}
                onChange={handleChange}
                className="w-full border p-2 rounded"
            />

            <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full border p-2 rounded"
            />

            <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full border p-2 rounded"
            >
                <option value="buyer">
                    Acheteur
                </option>

                <option value="seller">
                    Vendeur
                </option>
            </select>

            <input
                type="password"
                name="password"
                placeholder="Mot de passe"
                value={form.password}
                onChange={handleChange}
                className="w-full border p-2 rounded"
            />

            <input
                type="password"
                name="password_confirmation"
                placeholder="Confirmation"
                value={form.password_confirmation}
                onChange={handleChange}
                className="w-full border p-2 rounded"
            />

            <button
                className="w-full bg-green-600 text-white py-2 rounded"
            >
                Inscription
            </button>
        </form>
    );
}