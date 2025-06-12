import { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "@/lib/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const verifyToken = async () => {
        try {
            const res = await axiosInstance.get("/auth/verify");
            setUser(res.data.user);
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        verifyToken();
    }, []);

    const logout = async () => {
        try {
            await axiosInstance.post('/auth/logout');
            setUser(null);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
