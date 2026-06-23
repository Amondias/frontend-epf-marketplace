import { Link } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";

export default function NotFound() {

    return (

        <MainLayout>

            <div
                className="
                text-center
                py-20
            "
            >

                <h1
                    className="
                    text-6xl
                    font-bold
                    text-gray-700
                "
                >
                    404
                </h1>

                <h2
                    className="
                    text-2xl
                    font-semibold
                    mt-4
                "
                >
                    Page introuvable
                </h2>

                <p
                    className="
                    text-gray-500
                    mt-2
                "
                >
                    La ressource demandée n'existe pas.
                </p>

                <Link
                    to="/"
                    className="
                    inline-block
                    mt-6
                    bg-blue-600
                    text-white
                    px-5
                    py-2
                    rounded
                "
                >
                    Retour accueil
                </Link>

            </div>

        </MainLayout>

    );
}