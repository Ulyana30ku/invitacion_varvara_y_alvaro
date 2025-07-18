'use client';

import React, { useState } from "react";
import styles from "./page.module.css";
import { submitRSVP } from "../services/sheetsService";


export default function Home() {
  const [showPopup, setShowPopup] = useState(false);
  const [showRSVPModal, setShowRSVPModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRSVPSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    // Защита от двойной отправки
    if (isSubmitting) {
      console.log('Форма уже отправляется, игнорируем повторную отправку');
      return;
    }
    
    setIsSubmitting(true);
    
    const formData = new FormData(event.currentTarget);
    const rsvpData = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      attending: formData.get('attending') === 'yes',
      message: formData.get('message') as string,
      timestamp: new Date().toISOString()
    };

    try {
      console.log('Отправляем данные:', rsvpData);
      
      const result = await submitRSVP(rsvpData);
      console.log('Результат:', result);
      
      if (result === true || (typeof result === 'object' && result.success)) {
        alert('¡Gracias por confirmar tu asistencia!');
        setShowRSVPModal(false);
        // Сброс формы
        if (event.currentTarget) {
          event.currentTarget.reset();
        }
      } else {
        alert('Hubo un error al enviar tu confirmación. Por favor, intenta de nuevo.');
      }
    } catch (error) {
      console.error('Error submitting RSVP:', error);
      alert('Hubo un error al enviar tu confirmación. Por favor, intenta de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className={styles.hero + ' ' + styles.fadeIn}>
        <h1 className={styles.title}>Baby shower</h1>
        <div className={styles.subtitle}>
          <span>Julio 24</span>
          <span className={styles.divider}>|</span>
          <span>6:00 PM</span>
        </div>
      </div>
      <div className={styles.gradient + ' ' + styles.fadeIn2} />
      <img src="/animal1.svg" alt="Animal" className={styles.animal + ' ' + styles.fadeIn3} />
      <div className={styles.waiting + ' ' + styles.fadeIn4}>La dulce espera de Maxim</div>
      <div className={styles.invite + ' ' + styles.fadeIn5}>
        Estamos encantados de celebrar la<br />
        próxima llegada de nuestro <br />
        bebé Maxim.<br />
        Esta ocasión tan especial merece una<br />
        maravillosa celebración, y no podemos<br />
        esperar para compartir este día mágico<br />
        con todos ustedes.
      </div>
      <div className={styles.infoBox + ' ' + styles.fadeIn5}>
        <div className={styles.infoContent}>
          <div className={styles.infoTitle}>Día</div>
          <div className={styles.infoText}>24 de julio, 2025</div>
          <div className={styles.infoTitle}>Hora</div>
          <div className={styles.infoText}>6:00 PM</div>
          <div className={styles.infoTitle}>Dirección</div>
          <div className={styles.infoText}>
            Av. República de Panamá 6472, <br />
            Miraflores
            </div>
        </div>
        <img src="/animalito2.png" alt="Animalito" className={styles.infoAnimal} />
      </div>
      <div className={styles.invited}>
        <div className={styles.invitedTitle}>Estas invitado/a</div>
        <div className={styles.invitedText}>
  ¡Nos encantaría contar con tu presencia en este día tan especial para nuestra familia!<br />
  Ven con muchas ganas de celebrar y compartir momentos inolvidables juntos.
</div>
      </div>
      <div className={styles.confirmBg}>
        <div className={styles.confirmBox}>
          <img src="/animalito3.svg" alt="Animalito" className={styles.confirmAnimal} />
          <div className={styles.confirmTitle}>Maxim está en camino!</div>
          <div className={styles.confirmSub}>Por favor, confirma tu asistencia si planeas venir.</div>
          <div className={styles.confirmDate}>24 de julio de 2025 | 6:00 PM</div>
          <button 
            onClick={() => setShowRSVPModal(true)} 
            className={styles.confirmBtn}
          >
            Confirmar
          </button>
        </div>
      </div>

      <a
        href="https://sinenvolturas.com/varvarayalvaro"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.sinenBtn}
      >
       Pasar a ver la lista de regalos
      </a>

      <footer className={styles.footerCustom}>
        <div className={styles.footerLogoBox}>
          <span className={styles.footerLogoText} onClick={() => setShowPopup(true)}>
            Кукоlка
          </span>
        </div>
        <div className={styles.footerContacts}>
          <div className={styles.footerEmail}>ulyanakukovskaya@gmail.com</div>
          <div className={styles.footerPhone}>+7 989 526 49 67</div>
        </div>
        {showPopup && (
          <div className={styles.footerPopupOverlay} onClick={() => setShowPopup(false)}>
            <div className={styles.footerPopup} onClick={e => e.stopPropagation()}>
              <div className={styles.footerPopupTitle}>¿Quieres una invitación personalizada?</div>
              <div className={styles.footerPopupText}>
                Si deseas una invitación para cualquier temática y tu propio estilo,<br />
                ¡contáctanos!<br /><br />
                <b>Email:</b> ulynakukovskaya@gmail.com<br />
                <b>Teléfono:</b> +7 989 526 49 67
              </div>
              <button className={styles.footerPopupClose} onClick={() => setShowPopup(false)}>Cerrar</button>
            </div>
          </div>
        )}
      </footer>

      {/* Modal de confirmación RSVP */}
      {showRSVPModal && (
        <div key="rsvp-modal" className={styles.modalOverlay} onClick={() => setShowRSVPModal(false)}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h2>Confirmar Asistencia</h2>
              <button 
                className={styles.modalClose}
                onClick={() => setShowRSVPModal(false)}
              >
                ×
              </button>
            </div>
            <div className={styles.modalBody}>
              <form key="rsvp-form" className={styles.rsvpForm} onSubmit={handleRSVPSubmit}>
                <div className={styles.formGroup}>
                  <label htmlFor="name">Nombre completo:</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    required 
                    className={styles.formInput}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="email">Email:</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    required 
                    className={styles.formInput}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="attending">¿Asistirás?</label>
                  <select id="attending" name="attending" required className={styles.formSelect}>
                    <option value="">Selecciona una opción</option>
                    <option value="yes">Sí, asistiré</option>
                    <option value="no">No podré asistir</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="message">Mensaje (opcional):</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows={3} 
                    className={styles.formTextarea}
                    placeholder="Escribe un mensaje para los padres..."
                  ></textarea>
                </div>
                <div className={styles.formActions}>
                  <button 
                    type="button" 
                    onClick={() => setShowRSVPModal(false)}
                    className={styles.formCancel}
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit" 
                    className={styles.formSubmit}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Enviando...' : 'Confirmar'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
