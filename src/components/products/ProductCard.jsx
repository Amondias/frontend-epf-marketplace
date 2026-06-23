import { Link } from "react-router-dom";

export default function ProductCard({
    product,
}) {
    return (
        <div className="bg-white rounded shadow p-4">

            <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded"
            />

            <h3 className="font-bold mt-3">
                {product.name}
            </h3>

            <p className="text-blue-600 font-semibold">
                {product.price} FCFA
            </p>

            <Link
                to={`/products/${product.id}`}
                className="inline-block mt-3 bg-blue-600 text-white px-4 py-2 rounded"
            >
                Voir
            </Link>

        </div>
    );
}