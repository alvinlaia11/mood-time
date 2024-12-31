import React, { useEffect, useMemo } from 'react';
import './SuccessPopup.css';

const funMessages = [
  "Yeay! Catatan kamu sudah disimpan! ",
  "Horeee! Mood kamu sudah tercatat! ",
  "Wihiii! Catatan kamu sudah aman! ",
  "Siip! Mood kamu sudah tersimpan! ",
  "Mantap! Catatan kamu sudah masuk! ",
  "Asiiik! Mood kamu sudah direkam! ",
  "Selamat! Catatan kamu berhasil disimpan! ",
  "Keren! Mood kamu sudah tercatat dengan baik! ",
  "Berhasil menyimpan mood kamu! Semangat terus ya! ",
  "Mood kamu sudah tersimpan dengan aman! Jangan lupa tersenyum! "
];

const SuccessPopup = ({ show, onClose }) => {
  const randomMessage = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * funMessages.length);
    return funMessages[randomIndex];
  }, [show]); 

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="success-popup-overlay">
      <div className="success-popup">
        <div className="success-checkmark">
          <div className="check-icon">
            <span className="icon-line line-tip"></span>
            <span className="icon-line line-long"></span>
            <div className="icon-circle"></div>
            <div className="icon-fix"></div>
          </div>
        </div>
        <p className="success-message">{randomMessage}</p>
      </div>
    </div>
  );
};

export default SuccessPopup;
