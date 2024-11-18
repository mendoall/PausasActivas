import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useNavigate } from "react-router-dom";

export const Principal = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-4 mt-8">
      {/* Carousel */}
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        className="mb-5 -mt-5"
      >
        <div>
          <img
            src="/img/image1.jpg"
            alt="Imagen 1"
            className="h-auto w-full object-bottom"
          />
        </div>
        <div>
          <img
            src="/img/image2.jpg"
            alt="Imagen 2"
            className="h-auto w-full object-bottom"
          />
        </div>
        <div>
          <img
            src="/img/image3.jpg"
            alt="Imagen 3"
            className="h-auto w-full object-cover"
          />
        </div>
        <div>
          <img
            src="/img/image4.jpg"
            alt="Imagen 3"
            className="h-auto w-full object-cover"
          />
        </div>
      </Carousel>
      {/* Texto de Bienvenida */}
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
        Pausas activas | Mundo Gluck
      </h1>
      <p className="text-lg text-center text-gray-600 mb-8">
        Las pausas activas en el trabajo son descansos breves que realizan los
        trabajadores a lo largo de su jornada con el objetivo de prevenir los
        efectos que el sedentarismo puede tener en la salud.
      </p>
      {/* Cards Responsivas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <img
            src="/gif/gif1.gif"
            alt="Card 1"
            className="w-full h-52 object-cover mb-4 rounded"
          />
          <h2 className="text-xl font-bold mb-2">
            Reducen la tensión muscular
          </h2>
          <p className="text-gray-600">
            Estas pausas permiten reducir la tensión muscular y prevenir
            trastornos musculoesqueléticos.
          </p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <img
            src="/img/card2.png"
            alt="Card 2"
            className="w-full h-52 object-cover mb-4 rounded"
          />
          <h2 className="text-xl font-bold mb-2">Mejora tu postura</h2>
          <p className="text-gray-600">
            El hecho de relajar los músculos y realizar ejercicios y
            estiramientos ayuda a mejorar la postura corporal, lo cual resulta
            beneficioso tanto a corto como a largo plazo..
          </p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <img
            src="/gif/gif2.gif"
            alt="Card 3"
            className="w-full h-52 object-cover mb-4 rounded"
          />
          <h2 className="text-xl font-bold mb-2">Reaniman tu sistema</h2>
          <p className="text-gray-600">
            La concentración, la creatividad y la productividad también
            aumentan..
          </p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <img
            src="/img/card4.jpg"
            alt="Card 1"
            className="w-full h-52 object-cover mb-4 rounded"
          />
          <h2 className="text-xl font-bold mb-2">Salud mental</h2>
          <p className="text-gray-600">
            Resulta beneficioso para la salud mental y reduce el estrés.
          </p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <img
            src="/gif/gif3.gif"
            alt="Card 2"
            className="w-full h-52 object-cover mb-4 rounded"
          />
          <h2 className="text-xl font-bold mb-2">Energía</h2>
          <p className="text-gray-600">Aporta energía.</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <img
            src="/img/card6.png"
            alt="Card 3"
            className="w-full h-52 object-cover mb-4 rounded"
          />
          <h2 className="text-xl font-bold mb-2">Favorece la circulación.</h2>
          <p className="text-gray-600">
            Los movimientos de los estiramientos ayudan con la circulación de la
            sangre en el cuerpo.
          </p>
        </div>
      </div>
      {/* Video Embed      
      <div className="mt-6 flex justify-center mr-96">        
        <div className="relative" style={{ paddingTop: '56.25%' }}>
          <iframe
            src="/videos/video1.mp4"
            className="absolute top-0 left-0 w-96 h-72"
            frameBorder="0"
            allowFullScreen
            title="Video Destacado"
          ></iframe>
        </div>
      </div> */}
      {/* Video Embed */}
      <div className="mt-6 flex justify-center">
        <div
          className="relative w-full max-w-4xl"
          style={{ paddingTop: "56.25%" }}
        >
          <iframe
            src="/videos/video1.mp4"
            className="absolute top-0 left-0 w-full h-full"
            frameBorder="0"
            allowFullScreen
            title="Video Destacado"
          ></iframe>
        </div>
      </div>
      {/* Toast */}
      <button
        className="fixed bottom-4 right-4 bg-slate-600 text-white px-6 py-4 rounded shadow-lg transition-opacity duration-300"
        onClick={() => navigate("/ActividadesPage")}
      >
        Mis actividades
      </button>
      {/* Barra de Progreso */}
      {/* <div className="mb-8 -mt-72">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Mi progreso
        </h2>
        <h1 className="text-xl mb-4 text-gray-800">Insignias</h1>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-green-500 h-4 rounded-full"
            style={{ width: "70%" }}
          ></div>
        </div>
        <h1 className="text-xl mb-4 mt-4 text-gray-800">
          Actividades pendientes
        </h1>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-green-500 h-4 rounded-full"
            style={{ width: "30%" }}
          ></div>
        </div>
      </div> */}
      <div className="mb-8 mt-8 px-4">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Mi progreso
        </h2>

        <h1 className="text-xl mb-4 text-gray-800">Insignias</h1>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-green-500 h-4 rounded-full"
            style={{ width: "70%" }}
          ></div>
        </div>

        <h1 className="text-xl mb-4 mt-4 text-gray-800">
          Actividades pendientes
        </h1>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-green-500 h-4 rounded-full"
            style={{ width: "30%" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Principal;
