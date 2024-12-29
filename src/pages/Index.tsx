import { useState } from "react";
import { toast } from "sonner";
import { Header } from "../components/Header";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    clientType: "",
    houseType: "",
    currentCompany: "",
    monthlyBill: "",
    postalCode: "",
    city: "",
    fullName: "",
    email: "",
    phone: "",
    gdprConsent: false
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    setStep(prev => prev + 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const form = new FormData();
    
    form.append('returnjson', 'yes');
    form.append('campid', 'GAZELEC-ESPAGNE');
    
    form.append('typeform', formData.houseType);
    form.append('particulier', formData.clientType);
    form.append('fournisseur_actuel', formData.currentCompany);
    form.append('postcode', formData.postalCode);
    form.append('towncity', formData.city);
    
    const [firstname = "", lastname = ""] = formData.fullName.split(" ");
    form.append('firstname', firstname);
    form.append('lastname', lastname);
    
    form.append('email', formData.email);
    form.append('phone1', formData.phone);
    
    form.append('source', window.location.href);
    form.append('type_energie', 'electricite');
    form.append('objectif_recherche', 'economiser');
    form.append('b2b', 'no');
    
    try {
      const response = await fetch('https://leadstudio.leadbyte.co.uk/api/submit.php', {
        method: 'POST',
        mode: 'no-cors', // Add this line to handle CORS
        body: form
      });
      
      // Since we're using no-cors, we won't get a proper response
      // So we'll just redirect immediately
      console.log("Form submitted, redirecting...");
      toast.success("Formulario enviado con éxito");
      navigate('/gracias');
      
    } catch (error) {
      console.error('Error:', error);
      // Even if there's an error, we'll redirect
      navigate('/gracias');
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-primary to-secondary">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Header />
          
          <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8">
            <div className="flex justify-between mb-8">
              {[1, 2, 3, 4, 5].map((num) => (
                <div
                  key={num}
                  className={`flex items-center ${num !== 5 ? 'flex-1' : ''}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                      ${step >= num ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'}`}
                  >
                    {num}
                  </div>
                  {num !== 5 && (
                    <div
                      className={`flex-1 h-1 mx-2 ${
                        step > num ? 'bg-primary' : 'bg-gray-100'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {step === 1 && (
                <div className="space-y-6">
                  <div className="text-left">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Seleccione el tipo de cliente:
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                      <button
                        type="button"
                        onClick={() => {
                          handleInputChange("clientType", "particular");
                          handleNext();
                        }}
                        className="p-4 border-2 rounded-lg text-left hover:border-primary focus:outline-none focus:border-primary"
                      >
                        <span className="font-medium text-gray-900">Particular</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          handleInputChange("clientType", "autonomo");
                          handleNext();
                        }}
                        className="p-4 border-2 rounded-lg text-left hover:border-primary focus:outline-none focus:border-primary"
                      >
                        <span className="font-medium text-gray-900">Autónomo / Pyme</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div className="text-left">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      ¿Qué tipo de vivienda tienes?
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                      <button
                        type="button"
                        onClick={() => {
                          handleInputChange("houseType", "apartamento");
                          handleNext();
                        }}
                        className="p-4 border-2 rounded-lg text-left hover:border-primary focus:outline-none focus:border-primary"
                      >
                        <span className="font-medium text-gray-900">Apartamento o casa pequeña</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          handleInputChange("houseType", "casa");
                          handleNext();
                        }}
                        className="p-4 border-2 rounded-lg text-left hover:border-primary focus:outline-none focus:border-primary"
                      >
                        <span className="font-medium text-gray-900">Casa grande o chale</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          handleInputChange("houseType", "otro");
                          handleNext();
                        }}
                        className="p-4 border-2 rounded-lg text-left hover:border-primary focus:outline-none focus:border-primary"
                      >
                        <span className="font-medium text-gray-900">Otro tipo de vivienda</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <div className="text-left">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      ¿Cuál es tu compañía actual?
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { name: "Gana Energia", value: "gana" },
                        { name: "Repsol", value: "repsol" },
                        { name: "Iberdrola", value: "iberdrola" },
                        { name: "Eniplenitude", value: "eniplenitude" },
                        { name: "Endesa", value: "endesa" },
                        { name: "Otro/No lo sé", value: "otro" }
                      ].map((company) => (
                        <button
                          key={company.value}
                          type="button"
                          onClick={() => {
                            handleInputChange("currentCompany", company.value);
                            handleNext();
                          }}
                          className="p-4 border-2 rounded-lg text-left hover:border-primary focus:outline-none focus:border-primary"
                        >
                          <span className="font-medium text-gray-900">{company.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-6">
                  <div className="text-left">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      ¿Cuál es el monto de tu factura mensual actual?
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                      {[
                        { name: "Menos de 50 € al mes", value: "menos-50" },
                        { name: "Entre 50 € y 100 € al mes", value: "50-100" },
                        { name: "Entre 100 € y 150 € al mes", value: "100-150" },
                        { name: "Más de 150 € al mes", value: "mas-150" },
                        { name: "No lo sé", value: "no-se" }
                      ].map((amount) => (
                        <button
                          key={amount.value}
                          type="button"
                          onClick={() => {
                            handleInputChange("monthlyBill", amount.value);
                            handleNext();
                          }}
                          className="p-4 border-2 rounded-lg text-left hover:border-primary focus:outline-none focus:border-primary"
                        >
                          <span className="font-medium text-gray-900">{amount.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 5 && (
                <div className="space-y-6">
                  <div className="text-left">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6">
                      Información de contacto
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Código postal
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Código postal"
                          onChange={(e) => handleInputChange("postalCode", e.target.value)}
                          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Ciudad
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Ciudad"
                          onChange={(e) => handleInputChange("city", e.target.value)}
                          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Nombre completo
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Nombre completo"
                          onChange={(e) => handleInputChange("fullName", e.target.value)}
                          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="Email"
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Teléfono
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+34XXXXXXXXX"
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                      </div>
                      <div className="flex items-start space-x-3">
                        <input
                          type="checkbox"
                          required
                          id="gdpr"
                          onChange={(e) => handleInputChange("gdprConsent", e.target.checked)}
                          className="mt-1"
                        />
                        <label htmlFor="gdpr" className="text-sm text-gray-600">
                          Al hacer clic en «Enviar», confirmo que he leído y acepto las{" "}
                          <a
                            href="https://comparadorluzgas.com/gaz-y-luz-condiciones-generales/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            condiciones generales de uso
                          </a>
                          .
                        </label>
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-primary text-white font-medium py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors"
                      >
                        Enviar
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>

          <footer className="mt-8 text-center text-white">
            <p className="text-sm opacity-80">
              © 2024 Comparador Energético. Todos los derechos reservados.
            </p>
          </footer>
        </div>
      </div>
    </main>
  );
};

export default Index;
