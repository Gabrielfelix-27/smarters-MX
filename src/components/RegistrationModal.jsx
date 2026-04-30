import React, { useState } from 'react';
import './RegistrationModal.css';

const RegistrationModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    whatsapp: '',
    company: '',
    role: '',
    email: '',
    comment: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Google Form Action URL
    const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSfkLMdex0vEhy-S5LnApfXCZd1BPMH6jJ1foRYDSm_6ulRPNA/formResponse';
    
    // Create FormData for direct submission
    const formBody = new URLSearchParams();
    
    // Primeiro Nome (Nombre)
    formBody.append('entry.1365000254', formData.firstName);
    // Sobrenome (Apellido)
    formBody.append('entry.554419827', formData.lastName);
    // Whatsapp
    formBody.append('entry.1192625778', formData.whatsapp);
    // Nome da Empresa
    formBody.append('entry.1401476781', formData.company);
    // Cargo
    formBody.append('entry.884910310', formData.role);
    // Email da empresa
    formBody.append('entry.25664176', formData.email);
    // Comentário
    formBody.append('entry.29252082', formData.comment);

    try {
      await fetch(formUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody.toString(),
      });
      
      setIsSuccess(true);
      // Opcional: Fechar automaticamente após sucesso
      // setTimeout(() => onClose(), 3000);
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      alert('Hubo un error al enviar tu registro. Inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>×</button>
        
        {isSuccess ? (
          <div className="success-message">
            <h2>¡Registro Confirmado!</h2>
            <p>Gracias por confirmar tu asistencia. Nos pondremos en contacto pronto con más información sobre el evento.</p>
          </div>
        ) : (
          <>
            <div className="modal-header">
              <h2>Confirma tu asistencia al WhatsApp Toolbox</h2>
              <p>Asegura tu lugar. Responder toma menos de un minuto.</p>
            </div>

            <form className="modal-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Nombre</label>
                  <input
                    type="text"
                    name="firstName"
                    className="form-input"
                    placeholder="Ingresa tu nombre"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Apellido</label>
                  <input
                    type="text"
                    name="lastName"
                    className="form-input"
                    placeholder="Ingresa tu apellido"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>WhatsApp</label>
                <div className="whatsapp-input-group">
                  <div className="whatsapp-prefix">
                    🇲🇽 MX +52
                  </div>
                  <input
                    type="text"
                    name="whatsapp"
                    className="whatsapp-input"
                    placeholder="55 1234 5678"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Nombre de la empresa</label>
                  <input
                    type="text"
                    name="company"
                    className="form-input"
                    placeholder="¿Cómo se llama tu empresa?"
                    value={formData.company}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Cargo</label>
                  <input
                    type="text"
                    name="role"
                    className="form-input"
                    placeholder="¿Cuál es tu cargo?"
                    value={formData.role}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Correo de la empresa</label>
                <input
                  type="email"
                  name="email"
                  className="form-input"
                  placeholder="correo@empresa.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Comentarios</label>
                <textarea
                  name="comment"
                  className="form-input"
                  placeholder="Deja un mensaje (opcional)"
                  value={formData.comment}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="form-footer">
                <button type="submit" className="submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? 'Enviando...' : 'Enviar'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default RegistrationModal;
