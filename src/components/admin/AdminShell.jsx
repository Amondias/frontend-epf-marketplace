import { NavLink } from "react-router-dom";
import MainLayout from "../layout/MainLayout";

const adminLinks = [
  { to: "/admin/dashboard", label: "Vue d'ensemble" },
  { to: "/admin/products", label: "Produits" },
  { to: "/admin/users", label: "Utilisateurs" },
  { to: "/admin/coupons", label: "Coupons" },
];

export default function AdminShell({ title, subtitle, actions, children }) {
  return (
    <MainLayout>
      <div className="bg-slate-50">
        <div className="container mx-auto px-6 py-10">
          <div className="rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-sm shadow-slate-200/70">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600">
                  Administration
                </p>
                <h1 className="mt-3 text-3xl font-black text-slate-950 sm:text-4xl">
                  {title}
                </h1>
                {subtitle && (
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                    {subtitle}
                  </p>
                )}
              </div>

              {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
            </div>

            <nav className="mt-8 flex gap-2 overflow-x-auto rounded-2xl border border-slate-200 bg-slate-100 p-1">
              {adminLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `whitespace-nowrap rounded-xl px-4 py-2 text-sm font-semibold transition ${
                      isActive
                        ? "bg-white text-indigo-700 shadow-sm"
                        : "text-slate-600 hover:bg-white/70 hover:text-slate-950"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </div>

          <div className="mt-8">{children}</div>
        </div>
      </div>
    </MainLayout>
  );
}
