export default function SectionTitle({
    title,
    subtitle,
}) {
    return (
        <div className="mb-10">

            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                {title}
            </h2>

            {subtitle && (
                <p className="mt-3 text-gray-600">
                    {subtitle}
                </p>
            )}

        </div>
    );
}