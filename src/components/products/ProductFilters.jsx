export default function ProductFilters({
    categories = [],
    filters,
    setFilters,
}) {
    return (
        <div className="bg-white p-4 rounded shadow mb-6">

            <div className="grid md:grid-cols-4 gap-4">

                <input
                    placeholder="Prix min"
                    value={
                        filters.min_price
                    }
                    onChange={(e) =>
                        setFilters({
                            ...filters,
                            min_price:
                                e.target.value,
                        })
                    }
                    className="border p-2 rounded"
                />

                <input
                    placeholder="Prix max"
                    value={
                        filters.max_price
                    }
                    onChange={(e) =>
                        setFilters({
                            ...filters,
                            max_price:
                                e.target.value,
                        })
                    }
                    className="border p-2 rounded"
                />

                <select
                    value={
                        filters.category_id
                    }
                    onChange={(e) =>
                        setFilters({
                            ...filters,
                            category_id:
                                e.target.value,
                        })
                    }
                    className="border p-2 rounded"
                >
                    <option value="">
                        Toutes
                    </option>

                    {categories.map(
                        (category) => (
                            <option
                                key={category.id}
                                value={category.id}
                            >
                                {category.name}
                            </option>
                        )
                    )}
                </select>

            </div>

        </div>
    );
}