import api from "./api";

const adminService = {

    stats: async () => {
        const response = await api.get(
            "/admin/stats"
        );

        return response.data;
    },

    users: async () => {
        const response = await api.get(
            "/admin/users"
        );

        return response.data;
    },

    suspendUser: async (id) => {
        const response = await api.post(
            `/admin/users/${id}/suspend`
        );

        return response.data;
    },

    activateUser: async (id) => {
        const response = await api.post(
            `/admin/users/${id}/activate`
        );

        return response.data;
    },

    updateProductStatus: async (
        id,
        status
    ) => {

        const response = await api.patch(
            `/admin/products/${id}/status`,
            { status }
        );

        return response.data;
    },

    forceDeleteProduct: async (id) => {
        const response = await api.delete(
            `/admin/products/${id}/force`
        );

        return response.data;
    },

    coupons: async () => {
        const response = await api.get(
            "/admin/coupons"
        );

        return response.data;
    },

    createCoupon: async (data) => {
        const response = await api.post(
            "/admin/coupons",
            data
        );

        return response.data;
    },

    updateCoupon: async (
        id,
        data
    ) => {

        const response = await api.put(
            `/admin/coupons/${id}`,
            data
        );

        return response.data;
    },

    deleteCoupon: async (id) => {
        const response = await api.delete(
            `/admin/coupons/${id}`
        );

        return response.data;
    }

};

export default adminService;