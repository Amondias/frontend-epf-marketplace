import api from "./api";

const messageService = {

    getConversations: async () => {
        const response = await api.get(
            "/messages/conversations"
        );

        return response.data;
    },

    getConversation: async (userId, params = {}) => {
        const response = await api.get(
            `/messages/with/${userId}`,
            { params }
        );

        return response.data;
    },

    sendMessage: async (data) => {
        const response = await api.post(
            "/messages",
            data
        );

        return response.data;
    },

    unreadCount: async () => {
        const response = await api.get(
            "/messages/unread-count"
        );

        return response.data;
    }

};

export default messageService;
