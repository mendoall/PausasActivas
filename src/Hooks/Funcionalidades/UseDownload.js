// src/Hooks/Actividades/useDescargarArchivo.js
import apiClient from '../../api/apiClient';

const useDescargarArchivo = () => {
  const descargarArchivo = async (id) => {
    try {
      const token = localStorage.getItem('accessToken');
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        responseType: 'blob',
      };

      const response = await apiClient.get(`/actividades/download/${id}`, config);

      const disposition = response.headers['content-disposition'];
      const fileName = disposition
        ? disposition.split('filename=')[1].replace(/"/g, '')
        : 'Archivo Actividad';

      const url = window.URL.createObjectURL(new Blob([response.data], { type: response.headers['content-type'] }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error al descargar el archivo:", error);
    }
  };

  return { descargarArchivo };
};

export default useDescargarArchivo;
