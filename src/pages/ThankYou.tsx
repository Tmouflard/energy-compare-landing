import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const ThankYou = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#ea384c] to-[#ff6b6b] flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center bg-white rounded-3xl shadow-xl p-8 md:p-12 animate-fade-in">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            ¡Gracias por tu solicitud!
          </h1>
          
          <p className="text-lg text-gray-600 mb-4">
            Nos pondremos en contacto contigo lo antes posible para ayudarte a encontrar la mejor tarifa de energía.
          </p>

          <p className="text-sm text-gray-500">
            Mientras tanto, nuestro equipo está analizando las mejores opciones para ti.
          </p>
        </div>

        <div className="space-y-6">
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-blue-800 text-sm">
              Un asesor energético se pondrá en contacto contigo en breve para ofrecerte las mejores tarifas disponibles.
            </p>
          </div>

          <Link to="/">
            <Button className="bg-[#ea384c] hover:bg-[#d62d3f] text-white" variant="default">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al inicio
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default ThankYou;