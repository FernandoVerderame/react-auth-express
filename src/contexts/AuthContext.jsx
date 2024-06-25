import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import useStorage from "../hooks/useStorage";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useStorage(false, 'isLoggedIn');

    const login = (payload, redirectTo) => {
        setIsLoggedIn(true);
        navigate(redirectTo || '/');
    }

    const logout = () => {
        setIsLoggedIn(false);
        navigate('/login');
    }

    const value = {
        isLoggedIn,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => {
    const value = useContext(AuthContext);
    if (value === undefined) {
        throw new Error('Non sei dentro al Auth Provider.');
    }
    return value;
}

export { AuthProvider, useAuth };