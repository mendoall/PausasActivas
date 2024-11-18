import { useState, useEffect, useRef } from "react";
import "../index.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const options = [
  { id: 3, name: "Visualización de Actividades Diarias", role: "Usuario" },

  { id: 4, name: "Progreso del Módulo", role: "Usuario" },

  { id: 5, name: "Insignias y Compartición en Redes Sociales", role: "Usuario", },

  { id: 6, name: "Registro de Actividades", role: "Usuario" },
  {
    id: 7,
    name: "Notificaciones Diarias",
    role: "admin",
    path: "/NotificacionesPage",
  },

  { id: 8, name: "Reportes de Avance", role: "Usuario" },

  { id: 9, name: "Información de “Mis Amigos”", role: "Usuario" },

  { id: 10, name: "Historial de actividades", role: "Usuario" },

  { id: 11, name: "Comentarios o feedback", role: "Usuario" },

  { id: 12, name: "Gestión de Usuarios", role: "admin", path: "/GestionUsuarioPage", },

  { id: 13, name: "Gestión tipo de usuario", role: "admin" },

  { id: 14, name: "Gestión de Módulos y Actividades", role: "admin", path: "/ActividadesPage", },

  { id: 15, name: "Notificaciones a Usuarios", role: "admin" },

  { id: 16, name: "Reportes de Estadísticas Generales", role: "admin" },

  { id: 17, name: "Carga Masiva de Usuarios", role: "admin" },

  { id: 18, name: "Gestión de Usuarios Corporativos", role: "corporate" },

  { id: 19, name: "Activación y Desactivación de Usuarios", role: "corporate" },

  { id: 20, name: "Limitaciones de Acceso", role: "corporate" },
];

function NavBar() {
  const [activeOption, setActiveOption] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const mobileMenuRef = useRef(null);
  const { logout, currentUser } = useAuth();
  console.log("CurrentUser navbar", currentUser);

  const handleOptionClick = (option) => {
    setActiveOption(option.id);
    if (option.path) {
      navigate(option.path);
    }
    setIsMobileMenuOpen(false);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleClickOutside = (event) => {
    if (
      mobileMenuRef.current &&
      !mobileMenuRef.current.contains(event.target)
    ) {
      setIsMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    logout();
    navigate("/LoginPage");
  };

  const newLocal = "size-6";
  return (
    <div>
      <header className="bg-slate-100 shadow px-6">
        <div className="flex h-16 justify-between items-center max-w-6xl mx-auto">
          <button
            className="text-slate-500 hover:bg-[#f9912a] hover:text-slate-100 rounded p-1 ml-1 transition-colors focus:ring-3 focus:ring-[#ecad6f] mr-5 md:hidden"
            onClick={handleMobileMenuToggle}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className={newLocal}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
          <div className="flex -mr-4 items-center">
            <a
              href=""
              className="w-28 h-9 mt-2 mr-2"
              onClick={() => navigate("/PrincipalPage")}
            >
              <img src="./img/logo2.png" alt="" />
            </a>
            <a
              href=""
              className="hover:-rotate-12 duration-200 text-[#32b0b6] hover:text-white w-12 h-12 mt-2 -mr-4"
              onClick={() => navigate("/PrincipalPage")}
            >
              <img src="./stretching.svg" alt="" />
            </a>
            <div className="pt-2 space-x-8 ml-2 hidden md:flex">
              <ul className="flex items-center text-slate-600 px-3 py-2 transition-colors">
                {options.map(
                  (option) =>
                    (option.role === "admin" || option.role === "") && (
                      <li
                        key={option.id}
                        className={
                          option.id === activeOption
                            ? "text-[#f9912a]"
                            : "hover:text-[#f9912a]"
                        }
                        onClick={() => handleOptionClick(option)}
                      >
                        <button>{option.name}</button>
                      </li>
                    )
                )}
              </ul>
            </div>
          </div>
          <div className="flex">
            <button
              className="relative text-slate-500 hover:text-[#f9912a] rounded-full transition-colors ml-3 group"
              onClick={handleLogout}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                <path d="M9 12h12l-3 -3" />
                <path d="M18 15l3 -3" />
              </svg>
              <span className="absolute top-full left-1/2 transform -translate-x-1/2 mb-2 w-max p-2 text-xs text-white bg-slate-400 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Cerrar sesión
              </span>
            </button>
          </div>
        </div>
        {/* Navegación móvil */}
        {isMobileMenuOpen && (
          <div
            ref={mobileMenuRef}
            className="space-y-2 pb-4 border-t pt-2 md:hidden"
          >
            <ul className="text-slate-700 block px-3 py-2 rounded-md transition-colors space-y-1">
              {options.map(
                (option) =>
                  (option.role === "admin" || option.role === "") && (
                    <li
                      key={option.id}
                      className={
                        option.id === activeOption
                          ? "text-[#f9912a] p-1 border rounded-md"
                          : "hover:text-[#f9912a] p-1 border rounded-md"
                      }
                      onClick={() => handleOptionClick(option)}
                    >
                      <button className="w-full text-center">
                        {option.name}
                      </button>
                    </li>
                  )
              )}
            </ul>
          </div>
        )}
      </header>
    </div>
  );
}

export default NavBar;
