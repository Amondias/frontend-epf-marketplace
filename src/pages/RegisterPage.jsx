import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Card from "../components/ui/Card";
import useAuth from "../hooks/useAuth";
import { getErrorMessage } from "./pageHelpers";

export default function RegisterPage() {
    const navigate = useNavigate();
    const { register } = useAuth();
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "buyer",
        city: "",
        phone: "",
    });
    const [error, setError] = useState("");

    const update = (event) => setForm({ ...form, [event.target.name]: event.target.value });

    const submit = async (event) => {
        event.preventDefault();
        setError("");
        try {
            const response = await register(form);
            navigate(response.user?.role === "seller" ? "/seller/dashboard" : "/products");
        } catch (err) {
            setError(getErrorMessage(err, "Inscription impossible."));
        }
    };

    return (
        <MainLayout>
            <div className="mx-auto flex max-w-xl px-6 py-16">
                <Card className="w-full p-6">
                    <h1 className="text-2xl font-black text-slate-950">Inscription</h1>
                    <p className="mt-2 text-sm text-slate-600">Creez un compte acheteur ou vendeur.</p>
                    {error && <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
                    <form onSubmit={submit} className="mt-6 grid gap-4">
                        <Input name="name" placeholder="Nom complet" value={form.name} onChange={update} required />
                        <Input name="email" type="email" placeholder="Email" value={form.email} onChange={update} required />
                        <Input name="password" type="password" placeholder="Mot de passe" value={form.password} onChange={update} required />
                        <select name="role" value={form.role} onChange={update} className="rounded-lg border border-gray-300 px-4 py-3">
                            <option value="buyer">Acheteur</option>
                            <option value="seller">Vendeur</option>
                        </select>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <Input name="city" placeholder="Ville" value={form.city} onChange={update} />
                            <Input name="phone" placeholder="Telephone" value={form.phone} onChange={update} />
                        </div>
                        <Button type="submit" className="w-full">Creer le compte</Button>
                    </form>
                    <p className="mt-4 text-sm text-slate-600">
                        Deja inscrit ? <Link to="/login" className="font-semibold text-indigo-600">Connexion</Link>
                    </p>
                </Card>
            </div>
        </MainLayout>
    );
}
