export default function CouponTable({
    coupons = [],
    onDelete,
}) {
    return (
        <div className="bg-white rounded shadow overflow-x-auto">

            <table className="w-full">

                <thead>

                    <tr className="bg-gray-100">

                        <th className="p-3">
                            Code
                        </th>

                        <th className="p-3">
                            Réduction
                        </th>

                        <th className="p-3">
                            Expiration
                        </th>

                        <th className="p-3">
                            Action
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {coupons.map(
                        (coupon) => (
                            <tr
                                key={coupon.id}
                            >
                                <td className="p-3">
                                    {
                                        coupon.code
                                    }
                                </td>

                                <td className="p-3">
                                    {
                                        coupon.discount
                                    }
                                    %
                                </td>

                                <td className="p-3">
                                    {
                                        coupon.expires_at
                                    }
                                </td>

                                <td className="p-3">

                                    <button
                                        onClick={() =>
                                            onDelete(
                                                coupon.id
                                            )
                                        }
                                        className="bg-red-500 text-white px-3 py-1 rounded"
                                    >
                                        Supprimer
                                    </button>

                                </td>
                            </tr>
                        )
                    )}

                </tbody>

            </table>

        </div>
    );
}