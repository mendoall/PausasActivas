import { useState } from "react";
import { useLogin } from "../Hooks/useLogin";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const loginMutation = useLogin();
  const navigate = useNavigate();
  const { login } = useAuth(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setErrorMessage("Email no válido");
      return;
    }

    if (!validatePassword(password)) {
      setErrorMessage(
        "La contraseña debe tener al menos 6 caracteres, incluyendo una letra mayúscula y un carácter especial"
      );
      return;
    }

    try {
      const { accessToken } = await loginMutation.mutateAsync({
        email,
        password,
      });

      if (accessToken) {
        // localStorage.setItem("accessToken", accessToken);
        login(accessToken); 
        setSuccessMessage("Inicio de sesión exitoso");
        navigate("/PrincipalPage"); 
      } else {
        setErrorMessage(
          "Error al iniciar sesión: token no encontrado en la respuesta"
        );
      }
    } catch (error) {
      setErrorMessage(`Error al iniciar sesión: ${error.message}`);
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    const re = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
    return re.test(password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#e7f4fc]">
      <div className="bg-white p-20 rounded-lg shadow-2xl text-center max-w-sm w-full">
        <img className="mx-auto mb-4 w-20 h-20 " src="./img/smile.png" alt="" />
        <form className="mb-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-left mb-2">Email:</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Username"
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>
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
            Login
          </button>
        </form>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}
        <a
          href="/OlvideMiContrasenaPage" // Enlace para redirigir a la página de "Olvidé mi contraseña"
          className="text-[#f9912a] hover:text-[#D6822F] transition duration-300"
        >
          ¡Olvidé mi contraseña!
        </a>
      </div>
    </div>
  );
};

export default Login;
