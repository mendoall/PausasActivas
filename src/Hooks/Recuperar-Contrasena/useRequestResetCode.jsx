import { useState } from 'react';
import apiClient from '../../api/apiClient';

export const useRequestResetCode = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const requestResetCode = async (email) => {
        setIsLoading(true);
        setError(null);
        try {
            await apiClient.post('registro/forgotPassword', { email });
        } catch (err) {
            setError(err.response?.data?.detail || 'Error al solicitar el código.');
        } finally {
            setIsLoading(false);
        }
    };

    return { requestResetCode, isLoading, error };
};