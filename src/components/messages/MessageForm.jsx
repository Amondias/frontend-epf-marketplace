import { useState } from "react";

export default function MessageForm({
    onSend,
}) {
    const [message, setMessage] =
        useState("");

    const handleSubmit = (e) => {

        e.preventDefault();

        if (!message.trim()) {
            return;
        }

        onSend(message);

        setMessage("");
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex gap-2"
        >
            <input
                value={message}
                onChange={(e) =>
                    setMessage(
                        e.target.value
                    )
                }
                placeholder="Votre message..."
                className="flex-1 border p-2 rounded"
            />

            <button
                className="bg-blue-600 text-white px-4 rounded"
            >
                Envoyer
            </button>

        </form>
    );
}