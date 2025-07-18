'use client';
import React, { useState } from 'react';
import styles from './Header.module.css';

const Header: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleClick = () => {
    setShowPopup(true);
  };

  return (
    <header className={styles.header}>
      <span className={styles.logoText} onClick={handleClick} style={{ cursor: 'pointer' }}>
        Кукоlка
      </span>
      {showPopup && (
        <div className={styles.headerPopupOverlay} onClick={() => setShowPopup(false)}>
          <div className={styles.headerPopup} onClick={e => e.stopPropagation()}>
            <div className={styles.headerPopupTitle}>¿Quieres una invitación personalizada?</div>
            <div className={styles.headerPopupText}>
              Si deseas una invitación para cualquier temática y tu propio estilo,<br />
              ¡contáctanos!<br /><br />
              <b>Email:</b> ulynakukovskaya@gmail.com<br />
              <b>Teléfono:</b> +7 989 526 49 67
            </div>
            <button className={styles.headerPopupClose} onClick={() => setShowPopup(false)}>Cerrar</button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header; 