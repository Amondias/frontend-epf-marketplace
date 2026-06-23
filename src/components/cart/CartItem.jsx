export default function CartItem({
    item,
    onIncrease,
    onDecrease,
    onRemove,
}) {
    return (
        <div className="bg-white p-4 rounded shadow flex justify-between items-center">

            <div>
                <h3 className="font-semibold">
                    {item.name}
                </h3>

                <p className="text-gray-500">
                    {item.price} FCFA
                </p>
            </div>

            <div className="flex items-center gap-3">

                <button
                    onClick={() => onDecrease(item.id)}
                    className="px-3 py-1 bg-gray-200 rounded"
                >
                    -
                </button>

                <span>
                    {item.quantity}
                </span>

                <button
                    onClick={() => onIncrease(item.id)}
                    className="px-3 py-1 bg-gray-200 rounded"
                >
                    +
                </button>

                <button
                    onClick={() => onRemove(item.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                >
                    Supprimer
                </button>

            </div>

        </div>
    );
}