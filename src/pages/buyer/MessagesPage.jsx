import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MainLayout from "../../components/layout/MainLayout";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import messageService from "../../services/messageService";
import { getErrorMessage } from "../pageHelpers";

export default function MessagesPage() {
    const [searchParams] = useSearchParams();
    const [conversations, setConversations] = useState([]);
    const [selectedUser, setSelectedUser] = useState(searchParams.get("user") || "");
    const [productId] = useState(searchParams.get("product") || "");
    const [thread, setThread] = useState([]);
    const [content, setContent] = useState("");
    const [error, setError] = useState("");

    const loadConversations = () => {
        messageService.getConversations()
            .then((response) => setConversations(response.data || []))
            .catch((err) => setError(getErrorMessage(err, "Impossible de charger les conversations.")));
    };

    const loadThread = (userId) => {
        if (!userId) return;
        messageService.getConversation(userId, productId ? { product_id: productId } : {})
            .then((response) => setThread((response.data || []).reverse()))
            .catch((err) => setError(getErrorMessage(err, "Impossible de charger les messages.")));
    };

    useEffect(loadConversations, []);
    useEffect(() => loadThread(selectedUser), [selectedUser]);

    const send = async (event) => {
        event.preventDefault();
        if (!selectedUser || !content.trim()) return;
        await messageService.sendMessage({
            recipient_id: selectedUser,
            product_id: productId || undefined,
            content,
        });
        setContent("");
        loadThread(selectedUser);
        loadConversations();
    };

    return (
        <MainLayout>
            <div className="mx-auto grid max-w-6xl gap-6 px-6 py-10 lg:grid-cols-[320px_1fr]">
                <Card className="p-4">
                    <h1 className="text-xl font-black text-slate-950">Messages</h1>
                    {error && <p className="mt-3 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
                    <div className="mt-4 space-y-2">
                        {conversations.map((conversation) => (
                            <button
                                key={`${conversation.user?.id}-${conversation.product?.id || "general"}`}
                                type="button"
                                onClick={() => setSelectedUser(String(conversation.user?.id || ""))}
                                className="w-full rounded-xl border border-slate-200 p-3 text-left hover:bg-slate-50"
                            >
                                <p className="font-semibold text-slate-950">{conversation.user?.name}</p>
                                <p className="line-clamp-1 text-sm text-slate-500">{conversation.last_message?.content}</p>
                            </button>
                        ))}
                    </div>
                </Card>

                <Card className="flex min-h-[520px] flex-col p-4">
                    <div className="flex-1 space-y-3 overflow-y-auto">
                        {thread.map((message) => (
                            <div key={message.id} className="rounded-xl bg-slate-50 p-3">
                                <p className="text-sm font-semibold text-slate-950">{message.sender?.name}</p>
                                <p className="mt-1 text-slate-700">{message.content}</p>
                            </div>
                        ))}
                    </div>
                    <form onSubmit={send} className="mt-4 flex gap-3">
                        <input
                            value={content}
                            onChange={(event) => setContent(event.target.value)}
                            placeholder={selectedUser ? "Votre message" : "Selectionnez une conversation"}
                            className="flex-1 rounded-lg border border-gray-300 px-4 py-3"
                        />
                        <Button type="submit">Envoyer</Button>
                    </form>
                </Card>
            </div>
        </MainLayout>
    );
}
