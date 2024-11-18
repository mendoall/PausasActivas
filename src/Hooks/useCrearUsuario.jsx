import { useMutation } from 'react-query';
import apiClient from '../api/apiClient';

const useCrearUsuario = () => {
    const createUser = async ({ email, password, nombre, empresaId, tipoUsuario, phoneNumber
    }) => {
        // Primera solicitud: inserción
        await apiClient.post('identity/register', {
            email,
            password
        });

        //TODO HACER un login para obtener el token 
        // Segunda solicitud: actualización
        await apiClient.put('registro/RegistroModificacion', {
            email,
            nombre,
            empresaId: parseInt(empresaId, 10), // Asegurarse de que companyId sea un entero
            tipoUsuario,
            phoneNumber
        });
    };

    return useMutation(createUser);
};

export default useCrearUsuario;
