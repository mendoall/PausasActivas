import React, { useState } from 'react';
import { useRequestResetCode } from '../../Hooks/Recuperar-Contrasena/useRequestResetCode';

const OlvidarContrasena = () => {
    const [email, setEmail] = useState('');
    const { requestResetCode, isLoading, error } = useRequestResetCode();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await requestResetCode(email);
    };

    return (
        <div className="min-h-screen absolute inset-0 z-0 flex items-center justify-center bg-[#e0f7fa]">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-xl font-bold mb-4 text-[#ffab40] text-center">Solicitar Código de Restablecimiento</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-left mb-2 text-[#ffab40]">Correo Electrónico:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-[#b0bec5] rounded focus:outline-none focus:border-[#00bcd4] focus:ring-2 focus:ring-[#00bcd4]"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-2 px-4 bg-[#ffab40] text-white rounded hover:bg-[#ff9100] transition duration-300"
                    >
                        Enviar Código
                    </button>
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default OlvidarContrasena;
