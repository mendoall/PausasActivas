import { useQuery } from 'react-query';
import apiClient from '../../api/apiClient'; 

const fetchNotifications = async () => {

  try {
    const token = localStorage.getItem('accessToken');
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    };
    const { data } = await apiClient.get('/actividades/ActividadesUsuarioId', config);
    console.log("respuesta " , data);
    return Array.isArray(data) ? data : [data];
  } catch ( error ) {

    console.error("Error al cargar actividades:", error);
  }


 
};

const useNotifications = () => {
  return useQuery('notifications', fetchNotifications);
};

export default useNotifications;
