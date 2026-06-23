import { useNavigate } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";

import LoginForm from "../../components/forms/LoginForm";

import ErrorMessage from "../../components/common/ErrorMessage";

import useAuth from "../../hooks/useAuth";
import useApi from "../../hooks/useApi";

export default function Login() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const {
        request,
        loading,
        error
    } = useApi();

    const handleSubmit = async (data) => {

        try {

            await request(() =>
                login(data)
            );

            navigate("/");

        } catch (error) {}

    };

    return (

        <MainLayout>

            <div className="max-w-md mx-auto">

                <h1
                    className="
                    text-3xl
                    font-bold
                    mb-6
                    text-center
                "
                >
                    Connexion
                </h1>

                <ErrorMessage
                    message={error}
                />

                <LoginForm
                    onSubmit={handleSubmit}
                    loading={loading}
                />

            </div>

        </MainLayout>

    );
}