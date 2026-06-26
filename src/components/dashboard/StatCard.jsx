import Card from "../ui/Card";

export default function StatCard({
  title,
  value,
  icon,
  description,
}) {
  return (
    <Card className="p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h3 className="mt-3 text-3xl font-bold text-slate-900">
            {value}
          </h3>

          {description && (
            <p className="mt-2 text-sm text-slate-500">
              {description}
            </p>
          )}
        </div>

        {icon && (
          <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
}