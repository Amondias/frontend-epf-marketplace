import api from "./api";

const favoriteService = {

    getFavorites: async () => {
        const response = await api.get("/favorites");
        return response.data;
    },

    addFavorite: async (productId) => {
        const response = await api.post(
            "/favorites/add",
            {
                product_id: productId
            }
        );

        return response.data;
    },

    removeFavorite: async (id) => {
        const response = await api.delete(
            `/favorites/${id}`
        );

        return response.data;
    }

};

export default favoriteService;