import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Card from "../components/ui/Card";
import useAuth from "../hooks/useAuth";
import { getErrorMessage } from "./pageHelpers";

export default function LoginPage() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    const submit = async (event) => {
        event.preventDefault();
        setError("");
        try {
            const response = await login(form);
            const role = response.user?.role;
            navigate(role === "admin" ? "/admin/dashboard" : role === "seller" ? "/seller/dashboard" : "/products");
        } catch (err) {
            setError(getErrorMessage(err, "Identifiants invalides."));
        }
    };

    return (
        <MainLayout>
            <div className="mx-auto flex max-w-md px-6 py-16">
                <Card className="w-full p-6">
                    <h1 className="text-2xl font-black text-slate-950">Connexion</h1>
                    <p className="mt-2 text-sm text-slate-600">Accedez a votre espace marketplace.</p>
                    {error && <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
                    <form onSubmit={submit} className="mt-6 space-y-4">
                        <Input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                        <Input type="password" placeholder="Mot de passe" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
                        <Button type="submit" className="w-full">Se connecter</Button>
                    </form>
                    <p className="mt-4 text-sm text-slate-600">
                        Pas de compte ? <Link to="/register" className="font-semibold text-indigo-600">Inscription</Link>
                    </p>
                </Card>
            </div>
        </MainLayout>
    );
}
