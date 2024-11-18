// import { useActividades } from '../Hooks/Actividades/UseActividades';
// import { useAuth } from '../context/AuthContext';

// const MisActividades = () => {
//   const { actividades } = useActividades();
//   const { userRole } = useAuth();

//   // Asegúrate de que el rol del usuario es 'Usuario'
//   if (userRole !== 'Usuario') {
//     return <p>Acceso denegado.</p>;
//   }

//   return (
//     <div>
//       <h1>Mis Actividades</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>Contenido</th>
//             <th>Fecha Creación</th>
//             <th>Modulo</th>
//             <th>Archivo</th>
//           </tr>
//         </thead>
//         <tbody>
//           {actividades.map((actividad) => (
//             <tr key={actividad.id}>
//               <td>{actividad.contenido}</td>
//               <td>{actividad.fechaCreacion}</td>
//               <td>{actividad.moduloNombre}</td>
//               <td><a href={actividad.archivoActividadUrl}>Ver Archivo</a></td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default MisActividades;
