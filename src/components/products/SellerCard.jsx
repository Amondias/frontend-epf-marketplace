import { Link } from "react-router-dom";

export default function SellerCard({
    seller,
}) {
    return (
        <div className="bg-white p-4 rounded shadow">

            <h3 className="font-bold">
                {seller.name}
            </h3>

            <p>{seller.city}</p>

            <Link
                to={`/seller/${seller.id}`}
                className="text-blue-600"
            >
                Voir profil
            </Link>

        </div>
    );
}