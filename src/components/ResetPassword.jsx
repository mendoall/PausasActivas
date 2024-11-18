import React, { useState, useEffect } from "react";
import { useResetPassword } from "../Hooks/Recuperar-Contrasena/useResetPassword";
import { useSearchParams, Link } from "react-router-dom";

const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const resetPasswordMutation = useResetPassword();

    const [queryParameters] = useSearchParams();
    const [email] = useState(queryParameters.get("email"));
    const [resetToken] = useState(queryParameters.get("token"));

    useEffect(() => {
        if (!email || !resetToken) {
            setErrorMessage("Email o token incorrectos");
        }
    }, [email, resetToken]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validatePassword(password)) {
            setErrorMessage(
                "La contraseña debe tener al menos 6 caracteres, incluyendo una letra mayúscula y un carácter especial"
            );
            return;
        }

        try {
            const response = await resetPasswordMutation.mutateAsync({
                email,
                token: resetToken,
                password,
            });
            console.log("response:", response);
            if (response === 200) {
                setSuccessMessage("Password cambiado exitosamente");
                setErrorMessage("");
                // Redirigir a /LoginPage después de un retraso
                
            } else {
                setErrorMessage("Error al cambiar la contraseña: token no encontrado en la respuesta");
                setSuccessMessage("");
            }
        } catch (error) {
            setErrorMessage(`Error al cambiar la contraseña: ${error.message}`);
            setSuccessMessage("");
        }
    };

    const validatePassword = (password) => {
        const re = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
        return re.test(password);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#e7f4fc]">
            <div className="bg-white p-20 rounded-lg shadow-2xl text-center max-w-sm w-full">
                <img className="mx-auto mb-4 w-20 h-20" src="./img/smile.png" alt="" />
                <form className="mb-4" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-left mb-2">Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-[#f9912a] text-white py-2 px-4 rounded hover:bg-[#D6822F] transition duration-300 animate-pulse"
                    >
                        Cambiar Password
                    </button>
                </form>
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                {successMessage && (
                    <div className="mt-4 text-green-500 animate-bounce">
                        <p>{successMessage}</p>
                        
                    </div>
                )}
                <Link to="/LoginPage" className="text-blue-500 underline">
                            Ir a la página de inicio de sesión
                        </Link>
            </div>
        </div>
    );
};

export default ResetPassword;
