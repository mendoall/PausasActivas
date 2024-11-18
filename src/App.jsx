import { Routes, Route, useLocation } from 'react-router-dom'; 
import LoginPage from './Pages/LoginPage';
import PrincipalPage from './Pages/PrincipalPage';
import BienvenidaPage from './Pages/BienvenidaPage';
import GestionUsuarioPage from './Pages/GestionUsuarioPage';
import CrearUsuarioPage from './Pages/CrearUsuarioPage';
import EditarUsuarioPage from './Pages/EditarUsuarioPage';
import ActividadesPage from './Pages/ActividadesPage';
import ModulosPage from './Pages/ModulosPage';
import NavBarPage from './Pages/NavBarPage';
import Footer from './components/Footer';
import { ResetPasswordPage } from './Pages/ResetPasswordPage';
import  OlvideMiContrasenaPage  from './Pages/Recuperar-Contrasena/OlvideMiContrasenaPage';
import NotificacionesPage  from './Pages/Notificaciones/NotificacionesPages';
import { AuthProvider  } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute'
import NavBar from './components/NavBar';
// import MisActividadesPage from './Pages/MisActividadesPage';

const App = () => {
    const location = useLocation(); 
    
    const shouldShowNavBarAndFooter = location.pathname !== '/' && location.pathname !== '/LoginPage' && location.pathname !== '/ResetPasswordPage'
    && location.pathname !== '/OlvideMiContrasenaPage';

    return (
        <AuthProvider>
            <div className="flex flex-col min-h-screen">
                {shouldShowNavBarAndFooter && <NavBar />}
                <Routes>
                    <Route path="/" element={<BienvenidaPage />} />
                    <Route path="/LoginPage" element={<LoginPage />} />
                    <Route element={<PrivateRoute />}>
                        <Route path="/PrincipalPage" element={<PrincipalPage />} />
                        <Route path="/NavBarPage" element={<NavBarPage />} />
                        <Route path="/GestionUsuarioPage" element={<GestionUsuarioPage />} />
                        <Route path="/CrearUsuarioPage" element={<CrearUsuarioPage />} />
                        <Route path="/EditarUsuarioPage/:id" element={<EditarUsuarioPage />} />
                        <Route path="/ActividadesPage" element={<ActividadesPage />} />
                        <Route path="/ModulosPage" element={<ModulosPage />} />
                        <Route path="/NotificacionesPage" element={< NotificacionesPage/>}/>
                        {/* <Route path="/MisActividadesPage" element={< MisActividadesPage/>}/> */}
                    </Route>                    
                    <Route path="/OlvideMiContrasenaPage" element={<OlvideMiContrasenaPage/> }/>
                    <Route path="/ResetPasswordPage" element={<ResetPasswordPage />} />

                </Routes>
                {shouldShowNavBarAndFooter && <Footer />}
            </div>
        </AuthProvider>
    );
};

export default App;
