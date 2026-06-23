export default function OrderDetails({
    order,
}) {
    return (
        <div className="bg-white p-6 rounded shadow">

            <h2 className="text-2xl font-bold mb-6">

                Commande #{order.id}

            </h2>

            <div className="space-y-3">

                <p>
                    <strong>Statut :</strong>{" "}
                    {order.status}
                </p>

                <p>
                    <strong>Total :</strong>{" "}
                    {order.total} FCFA
                </p>

                <p>
                    <strong>Date :</strong>{" "}
                    {order.created_at}
                </p>

            </div>

            <hr className="my-6" />

            <div className="space-y-4">

                {order.items?.map((item) => (
                    <div
                        key={item.id}
                        className="border-b pb-3"
                    >
                        <h4 className="font-semibold">
                            {item.product?.name}
                        </h4>

                        <p>
                            Quantité :
                            {" "}
                            {item.quantity}
                        </p>

                        <p>
                            Prix :
                            {" "}
                            {item.price}
                            {" "}
                            FCFA
                        </p>
                    </div>
                ))}

            </div>

        </div>
    );
}