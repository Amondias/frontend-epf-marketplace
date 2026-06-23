import api from "./api";

const reviewService = {

    getReviews: async (productId) => {
        const response = await api.get(
            `/products/${productId}/reviews`
        );

        return response.data;
    },

    addReview: async (
        productId,
        data
    ) => {

        const response = await api.post(
            `/products/${productId}/reviews`,
            data
        );

        return response.data;
    },

    deleteReview: async (id) => {
        const response = await api.delete(
            `/reviews/${id}`
        );

        return response.data;
    }

};

export default reviewService;