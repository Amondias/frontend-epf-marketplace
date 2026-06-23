import { useState } from "react";

export default function LoginForm({
    onSubmit,
    loading = false,
}) {
    const [form, setForm] = useState({
        email: "",
        password: "",
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
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full border p-2 rounded"
            />

            <input
                type="password"
                name="password"
                placeholder="Mot de passe"
                value={form.password}
                onChange={handleChange}
                className="w-full border p-2 rounded"
            />

            <button
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded"
            >
                Connexion
            </button>
        </form>
    );
}