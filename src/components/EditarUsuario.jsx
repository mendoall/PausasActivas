import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useEditarUsuario from "../Hooks/useEditarUsuario";
import useEmpresa from "../Hooks/useEmpresa";

const EditarUsuario = () => {
  const { id: userId } = useParams(); // Obtén el userId de la URL
  const navigate = useNavigate();
  const {
    user,
    isLoading,
    isError,
    error,
    updateUser,
    isUpdating,
    isUpdateError,
    updateError,
  } = useEditarUsuario(userId);
  const {
    data: empresas,
    isLoading: isEmpresasLoading,
    isError: isEmpresasError,
    error: empresasError,
  } = useEmpresa();

  const [formData, setFormData] = useState({
    email: "",
    nombre: "",
    empresaId: "",
    tipoUsuario: "",
    phoneNumber: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email,
        nombre: user.nombre,
        empresaId: user.empresaId,
        tipoUsuario: user.tipoUsuario,
        phoneNumber: user.phoneNumber,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(formData, {
      onSuccess: () => navigate("/GestionUsuarioPage"), // Redirige después del éxito
    });
  };

  if (isLoading || isEmpresasLoading) {
    return <div className="text-center text-blue-500">Cargando...</div>;
  }

  if (isError) {
    return (
      <div className="text-center text-red-500">Error: {error.message}</div>
    );
  }

  if (isEmpresasError) {
    return (
      <div className="text-center text-red-500">
        Error al cargar las empresas: {empresasError.message}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 mt-4">
      <h1 className="text-2xl font-bold mb-4">Editar Usuarios</h1>
      {isUpdateError && (
        <p className="text-red-500 mb-4">
          Error al actualizar el usuario: {updateError.message}
        </p>
      )}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Correo electrónico:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
          <div>
            <label
              htmlFor="nombre"
              className="block text-sm font-medium text-gray-700"
            >
              Nombre:
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Número de teléfono:
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label
              htmlFor="empresaId"
              className="block text-sm font-medium text-gray-700"
            >
              Empresa:
            </label>
            <select
              id="empresaId"
              name="empresaId"
              value={formData.empresaId}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
            >
              <option value="">Seleccione una empresa</option>
              {empresas.map((empresa) => (
                <option key={empresa.id} value={empresa.id}>
                  {empresa.nombre}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="tipoUsuario"
              className="block text-sm font-medium text-gray-700"
            >
              Tipo de Usuario:
            </label>
            <input
              type="text"
              id="tipoUsuario"
              name="tipoUsuario"
              value={formData.tipoUsuario}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={isUpdating}
          className="bg-[#fba856] text-white py-2 px-4 rounded hover:bg-[#D6822F] transition duration-300"
        >
          Guardar Cambios
        </button>

        <button
          className="bg-slate-400 text-white py-2 px-4 rounded hover:bg-slate-500 transition duration-300 mt-3 ml-3"
          onClick={() => navigate("/GestionUsuarioPage")}
        >
          Atrás
        </button>
      </form>
    </div>
  );
};

export default EditarUsuario;
