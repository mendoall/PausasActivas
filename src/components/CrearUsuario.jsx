import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useEmpresas from "../Hooks/useEmpresa";
import useCrearUsuario from "../Hooks/useCrearUsuario";
import "../index.css";

const CrearUsuario = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [empresaId, setEmpresaId] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { data: companies, isLoading, isError } = useEmpresas();
  const { mutateAsync: createUser } = useCrearUsuario();
  const navigate = useNavigate(); // Hook para la navegación

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUser({ email, password, nombre, empresaId, tipoUsuario,phoneNumber });
      setSuccessMessage("Usuario creado exitosamente");
      // Redirige después de crear el usuario
      navigate("/GestionUsuarioPage");
    } catch (error) {
      console.error("Error al crear el usuario:", error);
    }
  };

  if (isLoading) return <p>Cargando...</p>;
  if (isError) return <p>Error al cargar las empresas.</p>;
  
  return (
    <div className="container mx-auto p-4 mt-4">
      <h1 className="text-2xl font-bold mb-4">Creación de usuarios</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email:
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Contraseña:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              required
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label
              htmlFor="nombre"
              className="block text-sm font-medium text-gray-700"
            >
              Nombre:
            </label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Nombre Completo"
              required
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
          <div>
            <label
              htmlFor="NumTelefono"
              className="block text-sm font-medium text-gray-700"
            >
              Número de teléfono:
            </label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Número de telfono"
              required
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
          
          <div>
            <label
              htmlFor="empresaId"
              className="block text-sm font-medium text-gray-700"
            >
              Empresa:
            </label>
            <select
              value={empresaId}
              onChange={(e) => setEmpresaId(e.target.value)}
              required
              className="mt-1 p-2 border rounded w-full"
            >
              <option value="">Seleccione una empresa</option>
              {Array.isArray(companies) &&
                companies.map((company) => (
                  <option key={company.id} value={company.id}>
                    {company.nombre}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label
              htmlFor="tipoUsuario"
              className="block text-sm font-medium text-gray-700"
            >
              Rol:
            </label>
            <input
              type="text"
              value={tipoUsuario}
              onChange={(e) => setTipoUsuario(e.target.value)}
              placeholder="Rol"
              required
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-[#fba856] text-white py-2 px-4 rounded hover:bg-[#D6822F] transition duration-300"
        >
          Agregar Usuario
        </button>
        <button
          className="bg-slate-400 text-white py-2 px-4 rounded hover:bg-slate-500 transition duration-300 mt-3 ml-3"
          onClick={() => navigate("/GestionUsuarioPage")}
        >
          Atrás
        </button>
      </form>
      {successMessage && (
        <p className="text-green-500 mt-4">{successMessage}</p>
      )}
    </div>
  );
};

export default CrearUsuario;
