import { useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import DashboardLayout from "../components/layout/DashboardLayout";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Card from "../components/ui/Card";
import authService from "../services/authService";
import useAuth from "../hooks/useAuth";
import { getErrorMessage } from "./pageHelpers";

export default function ProfilePage() {
    const { user, setUser } = useAuth();
    const [form, setForm] = useState({
        name: user?.name || "",
        city: user?.city || "",
        phone: user?.phone || "",
        bio: user?.bio || "",
    });
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(user?.profile_image || null);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const update = (event) => setForm({ ...form, [event.target.name]: event.target.value });

    const submit = async (event) => {
        event.preventDefault();
        setMessage("");
        setError("");
        const data = new FormData();
        Object.entries(form).forEach(([key, value]) => data.append(key, value || ""));
        if (image) {
            data.append("profile_image", image);
        }

        try {
            const response = await authService.updateProfile(data);
            setUser(response.user);
            localStorage.setItem("user", JSON.stringify(response.user));
            setImagePreview(response.user.profile_image || imagePreview);
            setMessage("Profil mis a jour.");
        } catch (err) {
            setError(getErrorMessage(err, "Mise a jour impossible."));
        }
    };

    return (
        user?.role === "seller" ? (
            <DashboardLayout>
                <div className="mx-auto max-w-3xl px-6 py-10">
                    <h1 className="text-3xl font-black text-slate-950">Mon profil</h1>
                    <Card className="mt-6 p-6">
                        {message && <p className="mb-4 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-700">{message}</p>}
                        {error && <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
                        <form onSubmit={submit} className="grid gap-4">
                            <Input name="name" value={form.name} onChange={update} placeholder="Nom" />
                            <div className="grid gap-4 sm:grid-cols-2">
                                <Input name="city" value={form.city} onChange={update} placeholder="Ville" />
                                <Input name="phone" value={form.phone} onChange={update} placeholder="Telephone" />
                            </div>
                            <textarea name="bio" value={form.bio} onChange={update} rows={4} placeholder="Bio" className="rounded-lg border border-gray-300 px-4 py-3" />
                            <div>
                                <label className="block text-sm font-medium text-slate-700">Photo de profil</label>
                                <div className="mt-3 flex items-center gap-4">
                                    {imagePreview ? (
                                        <img src={imagePreview} alt="Aperçu profil" className="h-20 w-20 rounded-full object-cover border border-slate-200" />
                                    ) : (
                                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 text-sm text-slate-500 border border-slate-200">
                                            Aucun
                                        </div>
                                    )}
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={(event) => {
                                            const file = event.target.files?.[0] || null;
                                            setImage(file);
                                            if (file) {
                                                setImagePreview(URL.createObjectURL(file));
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                            <Button type="submit">Enregistrer</Button>
                        </form>
                    </Card>
                </div>
            </DashboardLayout>
        ) : (
            <MainLayout>
                <div className="mx-auto max-w-3xl px-6 py-10">
                    <h1 className="text-3xl font-black text-slate-950">Mon profil</h1>
                    <Card className="mt-6 p-6">
                        {message && <p className="mb-4 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-700">{message}</p>}
                        {error && <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
                        <form onSubmit={submit} className="grid gap-4">
                            <Input name="name" value={form.name} onChange={update} placeholder="Nom" />
                            <div className="grid gap-4 sm:grid-cols-2">
                                <Input name="city" value={form.city} onChange={update} placeholder="Ville" />
                                <Input name="phone" value={form.phone} onChange={update} placeholder="Telephone" />
                            </div>
                            <textarea name="bio" value={form.bio} onChange={update} rows={4} placeholder="Bio" className="rounded-lg border border-gray-300 px-4 py-3" />
                            <div>
                                <label className="block text-sm font-medium text-slate-700">Photo de profil</label>
                                <div className="mt-3 flex items-center gap-4">
                                    {imagePreview ? (
                                        <img src={imagePreview} alt="Aperçu profil" className="h-20 w-20 rounded-full object-cover border border-slate-200" />
                                    ) : (
                                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 text-sm text-slate-500 border border-slate-200">
                                            Aucun
                                        </div>
                                    )}
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={(event) => {
                                            const file = event.target.files?.[0] || null;
                                            setImage(file);
                                            if (file) {
                                                setImagePreview(URL.createObjectURL(file));
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                            <Button type="submit">Enregistrer</Button>
                        </form>
                    </Card>
                </div>
            </MainLayout>
        )
    );
}
