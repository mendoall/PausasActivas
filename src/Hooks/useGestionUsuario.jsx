import { useQuery, useMutation, useQueryClient } from 'react-query';
import apiClient from '../api/apiClient';

const fetchUsuarios = async () => {
    const { data } = await apiClient.get('registro/UsuarioGet');
    return data;
};

const deleteUsuario = async (id) => {
    await apiClient.delete(`registro/RegistroDelete?id=${id}`);
};

const useGestionUsuario = () => {
    const queryClient = useQueryClient();

    const { data, isLoading, isError, error } = useQuery('usuarios', fetchUsuarios);

    const mutation = useMutation(deleteUsuario, {
        onSuccess: () => {
            queryClient.invalidateQueries('usuarios');
        }
    });

    return {
        data,
        isLoading,
        isError,
        error,
        deleteUsuario: mutation.mutate
    };
};

export default useGestionUsuario;
