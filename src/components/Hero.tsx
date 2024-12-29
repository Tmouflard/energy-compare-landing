import { useState, useCallback } from "react";
import { FormStep1 } from "./form/FormStep1";
import { FormStep2 } from "./form/FormStep2";
import { FormStep3 } from "./form/FormStep3";
import { FormStep4 } from "./form/FormStep4";
import { FormStep5 } from "./form/FormStep5";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const Hero = () => {
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

  const handleInputChange = useCallback((field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    console.log(`Field ${field} updated with value:`, value);
  }, []);

  const handleNext = useCallback(() => {
    setStep(prev => prev + 1);
    console.log("Moving to step:", step + 1);
  }, [step]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submission started with data:", formData);
    
    if (!formData.phone || !formData.email || !formData.postalCode || !formData.fullName) {
      console.error("Missing required fields");
      toast.error("Por favor, rellene todos los campos obligatorios");
      return;
    }

    if (!formData.gdprConsent) {
      console.error("GDPR consent not given");
      toast.error("Por favor, acepte las condiciones generales");
      return;
    }
    
    const form = new FormData();
    
    const appendToForm = (key: string, value: string) => {
      form.append(key, value);
      console.log(`Appending to form: ${key} = ${value}`);
    };
    
    appendToForm('returnjson', 'yes');
    appendToForm('campid', 'GAZELEC-ESPAGNE');
    appendToForm('typeform', formData.houseType);
    appendToForm('particulier', formData.clientType);
    appendToForm('fournisseur_actuel', formData.currentCompany);
    appendToForm('postcode', formData.postalCode);
    appendToForm('towncity', formData.city);
    
    const [firstname = "", lastname = ""] = formData.fullName.split(" ");
    appendToForm('firstname', firstname);
    appendToForm('lastname', lastname);
    
    appendToForm('email', formData.email);
    appendToForm('phone1', formData.phone);
    
    appendToForm('source', window.location.href);
    appendToForm('type_energie', 'electricite');
    appendToForm('objectif_recherche', 'economiser');
    appendToForm('b2b', 'no');
    
    try {
      console.log("Sending form to Leadbyte...");
      const response = await fetch('https://leadstudio.leadbyte.co.uk/api/submit.php', {
        method: 'POST',
        body: form
      });
      
      const responseData = await response.text();
      console.log("Leadbyte response:", responseData);
      
      if (response.ok) {
        console.log("Form submitted successfully");
        toast.success("Formulario enviado con éxito");
        navigate('/gracias');
      } else {
        console.error("Error response from Leadbyte:", response.status, responseData);
        toast.error("Error al enviar el formulario. Por favor, inténtelo de nuevo.");
      }
      
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error("Error al enviar el formulario. Por favor, inténtelo de nuevo.");
    }
  }, [formData, navigate]);

  return (
    <section className="bg-[#3B4694] min-h-screen flex flex-col items-center py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-[#FFB347] uppercase leading-tight">
            Compara las mejores ofertas de luz y gas y ahorra hasta un 50% en tu factura
          </h1>
        </div>
        
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-3xl mx-auto">
          <div className="relative">
            <div className="bg-[#FFB347] py-4 px-6 text-center relative">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-16 bg-[#1A237E] -skew-x-12"></div>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-16 bg-[#1A237E] skew-x-12"></div>
              <p className="text-[#1A237E] text-xl font-semibold">
                ¡Completa el formulario y recibe todas las tarifas al instante!
              </p>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <div className="flex justify-between mb-8">
              {[1, 2, 3, 4, 5].map((num) => (
                <div
                  key={num}
                  className={`flex items-center ${num !== 5 ? 'flex-1' : ''}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                      ${step >= num ? 'bg-[#3B4694] text-white' : 'bg-gray-100 text-gray-400'}`}
                  >
                    {num}
                  </div>
                  {num !== 5 && (
                    <div
                      className={`flex-1 h-1 mx-2 ${
                        step > num ? 'bg-[#3B4694]' : 'bg-gray-100'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {step === 1 && (
                <FormStep1 
                  onInputChange={handleInputChange}
                  onNext={handleNext}
                />
              )}
              {step === 2 && (
                <FormStep2
                  onInputChange={handleInputChange}
                  onNext={handleNext}
                />
              )}
              {step === 3 && (
                <FormStep3
                  onInputChange={handleInputChange}
                  onNext={handleNext}
                />
              )}
              {step === 4 && (
                <FormStep4
                  onInputChange={handleInputChange}
                  onNext={handleNext}
                />
              )}
              {step === 5 && (
                <FormStep5
                  onInputChange={handleInputChange}
                  onSubmit={handleSubmit}
                />
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};