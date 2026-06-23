import api from "./api";

const cartService = {

    getCart: async () => {
        const response = await api.get("/cart");
        return response.data;
    },

    addToCart: async (data) => {
        const response = await api.post("/cart/add", data);
        return response.data;
    },

    updateItem: async (id, data) => {
        const response = await api.put(
            `/cart/items/${id}`,
            data
        );

        return response.data;
    },

    removeItem: async (id) => {
        const response = await api.delete(
            `/cart/items/${id}`
        );

        return response.data;
    },

    clearCart: async () => {
        const response = await api.delete("/cart/clear");
        return response.data;
    }

};

export default cartService;