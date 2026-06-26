export default function Button({
    children,
    type = "button",
    variant = "primary",
    className = "",
    disabled = false,
    ...props
}) {

    const variants = {
        primary:
            "bg-indigo-600 text-white hover:bg-indigo-500",

        secondary:
            "bg-white text-gray-900 border border-gray-300 hover:bg-gray-50",

        danger:
            "bg-red-600 text-white hover:bg-red-500",
    };

    const disabledClasses = disabled
        ? "cursor-not-allowed opacity-50 hover:bg-current"
        : "";

    return (
        <button
            type={type}
            disabled={disabled}
            className={`
                inline-flex items-center justify-center
                rounded-lg
                px-4 py-2
                text-sm font-semibold
                transition
                ${variants[variant]}
                ${disabledClasses}
                ${className}
            `}
            {...props}
        >
            {children}
        </button>
    );
}