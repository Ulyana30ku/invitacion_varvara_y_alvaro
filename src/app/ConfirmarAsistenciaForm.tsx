'use client';
import styles from "./page.module.css"; // Usa tus estilos existentes
import { submitRSVP } from '../services/sheetsService';
import { useState } from "react";

export default function ConfirmarAsistenciaForm({ onClose }: { onClose: () => void }) {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await submitRSVP({
      name: nombre,
      email: email,
      message: mensaje,
      attending: true,
      guests: 1
    });
    if (result === true) {
      setEnviado(true);
    } else {
      alert("Hubo un error, intenta de nuevo.");
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.modalClose} onClick={onClose}>✕</button>
        {enviado ? (
          <div className={styles.modalGracias}>
            <h2>¡Gracias por confirmar tu asistencia!</h2>
            <p>Nos alegra que puedas acompañarnos.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.confirmForm}>
            <h2 className={styles.confirmTitle}>Confirma tu asistencia</h2>
            <input
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              required
              className={styles.confirmInput}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className={styles.confirmInput}
            />
            <textarea
              placeholder="Mensaje para los papás (opcional)"
              value={mensaje}
              onChange={e => setMensaje(e.target.value)}
              className={styles.confirmInput}
            />
            <button type="submit" className={styles.confirmBtn}>
              Confirmar asistencia
            </button>
          </form>
        )}
      </div>
    </div>
  );
} 