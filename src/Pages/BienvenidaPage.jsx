import { Link } from 'react-router-dom';

function Bienvenida() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#e7f4fc]">
      <div className="bg-white p-20 rounded-lg shadow-2xl text-center max-w-sm w-full">
        {/* <h1 className="text-3xl font-bold mb-6">Bienvenido a MundoGluck</h1> */}
        <img className="mb-4 w-full" src="./img/logo.png" alt=""/>
        <p className="mb-4 font-normal">Por favor, inicie sesión para continuar</p>
        <Link to="/LoginPage">
          <button className="bg-[#f9912a] text-white py-2 px-4 rounded hover:bg-[#D6822F] transition duration-300 mt-8 animate-bounce">
            Iniciar sesión
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Bienvenida;

