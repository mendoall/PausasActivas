import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUsuarios, useModulos, useActividades } from "../Hooks/Actividades/UseActividades";
import useDescargarArchivo from "../Hooks/Funcionalidades/UseDownload";

const Actividades = () => {
  const { data: usuarios, isLoading: isLoadingUsuarios, isError: isErrorUsuarios } = useUsuarios();
  const { data: modulos, isLoading: isLoadingModulos, isError: isErrorModulos } = useModulos();
  const {
    actividades,
    isEditing,
    setIsEditing,
    editingId,
    setEditingId,
    activityToDelete,
    setActivityToDelete,
    mutation,
    deleteMutation,

  } = useActividades();
  const { descargarArchivo } = useDescargarArchivo(); // Destructura la función descargarArchivo desde el hook
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    contenido: "",
    fechaCreacion: "",
    moduloId: "",
    usuarioId: "",
    archivoActividad: null, // Cambiado a null
    linkActividad: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData, archivoActividad: e.target.files[0],  // Asigna el archivo correctamente
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("contenido", formData.contenido);
    formDataToSend.append("fechaCreacion", formData.fechaCreacion);
    formDataToSend.append("moduloId", formData.moduloId);
    formDataToSend.append("usuarioId", formData.usuarioId);
    formDataToSend.append("linkActividad", formData.linkActividad);

    if (formData.archivoActividad) {
      formDataToSend.append("archivoActividad", formData.archivoActividad);
    }
    if (formData.id) {
      formDataToSend.append("id", formData.id);
    }
    mutation.mutate(formDataToSend, {
      onSuccess: () => {
        setFormData({
          contenido: "",
          fechaCreacion: "",
          moduloId: "",
          usuarioId: "",
          archivoActividad: null,
          linkActividad: "",
        });
        setIsEditing(false);
        setEditingId(null);
      },
    });
  };

  const handleEdit = (actividad) => {
    setFormData({
      ...actividad,
      fechaCreacion: actividad.fechaCreacion.split("T")[0], // Convertir la fecha a formato YYYY-MM-DD
    });
    setIsEditing(true);
    setEditingId(actividad.id);
  };

  const handleDelete = (id) => {
    setActivityToDelete(id);
  };

  const confirmDelete = (confirmed) => {
    if (confirmed && activityToDelete !== null) {
      deleteMutation.mutate(activityToDelete);
    }
    setActivityToDelete(null);
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setEditingId(null);
    setFormData({
      contenido: "",
      fechaCreacion: "",
      moduloId: "",
      usuarioId: "",
      archivoActividad: null,
      linkActividad: "",
    });
  };

  if (isLoadingUsuarios || isLoadingModulos) return <p>Cargando...</p>;
  if (isErrorUsuarios || isErrorModulos)
    return <p>Error al cargar los datos.</p>;

  return (
    <div className="container mx-auto p-4 mt-4">
      <h1 className="text-2xl font-bold mb-4">Gestión de actividades</h1>
      <form onSubmit={handleSubmit} className="mb-4 block">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="font-serif mr-4">Contenido</label>
            <br />
            <input
              type="text"
              name="contenido"
              placeholder="Contenido"
              value={formData.contenido}
              onChange={handleInputChange}
              className="p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="font-serif mr-4">Fecha de creación</label>
            <br />
            <input
              type="date"
              name="fechaCreacion"
              value={formData.fechaCreacion}
              onChange={handleInputChange}
              className="p-2 border rounded"
              required
              disabled={isEditing}
            />
          </div>
          <div>
            <label className="font-serif mr-4">Tipo de módulo</label>
            <br />
            <select
              name="moduloId"
              value={formData.moduloId}
              onChange={handleInputChange}
              required
              className="mt-1 p-2 border rounded w-full"
            >
              <option value="">Seleccione un módulo</option>
              {Array.isArray(modulos) &&
                modulos.map((modulo) => (
                  <option key={modulo.id} value={modulo.id}>
                    {modulo.nombre}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label className="font-serif mr-4">Nombre del usuario</label>
            <br />
            <select
              name="usuarioId"
              value={formData.usuarioId}
              onChange={handleInputChange}
              required
              className="mt-1 p-2 border rounded w-full"
            >
              <option value="">Seleccione un usuario</option>
              {Array.isArray(usuarios) &&
                usuarios.map((usuario) => (
                  <option key={usuario.id} value={usuario.id}>
                    {usuario.nombre}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label className="font-serif mr-4">Archivo de actividad</label>
            <br />
            <input
              type="file"
              name="archivoActividad"
              onChange={handleFileChange}
              className="p-2 border rounded"
            />
          </div>
          <div>
            <label className="font-serif mr-4">Link de Actividad</label>
            <br />
            <input
              type="text"
              name="linkActividad"
              placeholder="Link de Actividad"
              value={formData.linkActividad}
              onChange={handleInputChange}
              className="p-2 border rounded"
            />
          </div>
        </div>
        <div className="flex justify-between items-center mt-5">
          <button
            type="submit"
            className="bg-[#fba856] text-white py-2 px-4 rounded hover:bg-[#D6822F] transition duration-300"
          >
            {isEditing ? "Actualizar" : "Agregar"}
          </button>
          <button
            className="bg-slate-400 text-white py-2 px-4 rounded hover:bg-slate-500 transition duration-300 block"
            onClick={() => navigate("/ModulosPage")}
          >
            Gestión de módulos
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
        </div>
      </form>
      <table className="min-w-full bg-white border mr-10">
        <thead className="bg-slate-200 text-slate-700">
          <tr>
            <th className="py-2 px-4">Contenido</th>
            <th className="py-2 px-4">Fecha de creación</th>
            <th className="py-2 px-4">Módulo</th>
            <th className="py-2 px-4">Usuario</th>
            <th className="border p-2">URL del archivo</th>
            <th className="border p-2">Enlace</th>
            <th className="py-2 px-4">Acciones</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {actividades.map((actividad) => (
            <tr key={actividad.id} className="border-b">
              <td className="py-2 px-4">{actividad.contenido}</td>
              <td className="py-2 px-4">
                {new Date(actividad.fechaCreacion).toISOString().split("T")[0]}{" "}
                {/* Convertir la fecha a formato YYYY-MM-DD */}
              </td>
              <td className="py-2 px-4">{actividad.moduloNombre}</td>
              <td className="py-2 px-4">{actividad.usuarioNombre}</td>
              <td className="py-2 px-4">
                {actividad.archivoActividadUrl && (
                  <button
                    onClick={() => descargarArchivo(actividad.id)} // Llama a la función para descargar el archivo
                    className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600 transition duration-300"
                  >
                    Descargar archivo
                  </button>
                )}
              </td>

              <td className="py-2 px-4">
                {actividad.linkActividad && (
                  <a
                    href={actividad.linkActividad}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Abrir enlace
                  </a>
                )}
              </td>
              <td className="py-2 px-4">
                <button
                  onClick={() => handleEdit(actividad)}
                  className="bg-green-500 text-white py-1 px-2 rounded hover:bg-green-600 transition duration-300 mr-2"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(actividad.id)}
                  className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 transition duration-300"
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
      {activityToDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h3 className="text-xl font-bold mb-4">Confirmar eliminación</h3>
            <p>¿Estás seguro de que deseas eliminar esta actividad?</p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => confirmDelete(true)}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300"
              >
                Sí
              </button>
              <button
                onClick={() => confirmDelete(false)}
                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-300 ml-2"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Actividades;
