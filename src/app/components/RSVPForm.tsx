import React, { useState } from 'react';
import { submitRSVP } from '../../services/sheetsService';


interface RSVPFormData extends Record<string, unknown> {
  name: string;
  email: string;
  phone: string;
  attending: boolean;
  guests: number;
  message: string;
}

interface RSVPFormProps {
  onRSVPSubmitted?: (data: RSVPFormData) => void;
}

export const RSVPForm: React.FC<RSVPFormProps> = ({ onRSVPSubmitted }) => {
  const [formData, setFormData] = useState<RSVPFormData>({
    name: '',
    email: '',
    phone: '',
    attending: true,
    guests: 1,
    message: ''
  });
  
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      alert('Por favor, ingresa tu nombre');
      return;
    }

    try {
      setSubmitting(true);
      const success = await submitRSVP(formData);
      
      if (success) {
        setSubmitted(true);
        onRSVPSubmitted?.(formData);
        
        // Mostrar opciones para compartir
      } else {
        alert('Error al enviar el RSVP. Inténtalo de nuevo.');
      }
    } catch (error) {
      alert('Error al enviar el RSVP. Inténtalo de nuevo.');
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      attending: true,
      guests: 1,
      message: ''
    });
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="card text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h3 className="text-2xl font-cursive text-gray-800 mb-4">
          ¡Gracias por confirmar!
        </h3>
        <p className="text-gray-600 mb-6">
          Nos emociona que puedas acompañarnos en este momento tan especial.
        </p>
        <div className="space-y-3">
          <button
            onClick={() => {
              // Elimino la función showShareOptions y todas las llamadas a shareToSocialMedia
            }}
            className="btn-primary w-full"
          >
            Compartir en WhatsApp
          </button>
          <button
            onClick={resetForm}
            className="btn-secondary w-full"
          >
            Enviar otro RSVP
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-cursive text-gray-800 mb-2">Confirma tu Asistencia</h2>
        <p className="text-gray-600">Cuéntanos si podrás acompañarnos</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nombre */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Nombre completo *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-baby-pink focus:border-transparent"
            placeholder="Tu nombre completo"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-baby-pink focus:border-transparent"
            placeholder="tu@email.com"
          />
        </div>

        {/* Teléfono */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Teléfono
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-baby-pink focus:border-transparent"
            placeholder="+51 999 999 999"
          />
        </div>

        {/* Asistencia */}
        <div>
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              name="attending"
              checked={formData.attending}
              onChange={handleInputChange}
              className="h-4 w-4 text-baby-pink focus:ring-baby-pink border-gray-300 rounded"
            />
            <span className="text-sm font-medium text-gray-700">
              Confirmo mi asistencia al baby shower
            </span>
          </label>
        </div>

        {/* Número de invitados */}
        {formData.attending && (
          <div>
            <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-2">
              Número de personas
            </label>
            <select
              id="guests"
              name="guests"
              value={formData.guests}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-baby-pink focus:border-transparent"
            >
              {[1, 2, 3, 4, 5].map(num => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'persona' : 'personas'}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Mensaje */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            Mensaje para los futuros papás (opcional)
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-baby-pink focus:border-transparent"
            placeholder="Escribe un mensaje especial..."
          />
        </div>

        {/* Botón de envío */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full btn-primary"
        >
          {submitting ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
              Enviando...
            </div>
          ) : (
            'Confirmar Asistencia'
          )}
        </button>
      </form>
    </div>
  );
}; 