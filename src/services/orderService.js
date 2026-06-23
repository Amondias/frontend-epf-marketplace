import api from "./api";

const orderService = {

    createOrder: async (data) => {
        const response = await api.post(
            "/orders",
            data
        );

        return response.data;
    },

    getMyOrders: async () => {
        const response = await api.get(
            "/orders/my-orders"
        );

        return response.data;
    },

    getOrder: async (id) => {
        const response = await api.get(
            `/orders/${id}`
        );

        return response.data;
    },

    cancelOrder: async (id) => {
        const response = await api.post(
            `/orders/${id}/cancel`
        );

        return response.data;
    }

};

export default orderService;