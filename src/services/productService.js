import api from "./api";

const productService = {

    getProducts: async (params = {}) => {
        const response = await api.get("/products", {
            params,
        });

        return response.data;
    },

    getProduct: async (id) => {
        const response = await api.get(`/products/${id}`);
        return response.data;
    },

    getTopSelling: async () => {
        const response = await api.get("/products/top-selling");
        return response.data;
    },

    getMyProducts: async () => {
        const response = await api.get("/products/my-products");
        return response.data;
    },

    createProduct: async (data) => {

        const response = await api.post(
            "/products",
            data,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        );

        return response.data;
    },

    updateProduct: async (id, data) => {

        const response = await api.post(
            `/products/${id}`,
            data,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        );

        return response.data;
    },

    deleteProduct: async (id) => {
        const response = await api.delete(`/products/${id}`);
        return response.data;
    }

};

export default productService;