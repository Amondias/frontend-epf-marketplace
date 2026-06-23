export default function CartSummary({
    total,
    onCheckout,
}) {
    return (
        <div className="bg-white p-6 rounded shadow">

            <h2 className="text-xl font-bold mb-4">
                Résumé
            </h2>

            <div className="flex justify-between mb-4">

                <span>Total :</span>

                <span className="font-bold">
                    {total} FCFA
                </span>

            </div>

            <button
                onClick={onCheckout}
                className="w-full bg-green-600 text-white py-2 rounded"
            >
                Passer commande
            </button>

        </div>
    );
}