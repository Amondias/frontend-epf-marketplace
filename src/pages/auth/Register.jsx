import { useNavigate } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";

import RegisterForm from "../../components/forms/RegisterForm";

import ErrorMessage from "../../components/common/ErrorMessage";

import useAuth from "../../hooks/useAuth";
import useApi from "../../hooks/useApi";

export default function Register() {

    const navigate = useNavigate();

    const { register } = useAuth();

    const {
        request,
        loading,
        error
    } = useApi();

    const handleSubmit = async (data) => {

        try {

            await request(() =>
                register(data)
            );

            navigate("/login");

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
                    Inscription
                </h1>

                <ErrorMessage
                    message={error}
                />

                <RegisterForm
                    onSubmit={handleSubmit}
                    loading={loading}
                />

            </div>

        </MainLayout>

    );
}