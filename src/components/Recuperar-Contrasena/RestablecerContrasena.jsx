import React, { useState } from 'react';
import { useResetPassword } from '../../Hooks/Recuperar-Contrasena/useResetPassword';

const RestablecerContrasena = () => {
    const [email, setEmail] = useState('');
    const [resetCode, setResetCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const { resetPassword, isLoading, error } = useResetPassword();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await resetPassword({ email, resetCode, newPassword });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#e0f7fa]">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold mb-4 text-[#ffab40]">Restablecer Contraseña</h2>
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
                    <div>
                        <label htmlFor="resetCode" className="block text-left mb-2 text-[#ffab40]">Código de Restablecimiento:</label>
                        <input
                            type="text"
                            id="resetCode"
                            value={resetCode}
                            onChange={(e) => setResetCode(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-[#b0bec5] rounded focus:outline-none focus:border-[#00bcd4] focus:ring-2 focus:ring-[#00bcd4]"
                        />
                    </div>
                    <div>
                        <label htmlFor="newPassword" className="block text-left mb-2 text-[#ffab40]">Nueva Contraseña:</label>
                        <input
                            type="password"
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-[#b0bec5] rounded focus:outline-none focus:border-[#00bcd4] focus:ring-2 focus:ring-[#00bcd4]"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-2 px-4 bg-[#ffab40] text-white rounded font-bold hover:bg-[#ff9100] transition duration-300"
                    >
                        Restablecer Contraseña
                    </button>
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default RestablecerContrasena;

