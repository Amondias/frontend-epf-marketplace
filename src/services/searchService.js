import api from "./api";

const searchService = {

    search: async (
        query,
        type = "all"
    ) => {

        const response = await api.get(
            "/search",
            {
                params: {
                    q: query,
                    type
                }
            }
        );

        return response.data;
    }

};

export default searchService;