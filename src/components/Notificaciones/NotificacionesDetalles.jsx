import React from 'react';
import useDownload from '../../Hooks/Funcionalidades/UseDownload'; 

const NotificacionesDetalles = ({ notification }) => {
  const {descargarArchivo} = useDownload();
  if (!notification) return <div className="text-lightBlue">Selecciona una notificación para ver los detalles</div>;

  // Verificar los valores en consola
  console.log("ArchivoActividadUrl:", notification.archivoActividadUrl);
  console.log("LinkActividad:", notification.linkActividad);

  const renderContent = () => {
    
    return (
      <div className="mt-4 space-y-2">
        {notification.archivoActividadUrl && (
          <button
            href={notification.archivoActividadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2, bg-cyan-400 , text-black , rounded , hover:bg-cyan-500 , font-serif" 
            onClick={() => descargarArchivo(notification.id)} // Llama a la función para descargar el archivo
          >
            Ver Archivo
          </button>
        )}
        <br></br>
        {notification.linkActividad && (
          <a
            href={notification.linkActividad}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2, bg-orange-400 , text-black , rounded , hover:bg-orange-500 , font-serif "
          >
            Ver Enlace
          </a>
        )}
      </div>
    );
  };

  return (
    <div className="p-4">
      <h3 className="text-xl font-bold mb-2 text-lightBlue">{notification.contenido}</h3>
      {renderContent()}
    </div>
  );
};

export default NotificacionesDetalles;
