import api from "./api";

const sellerService = {

    dashboard: async () => {
        const response = await api.get(
            "/seller/dashboard"
        );

        return response.data;
    },

    statistics: async () => {
        const response = await api.get(
            "/seller/statistics"
        );

        return response.data;
    },

    orders: async () => {
        const response = await api.get(
            "/seller/orders"
        );

        return response.data;
    },

    getSeller: async (id) => {
        const response = await api.get(
            `/sellers/${id}`
        );

        return response.data;
    },

    getSellerProducts: async (id) => {
        const response = await api.get(
            `/sellers/${id}/products`
        );

        return response.data;
    },

    getSellerReviews: async (id) => {
        const response = await api.get(
            `/sellers/${id}/reviews`
        );

        return response.data;
    }

};

export default sellerService;