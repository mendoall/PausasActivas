import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useGestionUsuario from "../Hooks/useGestionUsuario";
import "../index.css";

const GestionUsuario = () => {
  const navigate = useNavigate();
  const {
    data: users,
    isLoading,
    isError,
    error,
    deleteUsuario,
  } = useGestionUsuario();
  const [userIdToDelete, setUserIdToDelete] = useState(null);

  if (isLoading) {
    return <div className="text-center text-gray-500">Cargando...</div>;
  }

  if (isError) {
    return (
      <div className="text-center text-red-500">Error: {error.message}</div>
    );
  }

  const handleEdit = (userId) => {
    navigate(`/EditarUsuarioPage/${userId}`);
  };

  const handleDeleteClick = (userId) => {
    setUserIdToDelete(userId);
  };

  const confirmDelete = (confirmed) => {
    if (confirmed && userIdToDelete !== null) {
      deleteUsuario(userIdToDelete);
    }
    setUserIdToDelete(null);
  };

  return (
    <div className="container mx-auto p-4 mt-4">
      <h1 className="text-2xl font-bold mb-4">Gestión de Usuarios</h1>
      <Link
        className="bg-[#fba856] text-white py-2 px-4 rounded hover:bg-[#D6822F] transition duration-300 mb-4 inline-block"
        to="/CrearUsuarioPage"
      >
        Crear Usuario
      </Link>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="py-2 px-4 border-b">Nombre</th>
            <th className="py-2 px-4 border-b">Correo electrónico</th>
            <th className="py-2 px-4 border-b">Tipo de Usuario</th>
            <th className="py-2 px-4 border-b">Número teléfono</th>
            <th className="py-2 px-4 border-b">Acciones</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {users.map((user) => (
            <tr key={user.id} className="border-b">
              <td className="py-2 px-4">{user.nombre}</td>
              <td className="py-2 px-4">{user.email}</td>
              <td className="py-2 px-4">{user.tipoUsuario}</td>
              <td className="py-2 px-4">{user.phoneNumber}</td>

              <td className="py-2 px-4">
                <button
                  className="bg-slate-400 text-white py-1 px-2 rounded hover:bg-slate-500 transition duration-300 mr-2"
                  onClick={() => handleEdit(user.id)}
                >
                  Editar
                </button>
                <button
                  className="bg-red-400 text-white py-1 px-2 rounded hover:bg-red-600 transition duration-300"
                  onClick={() => handleDeleteClick(user.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        className="bg-slate-400 text-white py-2 px-4 rounded hover:bg-slate-500 transition duration-300 mt-3"
        onClick={() => navigate("/PrincipalPage")}
      >
        Atrás
      </button>

      {userIdToDelete !== null && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="mb-4">
              ¿Estás seguro de que deseas eliminar este usuario?
            </p>
            <button
              className="bg-slate-400 text-white py-2 px-4 rounded hover:bg-slate-500 transition duration-300 mr-2"
              onClick={() => confirmDelete(true)}
            >
              Sí
            </button>
            <button
              className="bg-red-400 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300"
              onClick={() => confirmDelete(false)}
            >
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GestionUsuario;
