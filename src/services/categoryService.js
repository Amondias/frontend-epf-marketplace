import api from "./api";

const categoryService = {

    getAll: async () => {
        const response = await api.get("/categories");
        return response.data;
    },

    getCategory: async (slug) => {
        const response = await api.get(`/categories/${slug}`);
        return response.data;
    }

};

export default categoryService;
