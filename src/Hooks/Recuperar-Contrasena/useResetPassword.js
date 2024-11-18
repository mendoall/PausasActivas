import { useMutation } from "react-query";
import apiClient from "../../api/apiClient";

const useResetPassword = () => {
    return useMutation(async ({ email, token, password }) => {
        try {
            const response = await apiClient.post(
                "Identity/resetPassword",
                { email, resetCode: token, newPassword: password },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                }
            );

            return response.status; // Devuelve el estado de la respuesta
        } catch (error) {
            if (error.response) {
                // Error de respuesta del servidor
                console.error("Error en la solicitud de reinicio de contraseña:", error.response.data);
                console.error("Detalles:", error.response.data.errors);
            } else if (error.request) {
                // Error en la solicitud (no se recibió respuesta)
                console.error("No se recibió respuesta del servidor:", error.request);
            } else {
                // Otro tipo de error
                console.error("Error al configurar la solicitud:", error.message);
            }
            throw error; // Propaga el error para ser manejado en el componente
        }
    });
};

export { useResetPassword };
