export default function MessageItem({
    message,
    currentUser,
}) {
    const mine =
        message.sender_id ===
        currentUser?.id;

    return (
        <div
            className={`mb-3 flex ${
                mine
                    ? "justify-end"
                    : "justify-start"
            }`}
        >
            <div
                className={`
                max-w-xs
                p-3
                rounded
                ${
                    mine
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200"
                }
            `}
            >
                {message.content}
            </div>
        </div>
    );
}