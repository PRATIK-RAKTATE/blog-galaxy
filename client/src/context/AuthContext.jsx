import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        let userData = null;

        try {
            const userRaw = localStorage.getItem('user');

            // Only parse if userRaw is valid JSON string
            if (userRaw && userRaw !== "undefined" && userRaw !== "null") {
                userData = JSON.parse(userRaw);
            }
        } catch (err) {
            console.error("Failed to parse user from localStorage:", err);
            userData = null;
        }

        if (token && userData) setUser(userData);
    }, []);

    const loginUser = (data) => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
    };

    const logoutUser = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
            {children}
        </AuthContext.Provider>
    )
}

// Optional guard
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
};
