import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const ThankYou = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-primary to-secondary flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center bg-white rounded-3xl shadow-xl p-8 md:p-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          ¡Gracias por tu solicitud!
        </h1>
        
        <p className="text-lg text-gray-600 mb-8">
          Nos pondremos en contacto contigo lo antes posible para ayudarte a encontrar la mejor tarifa de energía.
        </p>

        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            Mientras tanto, nuestro equipo está analizando las mejores opciones para ti.
          </p>

          <Link to="/">
            <Button className="mt-6" variant="outline">
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