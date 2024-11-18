import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";

const Modulos = () => {
  const navigate = useNavigate();
  const [modulos, setModulos] = useState([]);
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    fechaInico: "",
    fechaFin: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [moduleToDelete, setModuleToDelete] = useState(null);

  useEffect(() => {
    fetchModulos();
  }, []);

  const fetchModulos = async () => {
    try {
      const response = await axios.get(
        "https://localhost:7085/v1/api/modulos/"
      );
      const formattedModules = response.data.map((modulo) => ({
        ...modulo,
        fechaInico: dayjs(modulo.fechaInico).format("YYYY-MM-DD"),
        fechaFin: dayjs(modulo.fechaFin).format("YYYY-MM-DD"),
      }));
      setModulos(formattedModules);
    } catch (error) {
      console.error("Error fetching modulos:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedData = {
      ...formData,      
      fechaCreacion: isEditing
        ? dayjs(formData.fechaCreacion).toISOString()
        : formData.fechaCreacion,
    };
    if (isEditing) {
      try {       
        const { fechaInico, fechaFin, ...updatedModule } = formattedData;

        await axios.put(
          `https://localhost:7085/v1/api/modulos/`,
          { ...updatedModule, fechaCreacion: formData.fechaCreacion }
        );
        setIsEditing(false);
        setEditingId(null);
      } catch (error) {
        console.error("Error updating módulo:", error);
      }
    } else {

      try {
        await axios.post(
          "https://localhost:7085/v1/api/modulos/",
          formattedData
        );
      } catch (error) {
        console.error("Error adding module:", error);
      }
    }
    setFormData({
        nombre: "",
        descripcion: "",
        fechaInico: "",
        fechaFin: "",
    });
    fetchModulos();
  };

  const handleEdit = (modulo) => {
    setFormData({
      ...modulo,
      fechaInico: dayjs(modulo.fechaInico).format("YYYY-MM-DD"),
        fechaFin: dayjs(modulo.fechaFin).format("YYYY-MM-DD"),
    });
    setIsEditing(true);
    setEditingId(modulo.id);
  };

  const handleDelete = async (id) => {
    console.log("id:", id);
    try {

      await axios.delete(`https://localhost:7085/v1/api/modulos/${id}`);
      fetchModulos();
      
    } catch (error) {
      console.error("Error deleting module:", error);
    }
    setModuleToDelete(null);
  };

  const confirmDelete = (confirmed) => {    

    if (confirmed && moduleToDelete !== null) {
      handleDelete(moduleToDelete); 
    }
    setModuleToDelete(null);
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setEditingId(null);
    setFormData({
        nombre: "",
        descripcion: "",
        fechaInico: "",
        fechaFin: "",
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gestión de módulos</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={handleInputChange}
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            name="descripcion"
            placeholder="Descripción"
            value={formData.descripcion}
            onChange={handleInputChange}
            className="p-2 border rounded"
            required
          />
          <input
            type="date"
            name="fechaInico"
            value={formData.fechaInico}
            onChange={handleInputChange}
            className="p-2 border rounded"
            required
            disabled={isEditing} 
          />
          <input
            type="date"
            name="fechaFin"
            value={formData.fechaFin}
            onChange={handleInputChange}
            className="p-2 border rounded"
            required
            disabled={isEditing} 
          />          
        </div>
        <button
          type="submit"
          className="bg-[#fba856] text-white py-2 px-4 rounded hover:bg-[#D6822F] transition duration-300 mt-5"
        >
          {isEditing ? "Actualizar" : "Agregar"}
        </button>
        {isEditing && (
          <button
            type="button"
            onClick={cancelEditing}
            className="bg-slate-400 text-white py-2 px-4 rounded hover:bg-slate-300 transition duration-300 ml-2"
          >
            Cancelar
          </button>
        )}
      </form>
      <table className="min-w-full bg-white border mr-10">
        <thead className="bg-slate-200 text-slate-700">
          <tr>
            <th className="py-2 px-4">Nombre</th>
            <th className="py-2 px-4">Descripción</th>
            <th className="py-2 px-4">Fecha de inicio</th>
            <th className="py-2 px-4">Fecha final</th>
            <th className="py-2 px-4">Acciones</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {modulos.map((modulo) => (
            <tr key={modulo.id} className="border-b">
              <td className="py-2 px-4">{modulo.nombre}</td>
              <td className="py-2 px-4">{modulo.descripcion}</td>
              <td className="py-2 px-4">{modulo.fechaInico}</td>
              <td className="py-2 px-4">{modulo.fechaFin}</td>
              <td className="py-2 px-4">
                <button
                  onClick={() => handleEdit(modulo)}
                  className="bg-slate-400 text-white py-1 px-2 rounded hover:bg-slate-500 transition duration-300 mr-2"
                >
                  Editar
                </button>
                <button
                  onClick={() => setModuleToDelete(modulo.id)}
                  className="bg-red-400 text-white py-1 px-2 rounded hover:bg-red-600 transition duration-300"
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
        onClick={() => navigate("/ActividadesPage")}
      >
        Atrás
      </button>
      {moduleToDelete !== null && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="mb-4">
              ¿Estás seguro de que deseas eliminar este módulo?
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

export default Modulos;

