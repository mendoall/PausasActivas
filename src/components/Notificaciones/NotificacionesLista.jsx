import React, { useState } from 'react';
import NotificacionesDetalles from './NotificacionesDetalles';
import useNotifications from '../../Hooks/Notificaciones/useNotificaciones'; 

const NotificacionesLista = () => {
  const [selectedNotification, setSelectedNotification] = useState(null);
  
  const { data: notifications, error, isLoading } = useNotifications();

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Error al cargar las notificaciones</div>;

  return (
    <div className="flex bg-gray-50 rounded-lg shadow-lg">
      <div className="w-1/3 p-4 border-r border-lightBlue bg-white">
        <h2 className="text-2xl font-bold mb-4 text-lightBlue">Notificaciones Diarias</h2>
        <ul>
          {notifications.map((notification) => (
            <li 
              key={notification.id} 
              className={`cursor-pointer p-2  hover:bg-orange-400 transition-colors duration-200 ease-in-out rounded-md ${selectedNotification?.id === notification.id ? 'bg-cyan-400 text-gray-900' : 'text-gray-700'}`}
              onClick={() => setSelectedNotification(notification)}
            >
              {notification.contenido}
            </li>
          ))}
        </ul>
      </div>
      <div className="w-2/3 p-4 bg-white">
        {selectedNotification ? (
          <NotificacionesDetalles notification={selectedNotification} />
        ) : (
          <div className="text-gray-500 text-center">
            Selecciona una notificación para ver los detalles.
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificacionesLista;
