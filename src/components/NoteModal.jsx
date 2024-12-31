import React from 'react';

const NoteModal = ({ note, date, onClose }) => {
  const formattedDate = new Intl.DateTimeFormat('id-ID', { 
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);

  return (
    <div className="note-modal-overlay" onClick={onClose}>
      <div className="note-modal" onClick={e => e.stopPropagation()}>
        <div className="note-modal-header">
          <h3>Catatan Tanggal {formattedDate}</h3>
          <button className="close-button" onClick={onClose}>
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path
                fill="currentColor"
                d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
              />
            </svg>
          </button>
        </div>
        <div className="note-modal-content">
          <p>{note}</p>
        </div>
      </div>
    </div>
  );
};

export default NoteModal;
