import { Link } from "react-router-dom";

export default function OrderCard({
    order,
}) {
    return (
        <div className="bg-white p-4 rounded shadow">

            <div className="flex justify-between">

                <h3 className="font-bold">
                    Commande #{order.id}
                </h3>

                <span>
                    {order.status}
                </span>

            </div>

            <p className="mt-2">
                Total : {order.total} FCFA
            </p>

            <Link
                to={`/orders/${order.id}`}
                className="inline-block mt-3 text-blue-600"
            >
                Voir détails
            </Link>

        </div>
    );
}