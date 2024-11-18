import { useQuery, useMutation, useQueryClient } from 'react-query';
import apiClient from '../api/apiClient'; // Asegúrate de que este sea tu cliente Axios configurado

const useEditarUsuario = (userId) => {
    const queryClient = useQueryClient();

    // Obtener detalles del usuario por ID
    const { data: user, isLoading, isError, error } = useQuery(
        ['usuario', userId],
        async () => {
            const { data } = await apiClient.get(`registro/${userId}`);
            return data;
        },
        {
            enabled: !!userId, // Solo ejecuta la consulta si userId existe
        }
    );

    // Actualizar detalles del usuario
    const { mutate: updateUser, isLoading: isUpdating, isError: isUpdateError, error: updateError } = useMutation(
        async (updatedUser) => {
            await apiClient.put('registro/RegistroModificacion', {
                email: updatedUser.email,
                nombre: updatedUser.nombre,
                empresaId: parseInt(updatedUser.empresaId, 10), 
                tipoUsuario: updatedUser.tipoUsuario,
                phoneNumber: updatedUser.phoneNumber
            });
        },
        {
            onSuccess: () => {
                // Invalida y refetch los datos del usuario después de actualizar
                queryClient.invalidateQueries(['usuario', userId]);
            }
        }
    );

    return {
        user,
        isLoading,
        isError,
        error,
        updateUser,
        isUpdating,
        isUpdateError,
        updateError
    };
};

export default useEditarUsuario;
