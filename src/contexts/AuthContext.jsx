import { createContext, useEffect, useState } from "react";
import authService from "../services/authService";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const token = localStorage.getItem("token");

        if (token) {
            getUser();
        } else {
            setLoading(false);
        }

    }, []);

    const getUser = async () => {

        try {

            const response = await authService.me();

            setUser(response.user ?? response);

        } catch (error) {

            localStorage.removeItem("token");
            localStorage.removeItem("user");

        } finally {

            setLoading(false);

        }

    };

    const login = async (data) => {

        const response = await authService.login(data);

        localStorage.setItem(
            "token",
            response.token
        );

        localStorage.setItem(
            "user",
            JSON.stringify(response.user)
        );

        setUser(response.user);

        return response;
    };

    const register = async (data) => {

        return await authService.register(data);

    };

    const logout = async () => {

        try {

            await authService.logout();

        } catch (error) {}

        localStorage.removeItem("token");

        localStorage.removeItem("user");

        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                register,
                logout,
                getUser,
                setUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}