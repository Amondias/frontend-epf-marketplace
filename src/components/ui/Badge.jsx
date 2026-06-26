export default function Badge({
    children,
    variant = "primary",
}) {
    const variants = {
        primary: "bg-indigo-50 text-indigo-700",
        success: "bg-emerald-50 text-emerald-700",
        warning: "bg-amber-50 text-amber-700",
        danger: "bg-red-50 text-red-700",
        info: "bg-sky-50 text-sky-700",
        neutral: "bg-slate-100 text-slate-700",
    };

    return (
        <span
            className={`
                inline-flex
                items-center
                rounded-full
                px-3 py-1
                text-xs
                font-medium
                ${variants[variant] || variants.primary}
            `}
        >
            {children}
        </span>
    );
}
