import { useMutation } from 'react-query';
import apiClient from '../api/apiClient';
import Login from '../components/Login';

const useLogin = () => {
    return useMutation(async ({ email, password }) => {
        try {
            const response = await apiClient.post('identity/login', { email, password }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            });
            return response.data; // Devuelve el objeto de respuesta completo
        } catch (error) {
            console.error('Error en la solicitud de inicio de sesión:', error.response || error.message || error);
            throw error; // Propaga el error para ser manejado en el componente
        }
    });
};

export { useLogin };