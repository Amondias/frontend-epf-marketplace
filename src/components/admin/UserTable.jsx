export default function UserTable({
    users = [],
    onSuspend,
    onActivate,
}) {
    return (
        <div className="bg-white rounded shadow overflow-x-auto">

            <table className="w-full">

                <thead>

                    <tr className="bg-gray-100">

                        <th className="p-3 text-left">
                            Nom
                        </th>

                        <th className="p-3 text-left">
                            Email
                        </th>

                        <th className="p-3 text-left">
                            Rôle
                        </th>

                        <th className="p-3 text-left">
                            Actions
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {users.map((user) => (
                        <tr key={user.id}>

                            <td className="p-3">
                                {user.name}
                            </td>

                            <td className="p-3">
                                {user.email}
                            </td>

                            <td className="p-3">
                                {user.role}
                            </td>

                            <td className="p-3 flex gap-2">

                                <button
                                    onClick={() =>
                                        onSuspend(
                                            user.id
                                        )
                                    }
                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                >
                                    Suspendre
                                </button>

                                <button
                                    onClick={() =>
                                        onActivate(
                                            user.id
                                        )
                                    }
                                    className="bg-green-500 text-white px-2 py-1 rounded"
                                >
                                    Activer
                                </button>

                            </td>

                        </tr>
                    ))}

                </tbody>

            </table>

        </div>
    );
}