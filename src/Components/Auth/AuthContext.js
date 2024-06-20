import { jwtDecode } from 'jwt-decode';
import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    
    const [authToken, setAuthToken] = useState(null);
    const userToken = authToken?.access ? jwtDecode(authToken.access) : null;

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        setAuthToken(JSON.parse(token));
      }
    }, []);

    const logout = () => {
        localStorage.removeItem('token');
        setAuthToken(null); 
        navigate('/');
    };

    return (
        <AuthContext.Provider value={{ authToken,userToken, setAuthToken, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
