import { useEffect, useState } from "react";

import MainLayout from "../../layouts/MainLayout";

import ConversationList from "../../components/messages/ConversationList";

import MessageItem from "../../components/messages/MessageItem";

import MessageForm from "../../components/messages/MessageForm";

import messageService from "../../services/messageService";

import useAuth from "../../hooks/useAuth";

export default function Messages() {

    const { user } = useAuth();

    const [conversations,
        setConversations] =
        useState([]);

    const [messages,
        setMessages] =
        useState([]);

    const [selectedUser,
        setSelectedUser] =
        useState(null);

    useEffect(() => {

        loadConversations();

    }, []);

    const loadConversations =
        async () => {

        const response =
            await messageService.getConversations();

        setConversations(
            response.data ||
            response
        );
    };

    const selectConversation =
        async (conversation) => {

        setSelectedUser(
            conversation.user
        );

        const response =
            await messageService.getConversation(
                conversation.user.id
            );

        setMessages(
            response.data ||
            response
        );
    };

    const sendMessage =
        async (content) => {

        if (!selectedUser) return;

        await messageService.sendMessage({
            receiver_id:
                selectedUser.id,
            content,
        });

        selectConversation({
            user: selectedUser,
        });
    };

    return (
        <MainLayout>

            <h1 className="text-3xl font-bold mb-6">
                Messages
            </h1>

            <div className="grid md:grid-cols-3 gap-6">

                <ConversationList
                    conversations={
                        conversations
                    }
                    onSelect={
                        selectConversation
                    }
                />

                <div className="md:col-span-2 bg-white rounded shadow p-4">

                    <div className="h-96 overflow-y-auto mb-4">

                        {messages.map(
                            message => (
                                <MessageItem
                                    key={
                                        message.id
                                    }
                                    message={
                                        message
                                    }
                                    currentUser={
                                        user
                                    }
                                />
                            )
                        )}

                    </div>

                    {selectedUser && (
                        <MessageForm
                            onSend={
                                sendMessage
                            }
                        />
                    )}

                </div>

            </div>

        </MainLayout>
    );
}