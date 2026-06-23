import { useState } from "react";

export default function ProfileForm({
    user,
    onSubmit,
}) {
    const [form, setForm] = useState({
        name: user?.name || "",
        city: user?.city || "",
        bio: user?.bio || "",
        avatar: null,
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
                className="w-full border p-2 rounded"
            />

            <input
                name="city"
                value={form.city}
                onChange={handleChange}
                className="w-full border p-2 rounded"
            />

            <textarea
                name="bio"
                value={form.bio}
                onChange={handleChange}
                className="w-full border p-2 rounded"
            />

            <input
                type="file"
                name="avatar"
                onChange={handleChange}
            />

            <button className="bg-blue-600 text-white px-4 py-2 rounded">
                Sauvegarder
            </button>
        </form>
    );
}