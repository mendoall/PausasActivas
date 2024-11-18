// src/Hooks/Actividades/useActividades.js
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from 'react-query';
import dayjs from 'dayjs';
import apiClient from '../../api/apiClient';

// Hook para traer usuarios
const useUsuarios = () => {
  const traerUsuarios = async () => {
    const token = localStorage.getItem('accessToken');
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    };

    const { data } = await apiClient.get('/registro/UsuarioGet', config);
    return data;
  };

  return useQuery('usuarios', traerUsuarios);
};

// Hook para traer módulos
const useModulos = () => {
  const traerModulos = async () => {
    const token = localStorage.getItem('accessToken');
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    };

    const { data } = await apiClient.get('/modulos', config);
    return data;
  };

  return useQuery('modulos', traerModulos);
};

// Hook para manejar actividades
const useActividades = () => {
  const queryClient = useQueryClient();
  const [actividades, setActividades] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [activityToDelete, setActivityToDelete] = useState(null);
     
  const fetchActividades = async () => {
    const token = localStorage.getItem('accessToken');
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    };

    const response = await apiClient.get('/actividades', config);
    const formattedActividades = response.data.map((actividad) => ({
      ...actividad,
      fechaCreacion: dayjs(actividad.fechaCreacion).format("YYYY-MM-DD"),
    }));
    setActividades(formattedActividades);
  };

  useEffect(() => {
    fetchActividades();
  }, []);
  
  // Mutación para agregar o actualizar actividades
  const mutation = useMutation(
    async (formData) => {
      const token = localStorage.getItem('accessToken');
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        }
      };

      const url = isEditing
        ? `actividades/${editingId}`
        : 'actividades/';

      const method = isEditing ? 'put' : 'post';

      await apiClient[method](url, formData, config);
    },
    {
      onSuccess: () => {
        fetchActividades();
        queryClient.invalidateQueries('actividades');
        setIsEditing(false);
        setEditingId(null);
      }
    }
  );

  // Mutación para eliminar actividades
  const deleteMutation = useMutation(
    async (id) => {
      const token = localStorage.getItem('accessToken');
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      };

      await apiClient.delete(`actividades/${id}`, config);
    },
    {
      onSuccess: () => {
        fetchActividades();
        queryClient.invalidateQueries('actividades');
        setActivityToDelete(null);
      }
    }
  );

  return {
    actividades,
    isEditing,
    editingId,
    activityToDelete,
    setIsEditing,
    setEditingId,
    setActivityToDelete,
    mutation,
    deleteMutation,
  };
};

export {
  useUsuarios,
  useModulos,
  useActividades
};
