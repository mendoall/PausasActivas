import { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from "../api/apiClient";
import useCurrentUser from "../Hooks/stores/useCurrentUser";



const fetchCurrentUser = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { data } = await apiClient.get("registro/currentUserInfo", config);

  return data;
};


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { currentUser, setCurrentUser, removeCurrentUser } = useCurrentUser();


  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token && token !== 'undefined') {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = (token) => {
    if (token) {
      localStorage.setItem('accessToken', token);

      setIsAuthenticated(true);

      fetchCurrentUser(token).then((data) => {
        console.log("Resolve data", data);
        setCurrentUser(data)
      });

      navigate('/PrincipalPage');
    } else {
      console.error('Invalid token on login');
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');

    removeCurrentUser(null);
    setIsAuthenticated(false);
    navigate('/LoginPage');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loading, currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
