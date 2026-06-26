import { useEffect, useState } from "react";
import AdminShell from "../../components/admin/AdminShell";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Badge from "../../components/ui/Badge";
import Card from "../../components/ui/Card";
import adminService from "../../services/adminService";

const emptyForm = {
    code: "",
    type: "percent",
    value: "",
    usage_limit: "",
    min_order_total: "",
    starts_at: "",
    ends_at: "",
    is_active: true,
};

export default function CouponsPage() {
    const [coupons, setCoupons] = useState([]);
    const [form, setForm] = useState(emptyForm);

    const loadCoupons = () => {
        adminService.coupons()
            .then((response) => setCoupons(response.data || []))
            .catch(() => setCoupons([]));
    };

    useEffect(loadCoupons, []);

    const update = (event) => {
        const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
        setForm({ ...form, [event.target.name]: value });
    };

    const submit = async (event) => {
        event.preventDefault();
        await adminService.createCoupon({
            ...form,
            usage_limit: form.usage_limit || null,
            min_order_total: form.min_order_total || null,
            starts_at: form.starts_at || null,
            ends_at: form.ends_at || null,
        });
        setForm(emptyForm);
        loadCoupons();
    };

    const remove = async (id) => {
        await adminService.deleteCoupon(id);
        loadCoupons();
    };

    return (
        <AdminShell title="Coupons" subtitle="Creation et suivi des codes promotionnels.">
            <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
                <Card className="p-5">
                    <h2 className="font-bold text-slate-950">Nouveau coupon</h2>
                    <form onSubmit={submit} className="mt-4 grid gap-3">
                        <Input name="code" value={form.code} onChange={update} placeholder="CODE" required />
                        <select name="type" value={form.type} onChange={update} className="rounded-lg border border-gray-300 px-4 py-3">
                            <option value="percent">Pourcentage</option>
                            <option value="fixed">Montant fixe</option>
                        </select>
                        <Input name="value" type="number" value={form.value} onChange={update} placeholder="Valeur" required />
                        <Input name="usage_limit" type="number" value={form.usage_limit} onChange={update} placeholder="Limite d'utilisation" />
                        <Input name="min_order_total" type="number" value={form.min_order_total} onChange={update} placeholder="Minimum commande" />
                        <Input name="starts_at" type="datetime-local" value={form.starts_at} onChange={update} />
                        <Input name="ends_at" type="datetime-local" value={form.ends_at} onChange={update} />
                        <label className="flex items-center gap-2 text-sm text-slate-600">
                            <input type="checkbox" name="is_active" checked={form.is_active} onChange={update} />
                            Actif
                        </label>
                        <Button type="submit">Creer</Button>
                    </form>
                </Card>

                <div className="grid gap-4">
                    {coupons.map((coupon) => (
                        <Card key={coupon.id} className="p-5">
                            <div className="flex flex-wrap items-center justify-between gap-4">
                                <div>
                                    <p className="font-bold text-slate-950">{coupon.code}</p>
                                    <p className="text-sm text-slate-500">
                                        {coupon.type} - {coupon.value} - utilise {coupon.times_used} fois
                                    </p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Badge variant={coupon.is_active ? "success" : "danger"}>
                                        {coupon.is_active ? "Actif" : "Inactif"}
                                    </Badge>
                                    <Button variant="danger" onClick={() => remove(coupon.id)}>Supprimer</Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </AdminShell>
    );
}
