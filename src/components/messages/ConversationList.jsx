export default function ConversationList({
    conversations = [],
    onSelect,
}) {
    return (
        <div className="bg-white rounded shadow">

            {conversations.map(
                (conversation) => (
                    <button
                        key={conversation.id}
                        onClick={() =>
                            onSelect(
                                conversation
                            )
                        }
                        className="w-full text-left p-4 border-b hover:bg-gray-50"
                    >
                        <h3 className="font-semibold">
                            {
                                conversation.user
                                    ?.name
                            }
                        </h3>
                    </button>
                )
            )}

        </div>
    );
}