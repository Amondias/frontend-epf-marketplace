import { Link } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";

export default function Unauthorized() {

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
                    text-5xl
                    font-bold
                    text-red-600
                "
                >
                    403
                </h1>

                <h2
                    className="
                    text-2xl
                    font-semibold
                    mt-4
                "
                >
                    Accès refusé
                </h2>

                <p
                    className="
                    text-gray-500
                    mt-2
                "
                >
                    Vous n'avez pas les droits nécessaires.
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