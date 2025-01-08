import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="mt-8 py-6 bg-white/10 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-6 text-sm text-white/80">
          <Link 
            to="/mentions-legales" 
            className="hover:text-white transition-colors"
          >
            Aviso legal
          </Link>
          <Link 
            to="/conditions-generales" 
            className="hover:text-white transition-colors"
          >
            Condiciones generales de uso
          </Link>
          <Link 
            to="/politique-confidentialite" 
            className="hover:text-white transition-colors"
          >
            Política de privacidad
          </Link>
        </div>
      </div>
    </footer>
  );
};