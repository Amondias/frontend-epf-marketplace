import Badge from "../ui/Badge";

export default function OrderTable({ orders = [] }) {
  const statusStyles = {
    pending: "warning",
    processing: "info",
    shipped: "primary",
    delivered: "success",
    cancelled: "danger",
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-5 py-4 text-left text-sm font-semibold">
                ID
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold">
                Client
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold">
                Articles
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold">
                Total
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold">
                Statut
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold">
                Date
              </th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-t"
              >
                <td className="px-5 py-4">
                  #{order.id}
                </td>

                <td className="px-5 py-4">
                  {order.user?.name}
                </td>

                <td className="px-5 py-4">
                  {order.items?.length || 0}
                </td>

                <td className="px-5 py-4 font-semibold text-indigo-600">
                  {order.total_amount} FCFA
                </td>

                <td className="px-5 py-4">
                  <Badge
                    variant={statusStyles[order.status]}
                  >
                    {order.status}
                  </Badge>
                </td>

                <td className="px-5 py-4">
                  {new Date(
                    order.created_at
                  ).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}