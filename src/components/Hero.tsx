import { useState, useCallback } from "react";
import { FormStep1 } from "./form/FormStep1";
import { FormStep2 } from "./form/FormStep2";
import { FormStep3 } from "./form/FormStep3";
import { FormStep4 } from "./form/FormStep4";
import { FormStep5 } from "./form/FormStep5";
import { toast } from "sonner";

export const Hero = () => {
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
    
    // Validation basique
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
    
    // Ajout des champs au FormData avec logging
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
        
        // Afficher le message de remerciement
        toast.success("¡Gracias por su solicitud! Nos pondremos en contacto con usted lo antes posible.", {
          duration: 5000,
          className: "bg-primary text-white",
        });
        
        // Reset form
        setFormData({
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
        setStep(1);
        
      } else {
        console.error("Error response from Leadbyte:", response.status, responseData);
        toast.error("Error al enviar el formulario. Por favor, inténtelo de nuevo.");
      }
      
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error("Error al enviar el formulario. Por favor, inténtelo de nuevo.");
    }
  }, [formData]);

  return (
    <section className="bg-gradient-to-br from-primary to-secondary min-h-[600px] flex items-center text-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
              Encuentra la tarifa de luz más barata
            </h1>
            <p className="text-xl mb-8 animate-fade-in opacity-90">
              Compara las mejores tarifas de luz y ahorra en tu factura
            </p>
          </div>
          
          <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 animate-fade-in">
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

            <form onSubmit={handleSubmit}>
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
