import Card from "../ui/Card";
import Badge from "../ui/Badge";

export default function OrderCard({ order }) {
  const statusStyles = {
    pending: "warning",
    processing: "info",
    shipped: "primary",
    delivered: "success",
    cancelled: "danger",
  };

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900">
            Commande #{order.id}
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            {new Date(order.created_at).toLocaleDateString()}
          </p>
        </div>

        <Badge variant={statusStyles[order.status]}>
          {order.status}
        </Badge>
      </div>

      <div className="mt-5 space-y-2">
        <p className="text-sm text-slate-600">
          Articles :
          <span className="ml-2 font-semibold">
            {order.items?.length || 0}
          </span>
        </p>

        <p className="text-sm text-slate-600">
          Total :
          <span className="ml-2 text-lg font-bold text-indigo-600">
            {order.total_amount} FCFA
          </span>
        </p>
      </div>

      {order.items?.length > 0 && (
        <div className="mt-5 border-t pt-4">
          <div className="space-y-2">
            {order.items.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between text-sm"
              >
                <span>{item.product?.name}</span>

                <span className="font-medium">
                  x{item.quantity}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}