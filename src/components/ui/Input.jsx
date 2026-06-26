export default function Input({
    className = "",
    ...props
}) {
    return (
        <input
            className={`
                w-full
                rounded-lg
                border border-gray-300
                px-4 py-3
                outline-none
                focus:border-indigo-500
                focus:ring-2
                focus:ring-indigo-100
                ${className}
            `}
            {...props}
        />
    );
}