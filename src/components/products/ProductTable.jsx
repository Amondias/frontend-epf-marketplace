import Button from "../ui/Button";

export default function ProductTable({
  products = [],
  onEdit,
  onDelete,
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-5 py-4 text-left text-sm font-semibold">
                Produit
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold">
                Prix
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold">
                Stock
              </th>

              <th className="px-5 py-4 text-left text-sm font-semibold">
                Statut
              </th>

              <th className="px-5 py-4 text-right text-sm font-semibold">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-t"
              >
                <td className="px-5 py-4">
                  <div>
                    <p className="font-semibold">
                      {product.name}
                    </p>

                    <p className="text-sm text-slate-500">
                      {product.category?.name}
                    </p>
                  </div>
                </td>

                <td className="px-5 py-4">
                  {product.price} FCFA
                </td>

                <td className="px-5 py-4">
                  {product.stock}
                </td>

                <td className="px-5 py-4">
                  {product.status}
                </td>

                <td className="px-5 py-4">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="secondary"
                      onClick={() => onEdit?.(product)}
                    >
                      Modifier
                    </Button>

                    <Button
                      variant="danger"
                      onClick={() => onDelete?.(product)}
                    >
                      Supprimer
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}