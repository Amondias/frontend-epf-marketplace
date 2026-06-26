import { useEffect, useState } from "react";
import AdminShell from "../../components/admin/AdminShell";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import Card from "../../components/ui/Card";
import adminService from "../../services/adminService";

export default function UsersPage() {
    const [users, setUsers] = useState([]);
    const [role, setRole] = useState("");

    const loadUsers = () => {
        adminService.users(role ? { role } : {})
            .then((response) => setUsers(response.data || []))
            .catch(() => setUsers([]));
    };

    useEffect(loadUsers, [role]);

    const toggle = async (user) => {
        if (user.suspended_at) {
            await adminService.activateUser(user.id);
        } else {
            await adminService.suspendUser(user.id);
        }
        loadUsers();
    };

    return (
        <AdminShell
            title="Utilisateurs"
            subtitle="Gestion des comptes acheteurs, vendeurs et administrateurs."
            actions={
                <select value={role} onChange={(event) => setRole(event.target.value)} className="rounded-lg border border-slate-300 px-4 py-2">
                    <option value="">Tous les roles</option>
                    <option value="buyer">Acheteurs</option>
                    <option value="seller">Vendeurs</option>
                    <option value="admin">Admins</option>
                </select>
            }
        >
            <div className="grid gap-4">
                {users.map((user) => (
                    <Card key={user.id} className="p-5">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <div>
                                <p className="font-bold text-slate-950">{user.name}</p>
                                <p className="text-sm text-slate-500">{user.email}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Badge variant="neutral">{user.role}</Badge>
                                {user.suspended_at && <Badge variant="danger">Suspendu</Badge>}
                                <Button variant={user.suspended_at ? "secondary" : "danger"} onClick={() => toggle(user)}>
                                    {user.suspended_at ? "Reactiver" : "Suspendre"}
                                </Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </AdminShell>
    );
}
